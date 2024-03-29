import Odenne from '../odenne';
import { EndResult, GetRandomPlayerOptions, MatchResult, OdenneTurn, STATUSCODES, TurnTypes, WINNER } from '../types/types';
import { Taunt } from './effects';
import { Round } from './rounds';
import { Player } from './teams';

class Referee {
    Odenne: Odenne;
    turn!: OdenneTurn;
    roundCount: number;
    currentRound!: Round;
    result!: MatchResult;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
        this.roundCount = 0;
    }

    createRound() {
        this.switchTurn();
        const round = this.Odenne.Rounds.create(this.turn.type);
        this.currentRound = round;
        this.roundCount++;
    }

    switchTurn(){
        const illusioned = this.checkForIllusion();
        if(illusioned){
            this.turn = {
                type: TurnTypes.ATTACK,
                team: illusioned.team,
                player: illusioned.player
            }
            
        }
        else {
            const newtype = TurnTypes.ATTACK;
            const newteam = this.alternate(this.turn.team);
            const newplayer = this.getRandomPlayer(newteam);

            this.turn = {
                type: newtype,
                team: newteam,
                player: newplayer
            }
        }
    }

    private checkForIllusion(){
        for(const team of this.Odenne.teams){
            for(const player of team.players){
                const illusion = player.hasEffect('Illusion');
                if(illusion){
                    return {
                        team: team.index,
                        player: {
                            id: team.players.indexOf(player),
                            player
                        }
                    }
                }
            }
        }
        return false;
    }

    private alternate(val: number): number {
        if(val == 0) return 1;
        else if(val == 1) return 0;
        else return 0;
    }

    getRandomPlayer(teamIndex: number, options: GetRandomPlayerOptions = {considerTaunt: false}): {id: number, player: Player} {
        if(options.considerTaunt){
            for(let i = 0; i < this.Odenne.teams[teamIndex].players.length; i++){
                const taunt = this.Odenne.teams[teamIndex].players[i].hasEffect("Taunt");
                if(taunt){
                    const tplayer = (taunt as Taunt).targetPlayer;
                    return {
                        id: tplayer.team.players.indexOf(tplayer),
                        player: tplayer
                    }
                }
            }
        }
        
        const playerCount = this.Odenne.teams[ teamIndex ].players.length;
        const randomized = Math.floor(Math.random() * playerCount);
        return {
            id: randomized,
            player: this.Odenne.teams[ teamIndex ].players[ randomized ]
        }
    }

    runRound(){
        this.currentRound.simulate();
    }

    checkGameStatus(){
        const roundLimitExceeded = this.roundCount >= this.Odenne.options.roundLimit;
        const isAllPlayersDead = this.Odenne.teams[0].isAllPlayersDead() || this.Odenne.teams[1].isAllPlayersDead();
        const conditions = [
            roundLimitExceeded,
            isAllPlayersDead
        ]

        if(conditions.some(d => d)){
            this.Odenne.status.set(STATUSCODES.FINISHED);
            this.cleanUpGameVariables();
        }
    }

    findWinner(){
        const roundLimitExceeded = this.roundCount >= this.Odenne.options.roundLimit;
        if(roundLimitExceeded){
            // round limit is exceeded so team with higher health wins
            const healths = [0,0];
            healths[0] = this.Odenne.teams[0].players.reduce((prev, player) => prev + player.player.stats.health, 0);
            healths[1] = this.Odenne.teams[1].players.reduce((prev, player) => prev + player.player.stats.health, 0);
            if(healths[0] > healths[1]){
                this.result = {
                    winner: WINNER.TEAM1,
                    reason: EndResult.LIMIT_EXCEEDED
                }
            }
            else if(healths[0] == healths[1]){
                this.result = {
                    winner: WINNER.DRAW,
                    reason: EndResult.LIMIT_EXCEEDED
                }
            }
            else {
                this.result = {
                    winner: WINNER.TEAM2,
                    reason: EndResult.LIMIT_EXCEEDED
                }
            }
        }
        else{
            const deadResults = [this.Odenne.teams[0].isAllPlayersDead(), this.Odenne.teams[1].isAllPlayersDead()]
            // check which team is all zero
            if(deadResults[0] && deadResults[1]){
                this.result = {
                    winner: WINNER.DRAW,
                    reason: EndResult.TEAM_DEAD
                }
            }
            else if(deadResults[0]){
                this.result = {
                    winner: WINNER.TEAM2,
                    reason: EndResult.TEAM_DEAD
                }
            }
            else {
                this.result = {
                    winner: WINNER.TEAM1,
                    reason: EndResult.TEAM_DEAD
                }
            }
        }
    }

    applyRound(){
        for(const team of this.Odenne.teams){
            team.applyRound();
        }
    }

    clearRound(){
        for(const team of this.Odenne.teams){
            team.clear();
        }
    }

    applyDamage(){
        for(const team of this.Odenne.teams){
            team.applyDamage();
        }
    }

    applyShield(){
        for(const team of this.Odenne.teams){
            team.applyShield();
        }
    }

    cleanUpGameVariables(){
        this.findWinner();
        this.Odenne.Statistics.processEndGame();
    }

    preparePassives(){
        for(const team of this.Odenne.teams){
            team.runPassiveSkills();
        }
    }

    prepareStart(){
        this.turn = {
            type: TurnTypes.ATTACK,
            team: 1,
            player: this.getRandomPlayer(1)
        };


        this.preparePassives();
        this.Odenne.status.set(STATUSCODES.STARTED);
    }
}
export default Referee;
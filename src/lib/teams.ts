import _ from "lodash";
import Odenne from "../odenne";
import { Boost, Item, OdennePlayer, OriginalPlayer, OriginalSkill, RandomizableStats, Stats } from "../types/player";
import { DamageDone, DeciderSummary, ShieldDone } from "../types/types";
import Decider from "./decider";
import { Effect, StatBonus } from "./effects";
import { AttackSkill, DefenseSkill, PassiveSkill, Skill } from "./skills";

export class Teams {
    Odenne: Odenne;
    teamCount: number;

    constructor(odenne: Odenne){
        this.Odenne = odenne;

        this.teamCount = 0;
    }

    createTeam(){
        const team = new Team(this.Odenne);
        team.index = this.teamCount;
        this.teamCount++;
        return team;
    }
}

export class Team {
    Odenne: Odenne;
    players: Array<Player>;
    index: number;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
        this.players = [];
        this.index = 0;
    }

    checkIfMember(player: Player){
        for(const p of this.players){
            if(p === player) return true;
        }
        return false;
    }

    addPlayer(originalPlayer: OriginalPlayer){
        const player = new Player(this, originalPlayer);
        this.players.push(player);
    }

    insertCreatedPlayer(player: Player){
        player.team = this;
        this.players.push(player);
    }

    isAllPlayersDead(): boolean {
        for(const player of this.players){
            if(player.player.stats.health > 0) return false;
        }
        return true;
    }

    getSummaries(): DeciderSummary{
        const summaries: DeciderSummary[] = []
        for(const player of this.players){
            summaries.push(player.Decider.getSummary())
        }
        if(summaries.length === 1) return summaries[0];
        else{
            const summary: DeciderSummary = {damageDone: [], damageTaken: [], effects: [], shieldTaken: []};
            for(const sum of summaries){
                for(const key in sum){
                    for(const elem of sum[key as keyof DeciderSummary]){
                        summary[key as keyof DeciderSummary].push(elem as DamageDone & Effect & ShieldDone)
                    }
                }
            }
            return summary;
        }
    }

    applyRound(){
        for(const player of this.players){
            player.Decider.apply();
        }
    }

    clear(){
        for(const player of this.players){
            player.Decider.clear();
        }
    }

    applyDamage(){
        for(const player of this.players){
            player.Decider.applyTakenDamages();
        }
    }

    applyShield(){
        for(const player of this.players){
            player.Decider.applyTakenShields();
        }
    }

    runPassiveSkills(){
        for(const player of this.players){
            player.preparePassiveSkills();
        }
    }
}

export class Member {
    team: Team;
    original: OriginalPlayer;
    player: OdennePlayer;
    Decider!: Decider;
    effects: Effect[];

    constructor(Team: Team, original: OriginalPlayer){
        this.team = Team;
        this.original = original;
        this.player = {
            stats: {},
            baseStats: {},
            skills: [],
            shields: {
                temporary: [],
                permanent: 0
            },
            boost: this.original.boost.isBoost ? this.original.boost.boost : undefined
        };

        this.effects = [];
    }

    addEffect(effect: Effect){
        this.effects.push(effect);
    }

    static randomizeStats(stats: RandomizableStats){
        const newStats: Stats = {};

        for(const stat in stats){
            newStats[stat] = Math.floor(Math.random() * (stats[stat][1] - stats[stat][0] + 1)) + stats[stat][0];
        }
        return newStats;
    }

    hasEffect(effectType: string){
        const effects = this.effects.filter(e => e.constructor.name === effectType);
        if(effects.length > 0) return effects[0]
    }

    hasCC(){
        const CCs = ["Blind", "Stun", "Freeze"];

        for(const cc of CCs){
            const effect = this.hasEffect(cc);
            if(effect) return effect;
        }
    }

    reduceShields(){
        for(let i = 0; i < this.player.shields.temporary.length; i++){
            this.player.shields.temporary[i].count -= 1;
            if(this.player.shields.temporary[i].count === 0){
                this.player.shields.temporary.splice(i, 1);
                i--;
            }
        }
    }

    getRandomSkill(): Skill | undefined {
        const maxAttackTryCount = 2;
        const maxDefenseTryCount = 1;
        let count = 0;
        const usingCount = this.team.Odenne.Referee.turn.player.player as Member === this ? maxAttackTryCount : maxDefenseTryCount;
        const totalChance = this.player.skills.reduce((prev, curr) => prev += curr.chance, 0);

        while(count < usingCount){
            const randomized = this.team.Odenne.Rarity.rand(0, totalChance, -2) as number;

            const randomSkill = this.findSkillByRandom(randomized);
            if(this.isSkillValid(randomSkill) && randomSkill.isAvailable()){
                return randomSkill;
            }
            count++;
        }

        if(this.team.Odenne.Referee.turn.player.player as Member === this){
            return this.player.skills[0];
        }
    }

    // for temporary effects
    getPrimitiveStat(type: string): number{
        let sum = this.player.stats[type];

        for(const effect of this.effects){
            if(effect instanceof StatBonus){ 
                sum += effect.get(type);
            }
        }
        return sum;
    }

    private findSkillByRandom(random: number): Skill{
        let sum = 0;

        for(const skill of this.player.skills){
            if(random >= sum && random < (sum + skill.chance)){
                return skill;
            }
            else sum += skill.chance;
        }

        return this.player.skills[0];
    }

    private isSkillValid(skill: Skill): boolean {
        if(this.team.Odenne.Referee.turn.player.player as Member === this){
            return skill instanceof AttackSkill;
        }
        else {
            return skill instanceof DefenseSkill;
        }
    }

    getStat(type: string){
        if(type === "accuracy"){
            return this.getPrimitiveStat(type) > 100 ? 100 : this.getPrimitiveStat(type);
        }
        return Math.floor(this.getPrimitiveStat(type));
    }
}

export class Player extends Member {
    DIVIDERS: {[key: string]: number};


    constructor(Team: Team, original: OriginalPlayer){
        super(Team, original);
        this.Decider = new Decider(this);
        this.DIVIDERS = {
            attack: 5,
            defense: 5,
            health: 1,
            accuracy: 1,
            critic: 10,
            penetration: 5
        }


        this.prepare();
    }

    getStat(type: string){
        if(type === "accuracy"){
            return this.getPrimitiveStat(type) > 100 ? 100 : this.getPrimitiveStat(type);
        }
        return Math.floor(this.getPrimitiveStat(type));
    }

    prepare(){
        this.createStats();
        this.calculateItemStats();
        this.divideStats();

        this.prepareSetBonuses();

        this.prepareSkills();
    }

    addBoost(){
        if(this.player.boost){
            for(const key of Object.keys(this.player.boost)){
                if(key == 'name' || key == 'duration') continue;

                if(this.player.boost[key as keyof Boost][0] === 0){
                    this.player.stats[key] += this.player.boost[key as keyof Boost][1];
                }
                // implement % boosts
            }
        }
    }
 
    createStats(){
        this.player.stats = this.original.stats;
        this.addBoost();
        if(this.team){
            if(this.team.Odenne.options.shouldOverwriteHealth){
                if(this.team.index === this.team.Odenne.options.healthOverwrite[0]){
                    this.player.stats.health = this.team.Odenne.options.healthOverwrite[2];
                }
            }
        }
    }

    divideStats(){
        for(const key of Object.keys(this.player.stats)){
            this.player.stats[key] = Math.floor(this.player.stats[key] / this.DIVIDERS[key]);
        }

        this.player.baseStats = _.cloneDeep(this.player.stats);
    }

    calculateItemStats(){
        if(this.team && this.team.Odenne.options.shouldCalculateItemStats(this.team.index)){
            for(const clothKey of Object.keys(this.original.wearings)){
                if(clothKey == 'skills') continue;

                const item: Item = this.original.wearings[clothKey] as Item;
                if(item.durability > 0 ){
                    for(const stat of Object.keys(item.stats)){
                        this.player.stats[stat] += item.stats[stat];
                    }
                }
            }
        }
    }

    prepareSetBonuses(){
        this.team.Odenne.BonusFactory.create(this);
    }

    findSkillFromConfig(id: number): OriginalSkill | undefined{
        for(const skill of this.team.Odenne.SkillConfig){
            if(skill.id == id) return skill;
        }
    }



    prepareSkills(){
        for(const skillId of (this.original.wearings.skills as Array<number>)){
            const skill: OriginalSkill = this.findSkillFromConfig(skillId) as OriginalSkill;
            try{
                this.team.Odenne.Skills.create(this, _.cloneDeep(skill));
            }
            catch(e){
                // oops
            }
        }
    }

    preparePassiveSkills(){
        for(const skill of this.player.skills){
            if(skill instanceof PassiveSkill) skill.applyEffect();
        }
    }

}

export class Enemy extends Player{
    
}

export default Teams;
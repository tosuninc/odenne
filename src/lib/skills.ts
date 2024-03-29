import Odenne from "../odenne";
import { DAMAGETYPES, OriginalSkill, SHIELDTYPES } from "../types/player";
import { BonusDetails, CancelInfo, DamageDone, EffectConfig, EventParameters, EventTypes, ShieldDone, SKILLTYPES } from "../types/types";
import { Effect } from "./effects";
import { CriticModifier, Modifier, RangeModifier } from "./modifiers";
import { Player } from "./teams";


export default class Skills {
    Odenne: Odenne;

    constructor(odenne: Odenne){
        this.Odenne = odenne;
    }
    /**
     * 0 - 1000: Archer
     * 1000 - 2000: Assassin
     * 2000 - 3000: Mage
     * 3000 - 4000: Warrior
     */
    create(player: Player, skill: OriginalSkill) {
        let isCreated = false;
        switch (skill.id) {
            //#region Archer Skills
            case 0:
                player.player.skills.push(new ArcherBasicAttackI(player, skill));
                isCreated = true;
                break;
            case 10:
                player.player.skills.push(new ArcaneShotI(player, skill));
                isCreated = true;
                break;
            case 20:
                player.player.skills.push(new DodgeI(player, skill));
                isCreated = true;
                break;
            case 30:
                player.player.skills.push(new ArrowRainI(player, skill));
                isCreated = true;
                break;
            case 40:
                player.player.skills.push(new TacticalI(player, skill));
                isCreated = true;
                break;
            case 50:
                player.player.skills.push(new OneTheHuntI(player, skill));
                isCreated = true;
                break;
            case 60:
                player.player.skills.push(new LongShotsI(player, skill));
                isCreated = true;
                break;
            case 70:
                player.player.skills.push(new AccuracyI(player, skill));
                isCreated = true;
                break;
            case 80:
                player.player.skills.push(new PoisonI(player, skill));
                isCreated = true;
                break;
            case 90:
                player.player.skills.push(new SnipeI(player, skill));
                isCreated = true;
                break;
            case 100:
                player.player.skills.push(new RangerI(player, skill));
                isCreated = true;
                break;
            case 110:
                player.player.skills.push(new ColdBloodI(player, skill));
                isCreated = true;
                break;
            case 120:
                player.player.skills.push(new FocusI(player, skill));
                isCreated = true;
                break;
            case 130:
                player.player.skills.push(new HeadStartI(player, skill));
                isCreated = true;
                break;
                //#endregion

            //#region Assassin Skills
            case 1000:
                player.player.skills.push(new AssassinBasicAttackI(player, skill));
                isCreated = true;
                break;
            case 1010:
                player.player.skills.push(new BetrayalI(player, skill));
                isCreated = true;
                break;
            case 1020:
                player.player.skills.push(new ThinArmorI(player, skill));
                isCreated = true;
                break;
            case 1030:
                player.player.skills.push(new BladeRainI(player, skill));
                isCreated = true;
                break;
            case 1040:
                player.player.skills.push(new TheUntouchableI(player, skill));
                isCreated = true;
                break;
            case 1050:
                player.player.skills.push(new BlindI(player, skill));
                isCreated = true;
                break;
            case 1060:
                player.player.skills.push(new StealthI(player, skill));
                isCreated = true;
                break;
            case 1070:
                player.player.skills.push(new ExecutionerI(player, skill));
                isCreated = true;
                break;
            case 1080:
                player.player.skills.push(new SlaughterI(player, skill));
                isCreated = true;
                break;
            case 1090:
                player.player.skills.push(new CatalystI(player, skill));
                isCreated = true;
                break;
            case 1100:
                player.player.skills.push(new MasterAssassinI(player, skill));
                isCreated = true;
                break;
            case 1110:
                player.player.skills.push(new DeadlyMarkI(player, skill));
                isCreated = true;
                break;
            case 1120:
                player.player.skills.push(new ParalyzeI(player, skill));
                isCreated = true;
                break;
            case 1130:
                player.player.skills.push(new BackstabI(player, skill));
                isCreated = true;
                break;
                //#endregion

            //#region Mage Skills
            case 2000:
                player.player.skills.push(new MageBasicAttackI(player, skill));
                isCreated = true;
                break;
            case 2010:
                player.player.skills.push(new FireballI(player, skill));
                isCreated = true;
                break;
            case 2020:
                player.player.skills.push(new TheMirrorI(player, skill));
                isCreated = true;
                break;
            case 2030:
                player.player.skills.push(new IgniteI(player, skill));
                isCreated = true;
                break;
            case 2040:
                player.player.skills.push(new FreezeI(player, skill));
                isCreated = true;
                break;
            case 2050:
                player.player.skills.push(new IcebornI(player, skill));
                isCreated = true;
                break;
            case 2060:
                player.player.skills.push(new BlizzardI(player, skill));
                isCreated = true;
                break;
            case 2070:
                player.player.skills.push(new ForesightI(player, skill));
                isCreated = true;
                break;
            case 2080:
                player.player.skills.push(new DestructionI(player, skill));
                isCreated = true;
                break;
            case 2090:
                player.player.skills.push(new MageAdeptI(player, skill));
                isCreated = true;
                break;
            case 2100:
                player.player.skills.push(new MagelightI(player, skill));
                isCreated = true;
                break;
            case 2110:
                player.player.skills.push(new MimicI(player, skill));
                isCreated = true;
                break;
            case 2120:
                player.player.skills.push(new IllusionI(player, skill));
                isCreated = true;
                break;
            case 2130:
                player.player.skills.push(new MeteorI(player, skill));
                isCreated = true;
                break;

                //#endregion

            //#region Warrior Skills
            case 3000:
                player.player.skills.push(new WarriorBasicAttackI(player, skill));
                isCreated = true;
                break;
            case 3010:
                player.player.skills.push(new BashI(player, skill));
                isCreated = true;
                break;
            case 3020:
                player.player.skills.push(new ShieldStrikeI(player, skill));
                isCreated = true;
                break;
            case 3030:
                player.player.skills.push(new TheDefenderI(player, skill));
                isCreated = true;
                break;
            case 3040:
                player.player.skills.push(new ShieldUpI(player, skill));
                isCreated = true;
                break;
            case 3050:
                player.player.skills.push(new AwakenI(player, skill));
                isCreated = true;
                break;
            case 3060:
                player.player.skills.push(new UnstoppableI(player, skill));
                isCreated = true;
                break;
            case 3070:
                player.player.skills.push(new FuryI(player, skill));
                isCreated = true;
                break;
            case 3080:
                player.player.skills.push(new CircleOfProtectionI(player, skill));
                isCreated = true;
                break;
            case 3090:
                player.player.skills.push(new TauntI(player, skill));
                isCreated = true;
                break;
            case 3100:
                player.player.skills.push(new BruteForceI(player, skill));
                isCreated = true;
                break;
            case 3110:
                player.player.skills.push(new RageI(player, skill));
                isCreated = true;
                break;
            case 3120:
                player.player.skills.push(new MagmaArmorI(player, skill));
                isCreated = true;
                break;
            case 3130:
                player.player.skills.push(new EvolveI(player, skill));
                isCreated = true;
                break;
                //#endregion
            default:
                break;
        }

        const isEnemySkill = skill.id >= 10000 && skill.id <= 19999;
        const isDungeonSkills = (skill.id >= 65000 && skill.id <= 65999) || (skill.id >= 69000 && skill.id <= 69999) || (skill.id >= 69999 && skill.id <= 70100);

        if(!isCreated && (isEnemySkill || isDungeonSkills)){
            player.player.skills.push(new ArcherBasicAttackI(player, skill));
            isCreated = true;
        }


        if (isCreated) return player.player.skills[player.player.skills.length - 1];
        else return undefined;
    }
}

export abstract class Skill {
    skill!: OriginalSkill;
    damageType!: DAMAGETYPES;
    modifiers!: Modifier[];
    player!: Player;
    chance!: number;
    maxUseCount = 1;
    usedRounds: number[] = [];
    effects: string[] = [];
    enabled = true;
    type: SKILLTYPES = SKILLTYPES.ABILITY;

    registerModifier(modifier: Modifier){
        this.modifiers.push(modifier);
    }

    run(){
        return this.do();
    }

    abstract do(): SkillResult;

    findTarget(): {id: number, player: Player} {
        const opponentIndex = (this.player.team.index + 1) % 2;
        return this.player.team.Odenne.Referee.getRandomPlayer(opponentIndex, {considerTaunt: true});
    }

    applyDamage(damages: DamageDone[]){
        for(const damage of damages){
            damage.target.Decider.takeDamage(damage);
        }
    }

    applyEffects(effects: Effect[]): CancelInfo[] {
        const cancels: CancelInfo[] = []
        for(const eff of effects){
            const cancel = eff.config.targetMember.Decider.takeEffect(eff);
            cancels.push(cancel);
        }
        return cancels;
    }

    applyShield(shields: ShieldDone[]){
        for(const shield of shields){
            shield.target.Decider.takeShield(shield);
        }
    }


    saveUse(){
        this.usedRounds.push(this.player.team.Odenne.Referee.roundCount);
    }

    saveEvent(event: EventParameters){
        this.player.team.Odenne.Narrator.saveEvent(event);
    }

    isAvailable(): boolean {
        if(!this.enabled) return false;
        if(this.maxUseCount === -1 || this.usedRounds.length === 0) return true;
        if(this.player.team.Odenne.Referee.roundCount - this.usedRounds[this.usedRounds.length - 1] > 2) return true;

        let usedCount = 1;
        for(let i = this.usedRounds.length - 2; i >= 0; i--){
            if(this.usedRounds[i] === this.usedRounds[i+1] - 2) usedCount++;
            else break;
        }

        return this.maxUseCount > usedCount;
    }
}

export class SkillResult {
    player: Player;
    damaged: DamageDone[];
    shields: ShieldDone[];

    constructor(player: Player){
        this.player = player;
        this.damaged = [];
        this.shields = [];
    }

    addDamage(damage: DamageDone){
        this.damaged.push(damage);
    }

    addShield(shield: ShieldDone){
        this.shields.push(shield);
    }
}

export abstract class PassiveSkill extends Skill {
    skill!: OriginalSkill;
    player!: Player;
    damageType!: DAMAGETYPES;

    abstract applyEffect(): void;
}

export abstract class ActiveSkill extends Skill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player!: Player;
    damageType!: DAMAGETYPES;
}
export abstract class AttackSkill extends ActiveSkill {
    modifiers: Modifier[];
    constructor(){
        super();
        this.modifiers = [];
    }

    protected prepare(){
        const rangemodifier = this.player.team.Odenne.Modifiers.create("RangeModifier", this.player, this) as RangeModifier;
        this.registerModifier(rangemodifier);
        const criticmodifier = this.player.team.Odenne.Modifiers.create('CriticModifier', this.player, this) as CriticModifier;
        this.registerModifier(criticmodifier);
    }
}
export abstract class DefenseSkill extends ActiveSkill {

}

//#region Basic Attacks

export class ArcherBasicAttackI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;
        this.type = SKILLTYPES.BASIC;
        this.maxUseCount = -1;
        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class AssassinBasicAttackI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;
        this.maxUseCount = -1;
        this.type = SKILLTYPES.BASIC;
        this.prepare();
        this.effects = [];
    }

    

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class MageBasicAttackI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;
        this.maxUseCount = -1;
        this.type = SKILLTYPES.BASIC;
        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class WarriorBasicAttackI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;
        this.maxUseCount = -1;
        this.type = SKILLTYPES.BASIC;
        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

// #endregion


//#region Archer Skills

export class ArcaneShotI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class ArrowRainI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 500;
        this.maxUseCount = 1;
        this.prepare();
        

        this.effects = ["RandomExtraDamage"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player};
        const yarrakEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([yarrakEffect]);

        return result;
    }
    
}

export class DodgeI extends DefenseSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.player = player;
        this.skill = skill;
        this.chance = 60;
        this.maxUseCount = 1;
        
        this.effects = ["Dodge"];
    }

    do(): SkillResult {
        this.saveUse();

        const result = new SkillResult(this.player);
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const dodgeEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;
        this.applyEffects([dodgeEffect]);

        return result;
    }
}

export class OneTheHuntI extends AttackSkill {
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ['ExtraAttack'];
    }

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);

        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const samuraiEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([samuraiEffect]);

        return result;
    }
}

export class FocusI extends PassiveSkill {
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.type = SKILLTYPES.ULTIMATE;
        this.effects = ['Focus'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const focusEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([focusEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class ColdBloodI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.NONE;
        this.type = SKILLTYPES.ULTIMATE;
        this.chance = 100;
        this.effects = ["AttackBonus"];
    }

    applyEffect() {
        const bonusDetails: BonusDetails = {
            value: 40,
            type: 2,
            count: -1
        }
        const effConfig: EffectConfig = {
            source: this,
            sourceMember: this.player,
            targetMember: this.player
        }
        const effect = this.player.team.Odenne.Effects.new(this.effects[0], effConfig, bonusDetails) as Effect;
        this.applyEffects([effect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
    
}

export class SnipeI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;
        this.maxUseCount = 1;

        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: true});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class HeadStartI extends PassiveSkill {
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.type = SKILLTYPES.ULTIMATE;
        this.effects = ['SineminCizimTableti'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const sctEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([sctEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class RangerI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['WearingAttackBonus'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const tmEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([tmEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class TacticalI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['ExtraCritic'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const aysEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([aysEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class AccuracyI extends AttackSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;
        this.maxUseCount = 1;

        this.effects = [];
        this.prepare();
    }

    do(): SkillResult {
        this.saveUse()
        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        this.skill.min = this.skill.min as number * 2;
        this.skill.max = this.skill.max as number * 2;

        return result;
    }
}

export class LongShotsI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['OmnininCocugu'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const ocEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([ocEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class PoisonI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['AlpinGriPolosu'];
    }

    applyEffect(): void {
        const target = this.findTarget();
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player}
        const agpEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([agpEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}



//#endregion


//#region Assassin Skills

export class BetrayalI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class BladeRainI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 500;
        this.maxUseCount = 1;
        this.prepare();
        

        this.effects = ["WaffleinHukmu"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player};
        const yarrakEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([yarrakEffect]);

        return result;
    }
    
}

export class ThinArmorI extends AttackSkill {
    constructor(player: Player, skill: OriginalSkill){
        super()

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.damageType = DAMAGETYPES.RANGED;

        this.maxUseCount = 1;

        this.effects = ["DefenseBonus"];
        this.prepare();
    }

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player};

        const details: BonusDetails = {value: -35, type: 1, count: 3}
        const breakEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig, details) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([breakEffect]);

        return result;
    }
    
}

export class StealthI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["Invulnerable"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player, count: -31} // Kimse sorgulayamaz bizi pussy boylar.
        const invulEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([invulEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class TheUntouchableI extends AttackSkill {
    constructor(player: Player, skill: OriginalSkill){
        super()

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.damageType = DAMAGETYPES.NONE;

        this.maxUseCount = 1;
        this.effects = ["CriticBonus", "Invulnerable"];
    }

    do(): SkillResult {
        this.saveUse();
        
        const result = new SkillResult(this.player);

        
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const details: BonusDetails = {value: 35, type: 1, count: 3}
        const critBonus = this.player.team.Odenne.Effects.new(this.effects[0], effconfig, details) as Effect;

        const invconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player, count: 2};
        const invulEffect = this.player.team.Odenne.Effects.new(this.effects[1], invconfig) as Effect;

        this.applyEffects([critBonus, invulEffect]);

        return result;
    }
    
}

export class BlindI extends AttackSkill {
    constructor(player: Player, skill: OriginalSkill){
        super()

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.damageType = DAMAGETYPES.RANGED;

        this.maxUseCount = 1;
        this.effects = ["Blind"];
        this.prepare();
    }

    do(): SkillResult {
        this.saveUse();
        
        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        const invconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player, count: 2};
        const blindEffect = this.player.team.Odenne.Effects.new(this.effects[0], invconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([blindEffect]);

        return result;
    }
    
}

export class ExecutionerI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["HasmetliHatirati"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player} // Kimse sorgulayamaz bizi pussy boylar.
        const execEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([execEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class SlaughterI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["MakarnaCanavari"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const mcEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([mcEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class CatalystI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["PestoSosluMakarna"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const mcEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([mcEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class MasterAssassinI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["SukruSaracoglu"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const mcEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([mcEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class ParalyzeI extends AttackSkill {
    disabledSkill!: Skill;

    constructor(player: Player, skill: OriginalSkill){
        super()

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.damageType = DAMAGETYPES.RANGED;
        this.type = SKILLTYPES.ULTIMATE;
        this.maxUseCount = 1;
        this.prepare();
    }

    private disableTargetSkill(target: Player){
        const targetSkillset: ActiveSkill[] = [];
        for(let i = 1; i < target.player.skills.length; i++){
            if(target.player.skills[i] instanceof ActiveSkill){
                targetSkillset.push(target.player.skills[i] as ActiveSkill);
            }
        }
        if(targetSkillset.length > 0){
            for(const skill of targetSkillset){
                if(!skill.enabled) skill.enabled = true;
            }
            const random = Math.floor(Math.random() * targetSkillset.length);
            targetSkillset[random].enabled = false;
            this.disabledSkill = targetSkillset[random];
        }
    }

    do(): SkillResult {
        this.saveUse();
        
        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.disableTargetSkill(target.player);
        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class DeadlyMarkI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["HakimBey"];
        this.type = SKILLTYPES.ULTIMATE;
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const mcEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([mcEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class BackstabI extends DefenseSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.player = player;
        this.skill = skill;
        this.chance = 60;
        this.maxUseCount = 1;
        this.type = SKILLTYPES.ULTIMATE;
        this.effects = ["RuhsarinIntikami"];
    }

    do(): SkillResult {
        this.saveUse();

        const result = new SkillResult(this.player);
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const dodgeEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;
        this.applyEffects([dodgeEffect]);

        return result;
    }
}

//#endregion


//#region Mage Skills

export class FireballI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class TheMirrorI extends DefenseSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.player = player;
        this.skill = skill;
        this.chance = 1000;
        this.maxUseCount = 1;
        
        this.effects = ["TheMirror"];
    }

    do(): SkillResult {
        this.saveUse();

        const result = new SkillResult(this.player);
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const dodgeEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;
        this.applyEffects([dodgeEffect]);

        return result;
    }
}

export class IgniteI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ["Ignite"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        const effConfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player}
        const igniteEffect = this.player.team.Odenne.Effects.new(this.effects[0], effConfig) as Effect;
        this.applyEffects([igniteEffect]);
        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class FreezeI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ["Frozen"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        const effConfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player}
        const igniteEffect = this.player.team.Odenne.Effects.new(this.effects[0], effConfig) as Effect;
        this.applyEffects([igniteEffect]);
        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class IcebornI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["FrozenCut"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const invulEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([invulEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class BlizzardI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ['Frozen'];
    }


    private increaseDamageIfTargetIsFrozen(result: SkillResult){
        for(const damageDone of result.damaged){
            damageDone.damage *= 2;
        }
        return result;
    }

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        if(target.player.hasEffect("Frozen")){
            result = this.increaseDamageIfTargetIsFrozen(result);
        }
        else{
            const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player}
            const invulEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

            this.applyEffects([invulEffect]);
        }

        

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class ForesightI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["DefenseBonus"];
    }

    applyEffect(): void {
        const allOpponents = this.player.team.Odenne.teams[ (this.player.team.index + 1) % 2 ].players;
        const bonusDetails: BonusDetails = {value: -10, type: 1, count: -1}
        for(const player of allOpponents){
            const effConfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: player}
            const effect = this.player.team.Odenne.Effects.new(this.effects[0], effConfig, bonusDetails) as Effect;
            player.Decider.takeEffect(effect);
        }
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class DestructionI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["Destructor"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const desEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([desEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class MageAdeptI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ['SineminAnnelikIcgudusu'];
    }

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        const effConfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player, count: -1};
        const effect = this.player.team.Odenne.Effects.new(this.effects[0], effConfig) as Effect;

        this.applyEffects([effect]);
        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class MagelightI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["DefenseBonus"];
    }

    applyEffect(): void {
        const target = this.findTarget();

        const bonusDetails: BonusDetails = {value: -50, type: 1, count: 5};
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player}
        const dbEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig, bonusDetails) as Effect;

        this.applyEffects([dbEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class MeteorI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 1000;
        this.type = SKILLTYPES.ULTIMATE;
        this.prepare();
        this.effects = ["MeteorRain"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        const effConfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player}
        const igniteEffect = this.player.team.Odenne.Effects.new(this.effects[0], effConfig) as Effect;
        this.applyEffects([igniteEffect]);
        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class IllusionI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.NONE;
        this.chance = 100;
        this.maxUseCount = 1;

        this.effects = ['Illusion'];
    }

    do(): SkillResult {
        this.saveUse();

        const result = new SkillResult(this.player);

        const effConfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player, count: -1};
        const effect = this.player.team.Odenne.Effects.new(this.effects[0], effConfig) as Effect;

        this.applyEffects([effect]);

        const event: EventParameters = {
            type: EventTypes.ROUND_STEAL,
            attacker: this.player.original.name
        }
        this.saveEvent(event);

        return result;
    }
    
}

export class MimicI extends AttackSkill {
    copiedSkill: Skill | undefined;

    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["Copycat"];
        this.copiedSkill = undefined;
        this.enabled = false;
        this.applyEffect();
        this.maxUseCount = -1;
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const dbEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([dbEffect]);
    }

    do(): SkillResult {
        if(this.copiedSkill){
            return this.copiedSkill.do();
        }
        else return new SkillResult(this.player);
    }

    
}

//#endregion


//#region Warrior Skills

export class BashI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);

        return result;
    }
    
}

export class ShieldStrikeI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = [];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        result.addShield({value: this.skill.shieldMin as number, source: {player: this.player, source: this}, target: this.player, type: SHIELDTYPES.TEMP, cancel: {isCancelled: false}});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        this.applyDamage(result.damaged);
        this.applyShield(result.shields);

        return result;
    }
}


export class TheDefenderI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ["Stun"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player};
        const stunEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([stunEffect]);
        

        return result;
    }
}

export class ShieldUpI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ["DefenseBonus"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        result.addShield({value: this.skill.shieldMin as number, source: {player: this.player, source: this}, target: this.player, type: SHIELDTYPES.TEMP, cancel: {isCancelled: false}});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        // context ayni
        const details: BonusDetails = {value: 50, type: 1, count: 2};
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const dbEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig, details) as Effect;

        this.applyShield(result.shields);
        this.applyEffects([dbEffect]);
        
        return result;
    }
}

export class AwakenI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ["Awaken"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();
        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false, bypass: true});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        // context ayni
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const awEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([awEffect]);
        
        return result;
    }
}

export class UnstoppableI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.effects = ["CrowdControlImmunity"];
    }
    

    do(): SkillResult {
        this.saveUse();

        const result = new SkillResult(this.player);

        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player};
        const immEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        const cancelledEffects = this.applyEffects([immEffect]);
        if(!cancelledEffects[0].isCancelled){
            const event: EventParameters = {
                type: EventTypes.GAIN_CC_IMMUNITY,
                attacker: this.player.original.name,
                skill: this.skill.name
            }
            this.saveEvent(event);
        }
        
        return result;
    }
}

export class FuryI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["FastAndFurious"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player} // Kimse sorgulayamaz bizi pussy boylar.
        const invulEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([invulEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class CircleOfProtectionI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.effects = ["ValenianinAdaleti"];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const vaEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([vaEffect]);
    }

    do(): SkillResult {
        return new SkillResult(this.player);
    }

    
}

export class TauntI extends AttackSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.RANGED;
        this.chance = 100;

        this.prepare();
        this.effects = ["Taunt"];
    }

    

    do(): SkillResult {
        this.saveUse();

        let result = new SkillResult(this.player);
        const target = this.findTarget();

        result.addDamage({damage: this.skill.min as number, source: {player: this.player, source: this}, target: target.player, cancel: {isCancelled: false}, isTrue: false});
        for(const modifier of this.modifiers){
            result = modifier.apply(result);
        }

        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: target.player};
        const dbEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyDamage(result.damaged);
        this.applyEffects([dbEffect]);
        
        return result;
    }
}

export class BruteForceI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;

        this.effects = ['HakFive'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const hfEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([hfEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class RageI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.type = SKILLTYPES.ULTIMATE;
        this.effects = ['Ataturk'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const ataEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([ataEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class MagmaArmorI extends PassiveSkill {
    constructor(player: Player, skill: OriginalSkill){
        super();

        this.player = player;
        this.skill = skill;
        this.chance = 100;
        this.type = SKILLTYPES.ULTIMATE;
        this.effects = ['AttackReflect'];
    }

    applyEffect(): void {
        const effconfig: EffectConfig = {source: this, sourceMember: this.player, targetMember: this.player}
        const maEffect = this.player.team.Odenne.Effects.new(this.effects[0], effconfig) as Effect;

        this.applyEffects([maEffect]);
    }
    do(): SkillResult {
        return new SkillResult(this.player);
    }
}

export class EvolveI extends PassiveSkill {
    skill!: OriginalSkill;
    roundType = 'attack';
    player: Player;
    effects: string[];

    constructor(player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = player;
        this.damageType = DAMAGETYPES.NONE;
        this.chance = 100;
        this.type = SKILLTYPES.ULTIMATE;
        this.effects = ["DefenseBonus"];
    }

    applyEffect(): void {
        const bonusDetails: BonusDetails = {
            value: 50,
            type: 2,
            count: -1
        }
        const effConfig: EffectConfig = {
            source: this,
            sourceMember: this.player,
            targetMember: this.player
        }
        const effect = this.player.team.Odenne.Effects.new(this.effects[0], effConfig, bonusDetails) as Effect;

        this.applyEffects([effect]);
    }
    

    do(): SkillResult {
        this.saveUse();

        const missingHealth = this.player.player.baseStats.health - this.player.player.stats.health;
        const percentage = missingHealth / this.player.player.baseStats.health * 100;
        const gainIncrease = percentage / 100 * 50;

        this.player.player.stats.defense += this.player.player.stats.defense * gainIncrease / 100;

        return new SkillResult(this.player);
    }
}
//#endregion






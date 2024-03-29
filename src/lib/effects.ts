import Odenne from "../odenne";
import { Item } from "../types/player";
import { BonusDetails, CancelInfo, DamageDone, EffectConfig, EventParameters, EventTypes } from "../types/types";
import { Environment } from "./environments";
import { MimicI, Skill } from "./skills";
import { Player } from "./teams";

export default class Effects {
    Odenne: Odenne;

    constructor(odenne: Odenne){
        this.Odenne = odenne;
    }

    new(name: string, config: EffectConfig, details: BonusDetails | undefined = undefined) : Effect | undefined{
        switch(name){
            case 'Ignite':
                return new Ignite(config);
            case 'Dodge':
                return new Dodge(config);
            case 'RandomExtraDamage':
                return new RandomExtraDamage(config);
            case 'WaffleinHukmu':
                return new WaffleinHukmu(config);
            case 'ExtraAttack':
                return new ExtraAttack(config);
            case 'Focus':
                return new Focus(config);
            case 'AttackBonus':
                return new AttackBonus(config, details as BonusDetails);
            case 'DefenseBonus':
                return new DefenseBonus(config, details as BonusDetails);
            case 'CriticBonus':
                return new CriticBonus(config, details as BonusDetails);
            case 'HealthBonus':
                return new HealthBonus(config, details as BonusDetails);
            case 'Invulnerable':
                return new Invulnerable(config);
            case 'SineminCizimTableti':
                return new SineminCizimTableti(config);
            case 'WearingAttackBonus':
                return new WearingAttackBonus(config);
            case 'ExtraCritic':
                return new ExtraCritic(config);
            case 'OmnininCocugu':
                return new OmnininCocugu(config);
            case 'AlpinGriPolosu':
                return new AlpinGriPolosu(config);
            case 'Blind':
                return new Blind(config);
            case 'HasmetliHatirati':
                return new HasmetliHatirati(config);
            case 'MakarnaCanavari':
                return new MakarnaCanavari(config);
            case 'PestoSosluMakarna':
                return new PestoSosluMakarna(config);
            case 'SukruSaracoglu':
                return new SukruSaracoglu(config);
            case 'HakimBey':
                return new HakimBey(config);
            case 'RuhsarinIntikami':
                return new RuhsarinIntikami(config);
            case 'Stun':
                return new Stun(config);
            case 'Awaken':
                return new Awaken(config);
            case 'CrowdControlImmunity':
                return new CrowdControlImmunity(config);
            case 'FastAndFurious':
                return new FastAndFurious(config);
            case 'ValenianinAdaleti':
                return new ValenianinAdaleti(config);
            case 'Taunt':
                return new Taunt(config);
            case 'HakFive':
                return new HakFive(config);
            case 'Ataturk':
                return new Ataturk(config);
            case 'AttackReflect':
                return new AttackReflect(config);
            case 'TheMirror':
                return new TheMirror(config);
            case 'Frozen':
                return new Frozen(config);
            case 'FrozenCut':
                return new FrozenCut(config);
            case 'Destructor':
                return new Destructor(config);
            case 'SineminAnnelikIcgudusu':
                return new SineminAnnelikIcgudusu(config);
            case 'MeteorRain':
                return new MeteorRain(config);
            case 'Illusion':
                return new Illusion(config);
            case 'Copycat':
                return new Copycat(config);
            default:
                return undefined;
        }
    }

}


export abstract class Effect {
    config: EffectConfig;
    count!: number;
    cancel: CancelInfo;
    emoji = "";

    constructor(config: EffectConfig){
        this.config = config;
        this.cancel = {isCancelled: false}
    }

    reduce(){
        if(this.count > 0){
            this.count -= 1;
        }
        this.cancel = {isCancelled: false};
    }

    hasExpired(){
        return this.count == 0;
    }

    saveEvent(event: EventParameters){
        this.config.targetMember.team.Odenne.Narrator.saveEvent(event);
    }

    protected checkIfTargetDealtAnyDamage(){
        for(const damage of this.config.targetMember.Decider.Current.damageDone){
            if(damage.cancel.isCancelled === false && damage.damage > 0) return true
        }

        return false;
    }

    abstract init(): void;
    abstract do(): void;
    abstract afterDo(): void;
}

export abstract class ActiveEffect extends Effect{

    constructor(config: EffectConfig){
        super(config);
    }
}

export abstract class PassiveEffect extends Effect {

    constructor(config: EffectConfig){
        super(config);
        this.count = -1;
    }


}

export abstract class StatBonus extends ActiveEffect {
    details!: BonusDetails

    constructor(config: EffectConfig, details:BonusDetails){
        super(config);

        this.details = details;
        this.count = this.details.count;
    }

    abstract get(type: string): number;
}

export class EffectResult {
    source: Player | Environment |  undefined;

    setSource(player: Player){
        this.source = player;
    }
}

export abstract class CrowdControlEffect extends ActiveEffect {
    protected removeDamages(){
        for(const damageDone of this.config.targetMember.Decider.Current.damageDone){
            for(const damageTaken of damageDone.target.Decider.Current.damageTaken){
                if(this.config.targetMember === damageTaken.source.player){
                    damageTaken.cancel = {
                        isCancelled: true, 
                        source: this, 
                        sourceMember: this.config.sourceMember
                    };
                }
            }
        }
    }
}

//#region Stat Bonuses

export class AttackBonus extends StatBonus {
    constructor(config: EffectConfig, details: BonusDetails){
        super(config, details);
    }

    private getIncreaseByMissingHealth(){
        const missingHealth = this.config.targetMember.player.baseStats.health - this.config.targetMember.player.stats.health;
        const missingPercentage = missingHealth / this.config.targetMember.player.baseStats.health * 100;
        if(missingPercentage >= this.details.value){
            return this.config.targetMember.player.stats.attack * this.details.value / 100;
        }
        return this.config.targetMember.player.stats.attack * missingPercentage / 100;
    }

    get(type: string): number {
        if(type !== "attack") return 0

        if(this.details.type === 0) return this.details.value;
        else if(this.details.type === 1) return this.details.value / 100 * this.config.targetMember.player.stats.attack;
        else if(this.details.type === 2) return this.getIncreaseByMissingHealth();

        return 0;
    }

    init(): void {  }

    do(): void {  }

    afterDo(): void {  }
}

export class HealthBonus extends StatBonus {
    constructor(config: EffectConfig, details: BonusDetails){
        super(config, details);
    }

    private getIncreaseByMissingHealth(){
        const missingHealth = this.config.targetMember.player.baseStats.health - this.config.targetMember.player.stats.health;
        const missingPercentage = missingHealth / this.config.targetMember.player.baseStats.health * 100;
        if(missingPercentage >= this.details.value){
            return this.config.targetMember.player.stats.health * this.details.value / 100;
        }
        return this.config.targetMember.player.stats.health * missingPercentage / 100;
    }

    get(type: string): number {
        if(type !== "health") return 0

        if(this.details.type === 0) return this.details.value;
        else if(this.details.type === 1) return this.details.value / 100 * this.config.targetMember.player.stats.health;
        else if(this.details.type === 2) return this.getIncreaseByMissingHealth();

        return 0;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {}
}

export class DefenseBonus extends StatBonus {
    constructor(config: EffectConfig, details: BonusDetails){
        super(config, details);
    }

    private getIncreaseByMissingHealth(){
        const missingHealth = this.config.targetMember.player.baseStats.health - this.config.targetMember.player.stats.health;
        const missingPercentage = missingHealth / this.config.targetMember.player.baseStats.health * 100;
        if(missingPercentage >= this.details.value){
            return this.config.targetMember.player.stats.defense * this.details.value / 100;
        }
        return this.config.targetMember.player.stats.defense * missingPercentage / 100;
    }

    get(type: string): number {
        if(type !== "defense") return 0

        if(this.details.type === 0) return this.details.value;
        else if(this.details.type === 1) return this.details.value / 100 * this.config.targetMember.player.stats.defense;
        else if(this.details.type === 2) return this.getIncreaseByMissingHealth();

        return 0;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {}
}

export class CriticBonus extends StatBonus {
    constructor(config: EffectConfig, details: BonusDetails){
        super(config, details);
    }

    get(type: string): number {
        if(type !== "critic") return 0

        if(this.details.type === 0) return this.details.value;
        else if(this.details.type === 1) return this.details.value / 100 * this.config.targetMember.player.stats.critic;

        return 0;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {}
}

//#region CrowdControlEffects

export class Stun extends CrowdControlEffect {
    constructor(config: EffectConfig){
        super(config);

        this.count = config.count ?? 2;
    }

    init(): void {}

    do(): void {

    }

    afterDo(): void {
        if(this.checkIfTargetDealtAnyDamage()) this.removeDamages();
    }

    
}

export class Blind extends CrowdControlEffect {
    constructor(config: EffectConfig){
        super(config);

        this.count = config.count ?? 2;
    }

    init(): void {}

    do(): void {

    }

    afterDo(): void {
        if(this.checkIfTargetDealtAnyDamage()) this.removeDamages();
    }

    
}

export class Frozen extends CrowdControlEffect {
    constructor(config: EffectConfig){
        super(config);

        this.count = config.count ?? 2;
    }

    init(): void {}

    do(): void {

    }

    afterDo(): void {
        if(this.checkIfTargetDealtAnyDamage()) this.removeDamages();
    }

    
}

//#endregion

//#endregion

export class Ignite extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 3;
    }

    init(): void {}

    do(): void {
        this.config.targetMember.Decider.takeDamage({
            source: {player: this.config.sourceMember, source: this},
            target: this.config.targetMember,
            cancel: {isCancelled: false},
            damage: 5 + (this.config.sourceMember.getStat('attack') / 2),
            isTrue: false,
        })
    }

    afterDo(): void {}
}

export class RandomExtraDamage extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 2;
    }

    init(): void {}

    do(): void {
        const min = 7;
        const max = 15;
        let dmg = this.config.sourceMember.team.Odenne.Rarity.rand(min, max, -2);
        if(!dmg) dmg = min;

        this.config.targetMember.Decider.takeDamage({
            source: {player: this.config.sourceMember, source: this},
            target: this.config.targetMember,
            cancel: {isCancelled: false},
            damage: dmg + (this.config.sourceMember.getStat('attack') / 2),
            isTrue: false
        })
    }

    afterDo(): void {}
}

export class WaffleinHukmu extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 4;
    }

    init(): void {}

    do(): void {
        const min = 14;
        const max = 18;
        let dmg = this.config.sourceMember.team.Odenne.Rarity.rand(min, max, -2);
        if(!dmg) dmg = min;

        this.config.targetMember.Decider.takeDamage({
            source: {player: this.config.sourceMember, source: this},
            target: this.config.targetMember,
            cancel: {isCancelled: false},
            damage: dmg + (this.config.sourceMember.getStat('attack') / 2),
            isTrue: false
        })
    }

    afterDo(): void {}
}

export class ExtraAttack extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }

    init(): void {
        this.config.targetMember.player.stats.attack += this.config.targetMember.player.stats.attack * 0.25;
    }
}

export class Focus extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    do(): void {
        this.config.targetMember.player.stats.attack += this.config.targetMember.player.stats.attack * 0.2;
    }

    afterDo(): void {
        
    }

    init(): void {
        this.config.targetMember.player.stats.attack += this.config.targetMember.player.stats.attack * 0.2;
    }
}

export class Dodge extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 1;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        this.removeDamages();
    }

    private removeDamages(){
        for(const element of this.config.targetMember.Decider.Current.damageTaken){
            element.cancel = {isCancelled: true, source: this.config.source, sourceMember: this.config.sourceMember}
            if(element.source.source instanceof Skill){
                const newEvent: EventParameters = {
                    type: EventTypes.DAMAGE_CANCEL,
                    attacker: element.source.player.original.name,
                    damage: element.damage,
                    defender: element.target.original.name,
                    skill: (element.source.source).skill.name,
                    reason: "**dodged**"
                }
                this.saveEvent(newEvent);
            }
        }
    }
}

export class Invulnerable extends ActiveEffect {
    constructor(config: EffectConfig){
        super(config);

        this.count = config.count ?? 2;
    }

    init(): void {}

    do(): void {
      
    

    }

    private removeDamages(){
        for(const element of this.config.targetMember.Decider.Current.damageTaken){
            element.cancel = {
                isCancelled: true, 
                source: this.config.source, 
                sourceMember: this.config.sourceMember
            }

            if(this.count === 1 && element.source.source instanceof Skill){
                const newEvent: EventParameters = {
                    type: EventTypes.DAMAGE_CANCEL,
                    attacker: element.source.player.original.name,
                    damage: element.damage,
                    defender: element.target.original.name,
                    skill: element.source.source.skill.name,
                    reason: "was **invulnerable**"
                }
                this.saveEvent(newEvent);
            }
        }
    }

    afterDo(): void {
        this.removeDamages();

        if(this.count === 2){
            const newEvent: EventParameters = {
                type: EventTypes.INVULNERABLE,
                attacker: this.config.targetMember.original.name,
            }
            this.saveEvent(newEvent);
        }

        if(this.count < 0 && this.checkIfTargetDealtAnyDamage()) this.count = 1;
    }

    
}

export class SineminCizimTableti extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private makeDamagesTrue(){
        for(const damageDone of this.config.sourceMember.Decider.Current.damageDone){
            for(const damageTaken of damageDone.target.Decider.Current.damageTaken){
                if(this.config.targetMember.getStat('health') < damageDone.target.getStat('health')){
                    damageTaken.isTrue = true;
                }
            }
        }
    }

    do(): void {
      
    
    }

    afterDo(): void {
        this.makeDamagesTrue();
    }

    init(): void {
    }
}

export class WearingAttackBonus extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateAttackBonus(): number{
        let sum = 0;
        for(const clothKey of Object.keys(this.config.targetMember.original.wearings)){
            if(clothKey == 'skills') continue;

            const item: Item = this.config.targetMember.original.wearings[clothKey] as Item;
            sum += item.stats.attack ?? 0;
        }

        return sum * 30 / 100 / (this.config.targetMember as Player).DIVIDERS.attack;
    }

    init(): void {
        this.config.targetMember.player.stats.attack += this.calculateAttackBonus();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class ExtraCritic extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateCritChance(): number{
        return this.config.targetMember.player.stats.critic * 0.25;
    }

    init(): void {
        this.config.targetMember.player.stats.critic += this.calculateCritChance();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class OmnininCocugu extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateDamageBonus(damage: DamageDone): number{
        const missingHealth = damage.target.player.baseStats.health - damage.target.player.stats.health;
        const percentage = missingHealth / damage.target.player.baseStats.health * 100;
        if(percentage >= 30){
            return damage.damage * 30 / 100;
        }

        return damage.damage * percentage / 100;
    }

    private increaseDamage(){
        for(const damageDone of this.config.sourceMember.Decider.Current.damageDone){
            for(const damageTaken of damageDone.target.Decider.Current.damageTaken){
                if(this.config.targetMember.player.stats.health < damageDone.target.player.stats.health){
                    const gain = this.calculateDamageBonus(damageTaken);
                    damageTaken.damage += gain;
                }
            }
        }
    }

    init(): void {
        
    }

    do(): void {
      
    
        
    }

    afterDo(): void {
        this.increaseDamage();
    }
}

export class AlpinGriPolosu extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private reduceDefense(): void {
        this.config.targetMember.player.stats.defense -= this.config.targetMember.player.stats.defense * 0.25;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        let shouldReduce = false;

        for(const dmg of this.config.targetMember.Decider.Current.damageTaken){
            if(!dmg.cancel.isCancelled && dmg.source.source instanceof Skill){
                shouldReduce = true;
            }
        }

        if(shouldReduce) this.reduceDefense();
    }
}

export class HasmetliHatirati extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private shouldDealBonus(damage: DamageDone): boolean {
        const missingHealth = damage.target.player.baseStats.health - damage.target.player.stats.health;
        const percentage = missingHealth / damage.target.player.baseStats.health * 100;
        return percentage > 75;
    }

    private increaseDamage(){
        for(const damageDone of this.config.sourceMember.Decider.Current.damageDone){
            for(const damageTaken of damageDone.target.Decider.Current.damageTaken){
                if(this.config.targetMember.player.stats.health < damageDone.target.player.stats.health){
                    const gainMultiplier = this.shouldDealBonus(damageTaken) ? 2 : 1;
                    damageTaken.damage *= gainMultiplier;
                }
            }
            // Expected behaviour
            // for(let j = 0; j < element.target.Decider.Current.damageTaken.length; j++){
            //     if(this.config.targetMember.player.stats.health < element.target.player.stats.health){
            //         const gainMultiplier = this.shouldDealBonus(element.target.Decider.Current.damageTaken[j]) ? 2 : 1;
            //         element.target.Decider.Current.damageTaken[j].damage *= gainMultiplier;
            //     }
            // }
        }
    }

    init(): void {
        
    }

    do(): void {
        
    }

    afterDo(): void {
        this.increaseDamage();
    }
}

export class MakarnaCanavari extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private shouldDealBonus(damage: DamageDone): boolean {
        return !damage.target.hasCC();
    }

    private increaseDamage(){
        for(const damageDone of this.config.sourceMember.Decider.Current.damageDone){
            for(const damageTaken of damageDone.target.Decider.Current.damageTaken){
                if(this.config.sourceMember === damageTaken.source.player){
                    const gainMultiplier = this.shouldDealBonus(damageTaken) ? 2.5 : 1;
                    damageTaken.damage *= gainMultiplier;
                }
            }
        }
        // Expected behaviour
        // for(let i = 0; i < this.config.sourceMember.Decider.Current.damageDone.length; i++){
        //     for(let j = 0; j < this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken.length; j++){
        //         if(this.config.sourceMember === this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].source.player ){
        //             const gainMultiplier = this.shouldDealBonus(this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j]) ? 2.5 : 1;
        //             this.config.sourceMember.Decider.Current.damageDone[i].target.Decider.Current.damageTaken[j].damage *= gainMultiplier;
        //         }   
        //     }
        // }
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        this.increaseDamage();
    }
}

export class PestoSosluMakarna extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private increaseCritic(): void {
        this.config.targetMember.player.stats.critic += this.config.targetMember.player.stats.critic * 0.25;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        let shouldReduce = false;

        for(const dmg of this.config.targetMember.Decider.Current.damageTaken){
            if(!dmg.cancel.isCancelled){
                shouldReduce = true;
                break;
            }
        }

        if(shouldReduce) this.increaseCritic();
    }
}

export class SukruSaracoglu extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateCriticBonus(): number{
        let sum = 0;
        for(const clothKey of Object.keys(this.config.targetMember.original.wearings)){
            if(clothKey == 'skills') continue;

            const item: Item = this.config.targetMember.original.wearings[clothKey] as Item;
            sum += item.stats.critic ?? 0;
        }
        return sum * 30 / 100 / (this.config.targetMember as Player).DIVIDERS.critic;
    }

    init(): void {
        this.config.targetMember.player.stats.critic += this.calculateCriticBonus();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class HakimBey extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private increaseCritic(): void {
        this.config.targetMember.player.stats.critic += this.config.targetMember.player.stats.critic * 0.5;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        let shouldIncrease = false;

        for(const dmg of this.config.targetMember.Decider.Current.damageTaken){
            if(!dmg.cancel.isCancelled){
                shouldIncrease = true;
                break;
            }
        }

        if(shouldIncrease) this.increaseCritic();
    }
}

export class RuhsarinIntikami extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private placeDamage(damage: DamageDone): CancelInfo{
        return damage.target.Decider.takeDamage(damage);
    }

    private reflectDamages(){
        for(const damageTaken of this.config.targetMember.Decider.Current.damageTaken){
            const takenDamage = damageTaken.damage;
            
            const reflectedDamage = takenDamage * 0.4;
            damageTaken.cancel = {
                isCancelled: true,
                source: this,
                sourceMember: this.config.targetMember
            }
            const reflected: DamageDone = {
                damage: reflectedDamage + (this.config.sourceMember.getStat('attack') / 2), 
                source: {player: this.config.sourceMember, source: this}, 
                target: damageTaken.source.player, 
                cancel: {isCancelled: false}, 
                isTrue: false
            }
            const cancelInfo = this.placeDamage(reflected);
            if(!cancelInfo.isCancelled && damageTaken.source.source instanceof Skill){
                const newEvent: EventParameters = {
                    type: EventTypes.REFLECT,
                    defender: this.config.targetMember.original.name,
                    damage: reflected.damage,
                    skill: damageTaken.source.source.skill.name
                }

                this.saveEvent(newEvent);
            }
        }

    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        this.reflectDamages();
    }
}

export class Awaken extends ActiveEffect {
    constructor(config: EffectConfig){
        super(config);

        this.count = config.count ?? 1;
    }

    private removeCCs(){
        this.config.targetMember.effects = this.config.targetMember.effects.filter(effect => !(effect instanceof CrowdControlEffect));
    }

    init(): void {
        this.removeCCs();
    }

    do(): void {}

    afterDo(): void {}

    
}

export class CrowdControlImmunity extends ActiveEffect {
    constructor(config: EffectConfig){
        super(config);

        this.count = config.count ?? 3;
    }

    init(): void {
    }

    do(): void {}

    afterDo(): void {}

    
}

export class FastAndFurious extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }


    init(): void {
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class ValenianinAdaleti extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }


    init(): void {}
        

    do(): void {
        if(this.config.targetMember !== this.config.targetMember.team.Odenne.Referee.turn.player.player as Player){
            const bonusDetails: BonusDetails = {value: 150, type: 1, count: 2};
            const effconfig: EffectConfig = {source: this, sourceMember: this.config.targetMember, targetMember: this.config.targetMember}
            const vaEffect = this.config.targetMember.team.Odenne.Effects.new("DefenseBonus", effconfig, bonusDetails) as Effect;
            this.config.targetMember.Decider.takeEffect(vaEffect);
        }
    }

    afterDo(): void {
        
    }
}

export class Taunt extends ActiveEffect {
    targetPlayer!: Player;

    constructor(config: EffectConfig){
        super(config);
        this.targetPlayer = this.config.sourceMember as Player;
        this.count = config.count ?? 4;
    }

    init(): void {
    }

    do(): void {}

    afterDo(): void {}

    
}

export class HakFive extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateDefenseBonus(): number{
        let sum = 0;
        for(const clothKey of Object.keys(this.config.targetMember.original.wearings)){
            if(clothKey == 'skills') continue;

            const item: Item = this.config.targetMember.original.wearings[clothKey] as Item;
            sum += item.stats.defense ?? 0;
        }

        return sum * 30 / 100 / (this.config.targetMember as Player).DIVIDERS.defense;
    }

    init(): void {
        this.config.targetMember.player.stats.defense += this.calculateDefenseBonus();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class Ataturk extends PassiveEffect {
    hasWorked = false;
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateHealthBonus(): number{
        const missingHealth = this.config.targetMember.player.baseStats.health - this.config.targetMember.getStat('health');
        const percentage = missingHealth / this.config.targetMember.player.baseStats.health * 100;
        if(percentage > 50){
            this.hasWorked = true;
            return this.config.targetMember.player.baseStats.health / 2;
        }

        return 0;
    }

    init(): void {}

    do(): void {
        if(!this.hasWorked){
            this.config.targetMember.player.shields.permanent += this.calculateHealthBonus();
        }
    }

    afterDo(): void {
        
    }
}

export class AttackReflect extends PassiveEffect {
    hasWorked = false;
    constructor(config: EffectConfig){
        super(config);
    }

    private placeDamage(damage: DamageDone){
        damage.target.Decider.takeDamage(damage);
    }

    private reflectDamages(){
        for(const damageTaken of this.config.targetMember.Decider.Current.damageTaken){
            const takenDamage = damageTaken.damage;
            
            const reflectedDamage = takenDamage * .2;
            const reflected: DamageDone = {
                damage: reflectedDamage + (this.config.sourceMember.getStat('attack') / 2), 
                source: {player: this.config.sourceMember, source: this}, 
                target: damageTaken.source.player, 
                cancel: {isCancelled: false}, 
                isTrue: false
            }
            this.placeDamage(reflected);
        }

    }

    init(): void {}

    do(): void {
    }

    afterDo(): void {
        this.reflectDamages();
    }
}

export class TheMirror extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 1;
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        this.removeDamages();
    }

    private removeDamages(){
        for(const damageTaken of this.config.targetMember.Decider.Current.damageTaken){
            damageTaken.damage *= 0.6;
        }
    }
}

export class FrozenCut extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private shouldDealBonus(damage: DamageDone): boolean {
        return !damage.source.player.hasEffect("FrozenCut");
    }

    private increaseDamage(){
        for(const damageDone of this.config.targetMember.Decider.Current.damageDone){
            for(const damageTaken of damageDone.target.Decider.Current.damageTaken){
                if(this.config.sourceMember === damageTaken.source.player){
                    const gainMultiplier = this.shouldDealBonus(damageTaken) ? 2 : 1;
                    damageTaken.damage *= gainMultiplier;
                }  
            }
        }
    }

    init(): void {}

    do(): void {}

    afterDo(): void {
        this.increaseDamage();
    }
}

export class Destructor extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private calculateAttackBonus(): number{
        let sum = 0;
        for(const clothKey of Object.keys(this.config.targetMember.original.wearings)){
            if(clothKey == 'skills') continue;

            const item: Item = this.config.targetMember.original.wearings[clothKey] as Item;
            sum += item.stats.penetration ?? 0;
        }

        return sum * 30 / 100 / (this.config.targetMember as Player).DIVIDERS.penetration;
    }

    init(): void {
        this.config.targetMember.player.stats.penetration += this.calculateAttackBonus();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}

export class SineminAnnelikIcgudusu extends ActiveEffect {
    
    isActivated = false;

    constructor(config: EffectConfig){
        super(config);
        this.count = config.count ?? 1;
    }

    init(): void {}

    do(): void {
        if(!this.isActivated) this.shouldActivate();
    }

    private shouldActivate(){
        for(const damage of this.config.targetMember.Decider.Current.damageTaken){
            if(damage.damage > 0 && !damage.cancel.isCancelled){
                this.isActivated = true;
                this.count = 2;
            }
        }
    }

    afterDo(): void {
        if(this.isActivated) this.applyAbsorption();
    }

    private applyAbsorption(){
        for(const damageTaken of this.config.targetMember.Decider.Current.damageTaken){
            damageTaken.damage *= 0.5;
        }
    }
}

export class MeteorRain extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 3;
    }

    init(): void {}

    do(): void {
        const min = 5;
        const max = 40;
        let dmg = this.config.sourceMember.team.Odenne.Rarity.rand(min, max, -2);
        if(!dmg) dmg = min;

        this.config.targetMember.Decider.takeDamage({
            source: {player: this.config.sourceMember, source: this},
            target: this.config.targetMember,
            cancel: {isCancelled: false},
            damage: dmg + (this.config.sourceMember.getStat('attack') / 2),
            isTrue: false,
        })
    }

    afterDo(): void {}
}

export class Illusion extends ActiveEffect {
    
    constructor(config: EffectConfig){
        super(config);
        this.count = 3;
    }

    init(): void {}

    do(): void {
    }

    afterDo(): void {}
}

export class Copycat extends PassiveEffect {
    constructor(config: EffectConfig){
        super(config);
    }

    private stealUltimate(){
        const target = this.config.targetMember.team.Odenne.Referee.getRandomPlayer((this.config.targetMember.team.index + 1) % 2);
        const isStealable = target.player.player.skills.length === 5;
        if(isStealable){
            const stolenUltConfig = target.player.player.skills[4].skill;
            const newSkill = this.config.targetMember.team.Odenne.Skills.create(this.config.targetMember as Player, stolenUltConfig) as Skill;
            for(const skill of this.config.targetMember.player.skills){
                if(skill instanceof MimicI){
                    this.config.targetMember.player.skills.splice(4, 1); 
                    this.config.targetMember.player.skills.push(newSkill);
                }
            }
        }
          
    }

    init(): void {
        this.stealUltimate();
    }

    do(): void {
        
    }

    afterDo(): void {
        
    }
}
import Odenne from "../odenne";
import { EventLog, EventParameters, EventTypes } from "../types/types";
import { Log } from "./keeper";

export default class Narrator {
    Odenne: Odenne;
    Log!: Log;
    events: EventLog[];
    templates: Map<number, string>;
    priority: EventTypes[];

    constructor(odenne: Odenne){
        this.Odenne = odenne;

        this.events = [];
        this.templates = new Map<number, string>([
            [EventTypes.DAMAGE, "**{{ attacker }}** dealt `{{ damage }}` damage with **{{ skill }}**"],
            [EventTypes.REFLECT, "**{{ defender }}** reflected `{{ damage }}` damage with **{{ skill }}**"],
            [EventTypes.DAMAGE_AND, "**{{ attacker }}** dealt `{{ damage }}` damage with **{{ skill }}** and {{ reason }}"],
            [EventTypes.DAMAGE_CANCEL, "**{{ attacker }}** dealt `{{ damage }}` damage with **{{ skill }}** but **{{ defender }}** {{ reason }}"],
            [EventTypes.CC, "**{{ attacker }}** was **{{ skill }}**"],
            [EventTypes.STATS_INCREASE, "**{{ attacker }}** gained `{{ statvalue }}` {{ stattype }} with **{{ skill }}**"],
            [EventTypes.INVULNERABLE, "**{{ attacker }}** became **invulnerable**"],
            [EventTypes.ROUND_STEAL, "**{{ attacker }}** stole the next round"],
            [EventTypes.SHIELD_GAIN, "**{{ attacker }}** gained `{{ shieldValue }}` {{ shieldType }} shield"],
            [EventTypes.GAIN_CC_IMMUNITY, '**{{ attacker }}** gained immunity with **{{ skill }}**']
        ]);

        this.priority = [
            EventTypes.ROUND_STEAL,
            EventTypes.CC,
            EventTypes.INVULNERABLE,
            EventTypes.GAIN_CC_IMMUNITY,
            EventTypes.REFLECT,
            EventTypes.DAMAGE_CANCEL,
            EventTypes.DAMAGE_AND,
            EventTypes.DAMAGE,
            EventTypes.SHIELD_GAIN,
            EventTypes.STATS_INCREASE
        ]
    }

    private shouldAcceptLog(event: EventParameters){
        const eventTypeIndex = this.priority.indexOf(event.type);
        for(const currentEvent of this.events){
            if(eventTypeIndex >= this.priority.indexOf(currentEvent.type)){
                
                return false;
            }
        }
        return true;
    }

    private createLog(event: EventParameters){
        let template = this.templates.get(event.type) as string;

        for(const key of Object.keys(event)){
            if(key === "type" || !key) continue;

            template = template.replace(`{{ ${key} }}`, event[key].toString());
        }
        return template;
    }

    saveEvent(event: EventParameters){
        if(this.shouldAcceptLog(event)){
            const log = this.createLog(event);
            const newEvent: EventLog = {type: event.type, log}
            this.events.push(newEvent);
            this.sortByPriority();
        }
    }

    sortByPriority(){
        if(this.events.length === 1) return
        this.events.sort(this.prioritySorter);
    }

    prioritySorter(a: EventLog, b: EventLog): number {
        const priority = [
            EventTypes.ROUND_STEAL,
            EventTypes.CC,
            EventTypes.INVULNERABLE,
            EventTypes.GAIN_CC_IMMUNITY,
            EventTypes.REFLECT,
            EventTypes.DAMAGE_CANCEL,
            EventTypes.DAMAGE_AND,
            EventTypes.DAMAGE,
            EventTypes.SHIELD_GAIN,
            EventTypes.STATS_INCREASE
        ]
        const indexA = priority.indexOf(a.type);
        const indexB = priority.indexOf(b.type);

        if(indexA > indexB) {
            return 1;
        }
        else return -1;
    }

    generate(): void{
        this.Odenne.UI.saveRound(this.events[0], this.Log);

        this.clear();
    }

    private clear(){
        this.events = [];
    }
}
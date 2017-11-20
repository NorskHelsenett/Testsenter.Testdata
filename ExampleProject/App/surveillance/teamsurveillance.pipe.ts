import { Pipe, PipeTransform } from "@angular/core";
import {RegisterPerson} from "../models/DataModels";

/**
 * Tar inn en liste med personer med oppsatt varslinger samt en liste med prosjektmedlemmer. Retunerer de personene som har minst en varsling oppstatt
 * av en av medlemene i listen.
 */
@Pipe({ name: 'teamfilter' })
export class TeamFilterPipe implements PipeTransform {
    transform(value: RegisterPerson[], team: string[]): RegisterPerson[] {
        if (value == undefined) {
            return new Array<RegisterPerson>();
        }
        return value.filter(f => f.latestSurveillanceResults.some(res => team.indexOf(res.registeredBy) !== -1));
    }
}

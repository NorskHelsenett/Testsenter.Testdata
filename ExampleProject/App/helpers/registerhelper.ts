import { Surveillance, PersonDetails, SurveillanceResult, RegisterPerson } from "../models/DataModels";
import { colorSynced, colorUnsynced, colorUndefined } from "../resources/app-settings";
import {SurveillanceStatus} from "../models/UtilityModels";
import {GP} from "../models/JsonModels";
import { Observable } from "rxjs/Observable";


export function getFullRegisterName(name: string): string {
    switch (name.toLowerCase()) {
        case "childItems":
            return "Personregisteret";
        case "hpr":
            return "Helsepersonellregisteret";
        case "flr":
            return "Fastlegeregisteret";
        default:
            return name;
    }
}

//Ikke optimalt;
export function setStarStatus(team: Observable<number>, person:RegisterPerson) {
    team.subscribe(res => {
        if (person.teams.length === 0) person.starState = 1;
        else {
            if (person.teams.some(t => t === String(res))) {
                person.starState = person.teams.length === 1 ? 2 : 4;
            } else
                person.starState = 3;
        }
    });

}

export function getSurveillanceColor(status: SurveillanceStatus) {
    if (status === SurveillanceStatus.Unsynced) return colorUnsynced;
    else if (status === SurveillanceStatus.Synced) return colorSynced;
    return colorUndefined;

}

export function getSurveillanceStatus(surveillance: Surveillance): SurveillanceStatus {
    if (surveillance.isChecked) {
        if (surveillance.latestSurveillanceResultForMyTeam === null) { return SurveillanceStatus.Unknown; }

        if (surveillance.latestSurveillanceResultForMyTeam.success)
            return SurveillanceStatus.Synced;
        return surveillance.latestSurveillanceResultForMyTeam.errorText.indexOf("Fant ikke person") === -1 ?
             SurveillanceStatus.Unsynced
            : SurveillanceStatus.Unknown;
        }
    return SurveillanceStatus.Unknown;
}


export function getSurveillanceResult(res:SurveillanceResult) {
    if (res.success === null) return SurveillanceStatus.Unknown;
    if (res.success) return SurveillanceStatus.Synced;
    //Ikke optimalt
    return res.errorText.indexOf("Fant ikke person") === -1 ?
        SurveillanceStatus.Unsynced
        : SurveillanceStatus.Unknown;
}

export function getPersonColor(status: SurveillanceStatus): string {
    if (status === SurveillanceStatus.Unsynced) return "redleftborder";
    return status === SurveillanceStatus.Synced ? "tealleftborder" : "";
}

export function getPersonStatus(person: PersonDetails) {
    if (person.surveillances.some(sur => sur.surveillanceState === SurveillanceStatus.Unsynced))
        return SurveillanceStatus.Unsynced;
    if (person.surveillances.some(sur => sur.surveillanceState === SurveillanceStatus.Synced))
        return SurveillanceStatus.Synced;
    return SurveillanceStatus.Unknown;
}

export function getGPname(gp: GP): string {
    return gp.FirstName + (gp.MiddleName == undefined ? "" : ` ${gp.MiddleName}`) + " " + gp.LastName;
}



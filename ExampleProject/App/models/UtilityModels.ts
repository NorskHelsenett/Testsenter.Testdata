
export enum SurveillanceStatus {
    Synced = 1, Unsynced = 2, Unknown = 3
}

export enum OwnedBy {
    Me = 1, Project = 2, All = 3
}

export enum ChildViews {
    Search, Surveillance, Dashboard, Json, Diff, None, Family
}


export enum SearchType {
    NIN = 1, Number = 2, Name = 3, Empty = 4, Query = 5
}

export enum StaticDataStep {
    AddedData, Verified, Argument, ContactInformation, Register, Failed
}



export enum Environment {
    Utvikling, Test01, AT
}

export enum HodorIndexes { Person = 1, Business = 2, Ugyldig = 1000 }

export const DifiStatus = ["Aktiv", "Slettet", "Ikke aktiv"];

export const DifiVarsel = ["Nei", "Ja"];

export class Code {
    codeText:string;
    codeValue: string;
    OID:number;
    simpleType:string;
}

export class HitInformation {
    details?: Detail[];
    children?: HitInformation[];
    faded?:boolean;
}

export class Detail {
    description?: string;
    value?: string | number;
    extra?: string;
}

export class SurveillanceItemInformation {
    key?: string;
    registeredBy?: string;
}

export class SurveillanceInformation {
    personalSynced: number;
    personalUnsynced: number;
    projectSynced: number;
    projectUnsynced: number;
}

export class ErrorMessage {
    message: string;
    description?: string;
    time?: number;

    constructor(message: string) {
        this.message = message;
    }
}

export class StaticPerson {
    id: string;
    buypass: boolean;
    commfides: boolean;
    comment: string;
    checked: boolean;
    approved: boolean;
    hodorComment: string;
    registers?: string;

    constructor(id: string, checked:boolean) {
        this.id = id;
        this.checked = checked;
    }

    isValid() {
        return this.buypass || this.commfides || (this.comment != null && this.comment.length > 0);
    }
}

export class StaticBusiness {
    id: string;
    comment: string;
    checked: boolean;
    approved: boolean;
    hodorComment: string;
    registers?: string;

    constructor(id: string, checked: boolean) {
        this.id = id;
        this.checked = checked;
    }

    isValid() {
        return (this.comment != null && this.comment.length > 0);
    }
}

export class ContactInformation {
    firstName: string;
    lastName: string;
    email: string;
    business: string;
    comments: string;
}

export class StaticDataRegistration {
    staticPersons: StaticPerson[];
    staticBusinesses: StaticBusiness[];
    contactInformation: ContactInformation;
    key?: string;
    date?: Date;

}
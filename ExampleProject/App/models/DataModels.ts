import {SurveillanceStatus, SurveillanceItemInformation, SearchType, HodorIndexes } from "./UtilityModels";

//Surveillance
export class SurveillanceResult {
    actionKey: string;
    success: boolean;
    contentAsJson?: string;
    checkedAt: Date;
    errorText?: string;
    id: number;
    registeredBy: string;
    teamProjectInt: number;
    commonIdentifier: string;
}

export class SurveilledItem {
    clamedWhen: Date;
    actionKey: string;
    actionInstanceIdentifier: string;
    teamProjectInt: number;
    registeredByFriendlyName: string;
    registeredByUsername: string;
    contentAsJson: string;
    registerEnviromentInt: number;
}


export class Surveillance {
    starState: number;
    urlToToggle: string;
    registerName: string;
    actionFriendlyName: string;
    originalContentAsJson: string;
    actionKey: string;
    isChecked: boolean;
    latestSurveillanceResultForMyTeam?: SurveillanceResult;
    teamsThatSurveillThisInstance: SurveilledItem[];
    surveillanceState: SurveillanceStatus;
}


//Filters

export class FilterGroup {
    groups: FilterGroup[];
    items: FilterItem[];
    name: string;
    type: string;
    belongsTo: FilterBelonging;
    numberToShow: number;
    isCustome: boolean;
}

export class FilterItem {
    name: string;
    value: string;
    uniqueValue: string;
    active: boolean;
    parent: string;
    selected: boolean;
    belongsTo: FilterBelonging;
    parameter: string;
    filterString: string;
    filterType?: string;
    displayName?: string;
    tagName?: string;
}

export enum FilterBelonging {
    Hpr = 1,
    Preg = 2,
    All = 3,
    Flr = 4,
    Difi = 5,
    Ar = 7, 
    BedReg = 6,
    Htk = 8, 
    Resh = 9
}

//Index
export class RegisterPerson {
    commonIdentifier: string;
    nin: string;
    hprNr?: number;
    hprName: string;
    hprHelsepersonellKategori: string[];
    pregName: string;
    starState?: number;
    detail?: PersonDetails;
    teams: string[];
    info?: string;
    barn?: string[];
    tags?: string[];
    fodselsDato: Date;
    ektefelleNin: string;
    sivilstand?: number;
    latestSurveillanceResults: SurveillanceResult[] = [];
    surveillancesInfo?: SurveillanceItemInformation[];
    isInPreg?: boolean;
    isInHpr?: boolean;
    isInFlr?: boolean;
    isInOfr: boolean;
    isInAr: boolean;

    fastlegestillinger: string[];
    status: SurveillanceStatus = SurveillanceStatus.Synced;
    difiElectrionicAdresseType: string;

}

export class RegisterBusiness {
    commonIdentifier:string;
    name: string;
    displayName: string;
    tags?: string[];

    detail?:BusinessDetails;
    herId: string;
    reshId: string;
    organizationNumber: string;
    isInAr: boolean;
    isInBedReg: boolean;
    isInHtk: boolean;
    isInResh: boolean;
    isInFlr: boolean;
    isInOfr: boolean;
    municipalityNumber?: number;
    businessType?: string;
    htkIsGovernmentCompany: boolean;
    industryCodes?: string[];
    communicationPartyType: string;
}


export class UserData {
    name: string;
    hasValidRegisterUser: boolean;
    registerUserName: string;
    registerPassword: string;
    projectValue: number;
    projectName: string;
    roleValue: number;
    roleName: string;
    username: string;
    password: string;
    oldPassword: string;
    hasAcceptedTerms: boolean;
    searchApiKey: string;

    constructor(username = "", password = "") {
        this.username = username;
        this.password = password;
    }
}

export class LoginSubmission {
    userName: string;
    password: string;
}

export class Tag {
    name: string;
    key: string;
    registeredBy: string;
    teamProjectInt: number;
}

export class PersonDetails {
    commonIdentifier?: string;
    pregJson: string;
    hprJson: string;
    fastlegeJson: string;
    fastlegePasientJson: string;
    difiInformationJson: string;
    starState: number;
    surveillances: Surveillance[];
    comments: Comment[];
}

export class BusinessDetails {
    commonIdentifier?: string;
    arJson: string;
    bedRegJson: string;
    flrJson: string;
    htkJson: string;
    reshJson: string;
    comments: Comment[];

}

export class Comment {
    registeredBy: string;
    registeredByFriendlyName: string;
    commonIdentifier: string;
    teamProjectInt: number;
    createdAt: Date;
    content: string;
    key: string;
}


export class SearchQuery {
    dbName?: string;
    description?: string;
    filters?: FilterGroup[];
    friendlyName?: string;
    registeredBy?: string;
    registeredByFriendlyName?: string;
    searchIndex?: HodorIndexes;
    searchTerm?: string;
    searchType?: SearchType;
    selectedFilters?: FilterItem[];
    teamProjectInt?: number;
}

export class HodorSearchParameters {
    page: number;
    numberPerPage: number;
    orderBy: string;
    totalCount: number;
    environment: string;
}

export class SearchResult<T> {
    documents: T[];
    searchParameters: HodorSearchParameters;
}

export class Search {
    searchQuery: SearchQuery;
    searchParameters: HodorSearchParameters;
}

export class SynteticModel {
    AgeQuantLevel: number;
    Statistics: PersonStatistics;
}

export class PersonStatistics {
    NumberOfSamplesToTake: number;
    AgeQuants: number;
    AgeQuantLevel?: number;
    Name: string;
    NumberOfPersons: number;
    Correlations: CorrelationMatrix;
    StatisticsByAgeQuants: { [ageQuant: number]: PersonStatistics };
    StatisticsDic: any;
}

export class CorrelationMatrix {
    Matrix: MatrixElement[][];
    _axisKeys: { [id: string]: number };
}

export class MatrixElement {
    XAxisName: string;
    YAxisName: string;
    ValuesAsString: string;
    Value: number;
}

//Difi 

export class DifiJson {
    varslingsstatus: number;
    reservasjon: boolean;
    status: number;
    kontaktinformasjon: KontaktInformasjon;
    sikkerDigitalPostAdresse: DigitalPostAdresse;
}

export class KontaktInformasjon {
    epostadresse: EpostAdresse;
    mobiltelefonnummer: Mobiltelefonnummer;
}

export class Mobiltelefonnummer {
    nummer: string;
    sistOppdatert: Date;
    sistVerifisert: Date;
}

export class EpostAdresse {
    epost: string;
    sistOppdatert: Date;
    sistVerifisert: Date;
}

export class DigitalPostAdresse {
    postkasseadresse: string;
}


// Statestikk
export class StatisticsComparison {
    name:string;
    boolean: { [key: string]: string[] };
    discrete: { [key: string]: string[] };
    correlations: { [key: string]: string[] };
    matrix: MatrixElement[][]; 
}


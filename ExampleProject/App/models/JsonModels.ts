export interface Address {
        AddressLine1?: any;
        AddressLine2?: any;
        AddressLine3?: any;
        ApartmentNumber?: string;
        BasicStatisticalUnit?: any;
        CadastralNumber?: any;
        CoAddress?: any;
        Constituency?: any;
        Country: string;
        CurrentAddress: boolean;
        DateAdrFrom: Date;
        DatePostalType: Date;
        DistrictCode?: any;
        DistrictName?: any;
        HouseLetter?: any;
        HouseNumber: number;
        Municipality: string;
        NIN: string;
        PostalAddress: string;
        PostalAddressValidFrom?: any;
        PostalCode: string;
        PostalPlace: string;
        PostalType: number;
        PropertyNumber?: any;
        SchoolDistrict?: any;
        St: string;
        StreetName: string;
        StreetNumber?: any;
        XCoord?: any;
        YCoord?: any;
    }

    export interface PregJson {
        Addresses: Address[];
        Citizenship?: any;
        CitizenshipCode?: any;
        Custody?: any;
        DateCitizenship?: any;
        DateCustody?: any;
        DateMaritalStatus?: any;
        DateOfBirth: Date;
        DateParentalResponsibility?: any;
        DateStatus: Date;
        DateWithoutLegalCapacity?: any;
        DateWorkPermit?: any;
        DufNo?: any;
        FathersNIN?: any;
        GivenName: string;
        MaritalStatus: number;
        MiddleName?: any;
        MothersNIN?: any;
        NIN: string;
        NewNIN?: any;
        OldNIN?: any;
        ParentalResponsibility?: any;
        RegStatus: number;
        Sn: string;
        SpouseNIN?: any;
        StatusCountryCode?: any;
        WithoutLegalCapacity?: any;
        WorkPermit?: any;
    }

    export interface Type {
        Aktiv: boolean;
        Beskrivelse: string;
        Kodegruppenavn: string;
        OID: number;
        Verdi: string;
    }

    export interface FysiskeAdresser {
        Arvet: boolean;
        Beskrivelse?: any;
        Gateadresse?: any;
        Land?: any;
        Postboks?: any;
        Postkode: string;
        Poststed?: any;
        Type: Type;
    }

    export interface Autorisasjon {
        Aktiv: boolean;
        Beskrivelse: string;
        Kodegruppenavn: string;
        OID: number;
        Verdi: string;
    }

    export interface Gyldig {
        Fra: Date;
        Til: Date;
    }

    export interface Helsepersonellkategori {
        Aktiv: boolean;
        Beskrivelse: string;
        Kodegruppenavn: string;
        OID: number;
        Verdi: string;
    }


    export interface Rekvisisjonsretter {
        AvsluttetStatus?: any;
        ETag: string;
        Gyldig: Gyldig;
        Id: number;
        Suspensjonsperioder: any[];
        Type: Type;
    }


    export interface Tilleggskompetanser {
        AvsluttetStatus?: any;
        ETag: string;
        Gyldig: Gyldig;
        Id: number;
        Type: Type;
    }


    export interface Institution {
        ETag: string;
        FysiskeAdresser: FysiskeAdresser[];
        Id: number;
        Navn: string;
        Organisasjonsnummer: number;
        Type: Type;
        Utdanningsinstitusjonshistorikk?: any;
    }

 export interface Land {
     Aktiv: boolean;
     Beskrivelse: string;
     Kodegruppenavn: string;
     OID: number;
     Verdi: string;
 }

 export interface Utdannelser {
        ETag: string;
        Id: number;
        Institution: Institution;
        Land: Land;
        Type: Type;
        Vitnemålsdato?: Date;
    }

    export interface Godkjenninger {
        Autorisasjon: Autorisasjon;
        AvsluttetStatus?: any;
        ETag: string;
        GodkjentTurnus?: Date;
        Gyldig: Gyldig;
        Helsepersonellkategori: Helsepersonellkategori;
        Id: number;
        KonvertertFraLand?: any;
        Rekvisisjonsretter: Rekvisisjonsretter[];
        Spesialiteter: any[];
        Suspensjonsperioder: any[];
        Tilleggskompetanser: Tilleggskompetanser[];
        Utdannelser: Utdannelser[];
        Vilkår: any[];
    }

    export interface Statsborgerskap {
        Aktiv: boolean;
        Beskrivelse: string;
        Kodegruppenavn: string;
        OID: number;
        Verdi: string;
    }


    export interface HprJson {
        AlternativeIder: any[];
        Dødsdato?: any;
        ETag: string;
        ErstattetAvHprNummer?: any;
        Etternavn: string;
        Fornavn: string;
        FysiskeAdresser: FysiskeAdresser[];
        Fødselsdato: Date;
        Godkjenninger: Godkjenninger[];
        HPRNummer: number;
        Kjønn?: any;
        ManglerNIN: boolean;
        Mellomnavn?: any;
        NIN: string;
        SistOppdatert: Date;
        Statsborgerskap: Statsborgerskap;
        Utdannelser: Utdannelser[];
    }


//FLR

export interface EndReason {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface District {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface FLRType {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface ElectronicAddress {
    Address: string;
    Inherited: boolean;
    LastChanged: Date;
    Type: FLRType;
    TypeCodeValue: string;
}

export interface Municipality {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface Country {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}


export interface PhysicalAddress {
    City: string;
    Country: Country;
    Description?: any;
    Inherited: boolean;
    LastChanged: Date;
    Municipality?: any;
    PostalCode: number;
    Postbox: string;
    StreetAddress: string;
    Type: FLRType;
}

export interface Property {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface SectorCode {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface Valid {
    From: Date;
    To?: Date;
}

export interface GPOffice {
    District: District;
    IsGroupOffice: boolean;
    Children?: any;
    DisplayName?: any;
    ElectronicAddresses: ElectronicAddress[];
    GeographicalCoordinates?: any;
    IndustryCodes?: any;
    IsGovernmentCompany?: any;
    LastChanged: Date;
    Municipality: Municipality;
    Name: string;
    OpeningHours?: any;
    OrganizationNumber: number;
    ParentOrganizationName?: any;
    ParentOrganizationNumber?: any;
    PhysicalAddresses: PhysicalAddress[];
    Properties: Property[];
    ResponsiblePerson?: any;
    SectorCode: SectorCode;
    UpdatedOn: Date;
    Valid: Valid;
}


export interface Status {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}


export interface GPContract {
    AgreementDate: Date;
    CoopMunicipalities: any[];
    DoctorCycles?: any;
    EndReason: EndReason;
    GPOffice: GPOffice;
    GPOfficeOrganizationNumber: number;
    Id: number;
    IsFixedSalary: boolean;
    MaxPatients: number;
    Municipality: Municipality;
    Name?: any;
    OutOfOfficeOffices?: any;
    ParticipatesOnCommonList: boolean;
    PatientList?: any;
    PlacesAvailable?: any;
    RequiresMembership?: any;
    Status: Status;
    UpdatedOn: Date;
    Valid: Valid;
}

export interface Relationship {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface Contract {
    GP?: any;
    GPContract: GPContract;
    GPContractId: number;
    HprNumber: number;
    Id: number;
    Relationship: Relationship;
    SubstituteForHprNumber?: number;
    UpdatedOn: Date;
    Valid: Valid;
    WorkingOnDays: any[];
    WorkingPercentage?: any;
}

export interface GP {
    DateOfBirth: Date;
    DateOfDeath?: any;
    FirstName: string;
    LastName: string;
    MiddleName?: string;
    NIN: string;
    PhysicalAddresses?: any;
    Sex?: any;
    Status?: any;
}

export interface FLRFastLegeJson {
    Contracts: Contract[];
    GP: GP;
    HprNumber: number;
    Languages: any[];
}




export interface BeginCode {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface Sex {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    OID: number;
    SimpleType: string;
}

export interface DoctorCycle {
    GP: GP;
    GPContract?: any;
    GPContractId: number;
    HprNumber: number;
    Id: number;
    Relationship: Relationship;
    SubstituteForHprNumber?: any;
    UpdatedOn: Date;
    Valid: Valid;
    WorkingOnDays: any[];
    WorkingPercentage?: any;
}

export interface Type {
    Active: boolean;
    CodeText: string;
    CodeValue: string;
    oid: number;
    SimpleType: string;
}

export interface Period {
    From: Date;
    To: Date;
}

export interface FlrPasientJson {
    BeginCode: BeginCode;
    DoctorCycles: DoctorCycle[];
    EndCode?: any;
    GPContract: GPContract;
    GPContractId: number;
    Id: number;
    Patient?: any;
    PatientNIN: string;
    Period: Period;
    UpdatedOn: Date;
}

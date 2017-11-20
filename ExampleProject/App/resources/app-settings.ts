//Kanskje lage en injecteable evt global class? 

// Surveillance


export const colorSynced = "#70A8A3";
export const colorUnsynced = "#FF6A5C";
export const colorUndefined = "";

export const projectNames = ["Helsenorge", "E-Resept", "Kjernejournal", "Grunndata", "FIA-prosjektet", "Helsedirektoratet", "NHN", "Annet"];
export const roleNames = ["Testleder", "Funksjonell tester", "Teknisk tester", "Utvikler", "Annet"];

export enum RegisterNames { "Preg" = 0, "Hpr" = 1, "FlrDoctor" = 6, "FlrPasient" = 7 };

export const sivilStatus = [
    "Ukjent", "Ugift", "Gift", "Enke(mann)", "Skilt", "Separert",
    "Registrert partner", "Separert partner", "Skilt partner", "Gjenlevende partner"
];

export const custodyDescription: { [id: string]: string } = {
    "D": "Delt",
        "M": "Mor",
            "F": "Far",
                "A": "Andre",
                    "U": "Ukjent",
                        "C": "Ugyldig"
}

export const environments: { [id:string]:string} =
{
        "UT": "Utvikling",
        "Test": "Test01",
        "AT": "AT"
}


export const DigitalMailProvider: { [id: string]: string } = {
    "996460320": "E-Boks",
    "984661185": "Digipost"   
}

export const regStatusName = ['Ukjent', 'Bosatt', 'Utflyttet (bosatt som har flyttet ut av det geografiske området)', 'Utvandret', 'Forsvunnet', 'Død', 'Utgått fødselsnummer, korrigert til nytt', 'Fødselsregistrert', 'Annullert tilgang', 'Uregistrert tilgang'];

export let colorSet = [
    {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
        ]
    }, 
    {
        name: 'forest',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#C1F33D', '#55C22D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32'
        ]
    },
    {
        name: 'forest1',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#55C22D'
        ]
    }, {
        name: 'forest1',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#C1F33D'
        ]
    },

];
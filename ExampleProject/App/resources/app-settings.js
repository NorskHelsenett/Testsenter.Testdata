"use strict";
//Kanskje lage en injecteable evt global class? 
Object.defineProperty(exports, "__esModule", { value: true });
// Surveillance
exports.colorSynced = "#70A8A3";
exports.colorUnsynced = "#FF6A5C";
exports.colorUndefined = "";
exports.projectNames = ["Helsenorge", "E-Resept", "Kjernejournal", "Grunndata", "FIA-prosjektet", "Helsedirektoratet", "NHN", "Annet"];
exports.roleNames = ["Testleder", "Funksjonell tester", "Teknisk tester", "Utvikler", "Annet"];
var RegisterNames;
(function (RegisterNames) {
    RegisterNames[RegisterNames["Preg"] = 0] = "Preg";
    RegisterNames[RegisterNames["Hpr"] = 1] = "Hpr";
    RegisterNames[RegisterNames["FlrDoctor"] = 6] = "FlrDoctor";
    RegisterNames[RegisterNames["FlrPasient"] = 7] = "FlrPasient";
})(RegisterNames = exports.RegisterNames || (exports.RegisterNames = {}));
;
exports.sivilStatus = [
    "Ukjent", "Ugift", "Gift", "Enke(mann)", "Skilt", "Separert",
    "Registrert partner", "Separert partner", "Skilt partner", "Gjenlevende partner"
];
exports.custodyDescription = {
    "D": "Delt",
    "M": "Mor",
    "F": "Far",
    "A": "Andre",
    "U": "Ukjent",
    "C": "Ugyldig"
};
exports.environments = {
    "UT": "Utvikling",
    "Test": "Test01",
    "AT": "AT"
};
exports.DigitalMailProvider = {
    "996460320": "E-Boks",
    "984661185": "Digipost"
};
exports.regStatusName = ['Ukjent', 'Bosatt', 'Utflyttet (bosatt som har flyttet ut av det geografiske området)', 'Utvandret', 'Forsvunnet', 'Død', 'Utgått fødselsnummer, korrigert til nytt', 'Fødselsregistrert', 'Annullert tilgang', 'Uregistrert tilgang'];
exports.colorSet = [
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
//# sourceMappingURL=app-settings.js.map
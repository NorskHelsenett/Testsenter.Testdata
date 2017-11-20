"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCustodyDescription(value) {
    var custodyDescription = {
        "D": "Delt",
        "M": "Mor",
        "F": "Far",
        "A": "Andre",
        "U": "Ukjent"
    };
    return custodyDescription[value];
}
exports.getCustodyDescription = getCustodyDescription;
function getRegStatusDescription(value) {
    var regStatusDescriptions = ['', 'Bosatt', 'Utflyttet (bosatt som har flyttet ut av det geografiske området)', 'Utvandret', 'Forsvunnet', 'Død', 'Utgått fødselsnummer, korrigert til nytt', 'Fødselsregistrert', 'Annullert tilgang', 'Uregistrert tilgang'];
    return regStatusDescriptions[value];
}
exports.getRegStatusDescription = getRegStatusDescription;
function getPostalType(value) {
    var postalTypeDescriptions = ['Vanlig bosatt', 'Utenriks', 'Militær', 'Svalbard', 'Klientadresse', 'Uten fast bopel', 'Sperret adresse, strengt fortrolig', 'Sperret adresse, fortrolig', 'Pendler'];
    return postalTypeDescriptions[value];
}
exports.getPostalType = getPostalType;
//# sourceMappingURL=pregHelper.js.map
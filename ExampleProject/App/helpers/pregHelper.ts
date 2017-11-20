export function getCustodyDescription(value: string) {
    let custodyDescription: { [id: string]: string } = {
        "D": "Delt",
        "M": "Mor",
        "F": "Far",
        "A": "Andre",
        "U": "Ukjent"
    }

    return custodyDescription[value];
}

export function getRegStatusDescription(value: number) {
    let regStatusDescriptions: string[] = ['', 'Bosatt', 'Utflyttet (bosatt som har flyttet ut av det geografiske området)', 'Utvandret', 'Forsvunnet', 'Død', 'Utgått fødselsnummer, korrigert til nytt', 'Fødselsregistrert', 'Annullert tilgang', 'Uregistrert tilgang'];
    return regStatusDescriptions[value];
}

export function getPostalType(value: number) {
    let postalTypeDescriptions: string[] = ['Vanlig bosatt', 'Utenriks', 'Militær', 'Svalbard', 'Klientadresse', 'Uten fast bopel', 'Sperret adresse, strengt fortrolig', 'Sperret adresse, fortrolig', 'Pendler'];
    return postalTypeDescriptions[value];
}
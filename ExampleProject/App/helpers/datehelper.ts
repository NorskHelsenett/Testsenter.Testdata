import * as moment from "moment/moment";

/**
 * Kalkulerer alder til angitt Nin
 * @param nin Ninet man vil kalkulere alder ut fra
 */
export function getAgeFromNin(nin: string): number {
    let ageArray = nin.substr(0, 6).match(/.{1,2}/g);

    if (+ageArray[0] > 40) {
        ageArray[0] = String(+ageArray[0] - 40);
        if (ageArray[0].length === 1) ageArray[0] = "0" + ageArray[0];
    }

    ageArray[2] = +ageArray[2] <= new Date().getFullYear() % 100 ? String(+ageArray[2] + 2000) : String(+ageArray[2] + 1900);

    return moment().diff(moment(ageArray.join(""), "DDMMYYYY"), "y");
}

/**
 * Tar inn to datoer og sjekker om de er gyldige, altså at @param fromDate datoen er før nåværende tidspunkt og @param toDate er etter nåværende tidspunkt
 * @param fromDate Fra dato
 * @param toDate Til dato
 */
export function isValidDate(fromDate ?: Date, toDate ?: Date): boolean {
    let valid = true;
    if (fromDate != undefined) {
        let from = moment(fromDate);
        if (moment().diff(from) > 0)
            valid = true;
        else
            valid = false;
    }

    if (valid) {
        if (toDate != undefined) {
            let to = moment(toDate);
            if (moment().diff(to) > 0) {
                valid = false;
            }
        }

    }

    return valid;
}


export function getDateString(from:Date, to:Date): string {
    return (from ? moment(from).format("DD/MM YYYY") : "uspesifisert") +
        " - " +
        (to ? moment(to).format("DD/MM YYYY") : "uspesifisert");
}

export function getYearFromDateString(date: string|Date) {
    return moment().diff(moment(date), "y");
}


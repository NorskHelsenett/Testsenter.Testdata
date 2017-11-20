import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment/moment";

/**
 * Tar inn et enten et {Date} objekt eller en {String} med gyldig format {@link http://momentjs.com/docs/#/parsing/object/ Moment og returnerer en string med format "DD/MM kl. HH:mm"
 */
@Pipe({
    name: 'simpledate'
})
export class SimpleDatePipe implements PipeTransform {
    transform(value: Date | string): string {
        if (!value || value === undefined) return "";

        let date = moment(value).format("DD/MM [kl.] HH:mm");
        return date === "Invalid date" ? "" : date;
    }
}
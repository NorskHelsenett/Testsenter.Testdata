import { Pipe, PipeTransform } from "@angular/core";
import { projectNames } from "../../resources/app-settings";

/**
 * Returnerer prosjektnavn for prosjekt i posisjon @param value i projectNames listen som ligger i /resources/app-settings.ts
 */
@Pipe({ name: 'projectname' })
export class ProjectNamePipe implements PipeTransform {
    transform(value: number): string {
        return value < projectNames.length && value >= 0 ? projectNames[value] : "Ukjent";
    }
}
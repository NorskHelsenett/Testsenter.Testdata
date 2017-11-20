import { Pipe, PipeTransform } from "@angular/core";
import {FilterBelonging} from "../../models/DataModels";


@Pipe({ name: 'registerfilterfullname' })
export class RegisterFilterFullNamePipe implements PipeTransform {
    transform(value: FilterBelonging): string {
        switch (value) {
            case FilterBelonging.Hpr:
                return "Helsepersonellfilter";
            case FilterBelonging.Preg:
                return "Personfilter";
            case FilterBelonging.Flr:
                return "Fastlegefilter";
            case FilterBelonging.BedReg:
                return "Basis";
            case FilterBelonging.All:
                return "";
            default:
                return FilterBelonging[value];
        }
    }
}

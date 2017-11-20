import { Pipe, PipeTransform } from "@angular/core";
import {FilterGroup, FilterBelonging } from "../../models/DataModels";

/**
 * Returnerer filterer som tilhører angitt {@link FilterBeloning}
 */
@Pipe({ name: 'filtergroup' })
export class FilterGroupPipe implements PipeTransform {
    transform(value: FilterGroup[], beloning: FilterBelonging): FilterGroup[] {

        if (value == undefined) {
             return new Array<FilterGroup>();
        }
        return value.filter(f => f.belongsTo === beloning);
    }
}

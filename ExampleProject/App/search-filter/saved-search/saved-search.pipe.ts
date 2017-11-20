import { Pipe, PipeTransform } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import {SearchQuery} from "../../models/DataModels";
import {OwnedBy, HodorIndexes } from "../../models/UtilityModels";
import {UserManagerService} from "../../core/services/user-manager.service";

/**
 * Returnerer lagerede søk registret av {@link OwnedBy} 
 */
@Pipe({ name: 'savedsearch' })
export class SavedSearchPipe implements PipeTransform {
    constructor(private userManager:UserManagerService){}

    transform(value: SearchQuery[], ownedBy: OwnedBy, index: HodorIndexes): Observable<SearchQuery[]> {
        if (value == undefined) {
            return of(new Array<SearchQuery>());
        }
        var list = value.filter(s => s.searchIndex === index);
        switch (ownedBy) {
            case OwnedBy.Me:
                return this.userManager.getUserNameAsync().map(name => list.filter(s => s.registeredBy === name));
            case OwnedBy.Project:
                return this.userManager.getProjectIdAsync().map(id => list.filter(s => s.teamProjectInt == id ));
            default:
                return this.userManager.getUserNameAsync().map(name => list.filter(s => s.registeredBy !== name));
        }
    }
}

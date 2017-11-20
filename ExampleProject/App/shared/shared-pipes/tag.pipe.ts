import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import {Tag} from "../../models/DataModels";
import {OwnedBy} from "../../models/UtilityModels";
import {UserManagerService} from "../../core/services/user-manager.service";

/**
 * Tar inn en liste med {@link Tag} og returnerer de 
 */
@Pipe({ name: 'tag' })
export class TagPipe implements PipeTransform {
    constructor(private userManager: UserManagerService) { }

    transform(value: Tag[], ownedBy: OwnedBy): Observable<Tag[]> {

        if (value == undefined) {
            return of(new Array<Tag>());
        }
        if (ownedBy === OwnedBy.All)
            return this.userManager.getNameAsync().map((name:string) => value.filter(s => s.registeredBy !== name));
        return this.userManager.getNameAsync().map((name:string) => value.filter(s => s.registeredBy === name));
    }
}

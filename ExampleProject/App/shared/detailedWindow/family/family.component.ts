import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Family, FamilyMember } from "./familymodels";
import { ChildViews } from "../../../models/UtilityModels";
import {SearchManagerService} from "../../../core/services/search-manager.service";

@Component({
    selector: 'family',
    moduleId: module.id,
    templateUrl: 'family.component.html',
    styleUrls: ['family.component.css', '../detailedWindow.css']
})
export class FamilyComponent {
    @Input()
    family: Family;

    @Output()
    onClose = new EventEmitter();  

    constructor(private searchManager:SearchManagerService) { }

    close(event: any) {
        event.stopPropagation();
        this.onClose.emit(ChildViews.None);
    }
    searchForMember(member: FamilyMember) {
        if (member.nin != undefined) {
            this.searchManager.searchWithNin(member.nin);
        }
    }

    searchForFamily() {
        let nins = [this.family.person.nin];
        
        if (this.family.father)
            nins.push(this.family.father.nin);
        if (this.family.mother)
            nins.push(this.family.mother.nin);
        if (this.family.children)
            this.family.children.forEach(p => nins.push(p.nin));
        this.searchManager.searchForMultipleNins(nins);
    }

    
}
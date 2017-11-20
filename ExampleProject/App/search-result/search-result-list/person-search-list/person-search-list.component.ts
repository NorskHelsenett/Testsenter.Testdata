import { Component, Input } from "@angular/core";
import {RegisterPerson, HodorSearchParameters } from "../../../models/DataModels";
declare var $: any;


@Component({
    selector: "person-search-list",
    moduleId: module.id,
    templateUrl: "person-search-list.component.html",
    styleUrls: ["../search-list.component.css"]
})
export class PersonSearchListComponent {
    @Input()
    persons: RegisterPerson[];

}
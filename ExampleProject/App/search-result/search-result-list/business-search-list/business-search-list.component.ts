import { Component, Input } from "@angular/core";
import { RegisterBusiness } from "../../../models/DataModels";
declare var $: any;


@Component({
    selector: "business-search-list",
    moduleId: module.id,
    templateUrl: "business-search-list.component.html",
    styleUrls: ["../search-list.component.css"]
})
export class BusinessSearchListComponent {
    @Input()
    businesses: RegisterBusiness[];

}
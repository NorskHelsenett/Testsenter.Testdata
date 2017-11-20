import { Component, Input } from "@angular/core";
import {RegisterPerson} from "../../models/DataModels";


declare var $: any;

@Component({
    selector: "surveillance-list",
    moduleId: module.id,
    templateUrl: "surveillance-list.component.html",
    styleUrls: ["surveillance-list.component.css", "../../search/search-list/search-list.component.css"]
})
export class SurveillanceListComponent {
    @Input()
    persons: RegisterPerson[];

    unchangedSurveillances: number;
    changedSurveillances: number;

    ngOnChanges() {
        if (!this.persons) return;
        this.changedSurveillances = this.persons.filter(p => p.latestSurveillanceResults != undefined &&  p.latestSurveillanceResults.some(sur => !sur.success)).length;
        this.unchangedSurveillances = this.persons.filter(p => p.latestSurveillanceResults == undefined || p.latestSurveillanceResults.length === 0 || !p.latestSurveillanceResults.some(sur => !sur.success)).length;
    }

    ngAfterViewInit() {
        $(".ui.accordion").accordion("refresh");
    }
}




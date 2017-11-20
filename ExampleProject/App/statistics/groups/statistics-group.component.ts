import { Component } from "@angular/core";
import { BaseStatisticsTab } from "../base-statistics-tab"
declare var $: any;

@Component({
    moduleId: module.id,
    selector: "statistics-group",
    templateUrl: "statistics-group.component.html",
    styleUrls: ["../statistics.css"]
})

export class StatisticsGroupsComponent extends BaseStatisticsTab {

    groups:number[];

    selectedValue: any;

    ngAfterViewInit(){}

    getAgeQuantName(i: number) {
        return i * this.stats.AgeQuantLevel + " - " + ((i * this.stats.AgeQuantLevel) + 5);
    }
}
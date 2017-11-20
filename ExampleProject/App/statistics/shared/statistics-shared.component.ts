import { Component } from "@angular/core";
import { BaseStatisticsTab } from "../base-statistics-tab"
declare var $: any;

@Component({
    moduleId: module.id,
    selector: "statistics-shared",
    templateUrl: "statistics-shared.component.html",
    styleUrls: ["../statistics.css"]
})

export class StatisticsSharedComponent extends BaseStatisticsTab {

    choices: string[];
    val1: any;
    val2: any;
    selectedValue: string;
    view: any[] = [700, 500];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Andel';
    showYAxisLabel = true;
    yAxisLabel = 'Alder';

    selectedNumber: any;
    selectedAge: any;

   


    sivilstatus: any[] = [];

    regstatus: any[] = [];



    colorScheme = {
        domain: ['#5AA454']
    };

    pieScheme = this.colorSet[1];
    single: any[];
    female: any[];


    onSelect(event: any) {
        this.selectedNumber = event.value;
        this.selectedAge = event.name;
    }



}
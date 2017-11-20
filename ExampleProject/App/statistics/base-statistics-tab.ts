import { Component, Input } from "@angular/core";
import { colorSet, regStatusName, sivilStatus } from "../resources/app-settings";

export abstract class BaseStatisticsTab {

    @Input()
    stats: any;

    ages: number[] = [];
    selectedStats:any;

    protected colorSet = colorSet;
    protected regStatusName = regStatusName;
    protected sivilstatusName = sivilStatus;

    getAgeQuantName(i: number) {
        return i * this.stats.AgeQuantLevel + " - " + ((i * this.stats.AgeQuantLevel) + 4);
    }

    generateMockData(array: any[], nameFunc: (n: number) => string, howMany = 20, minVal = 0, maxVal = 500000) {
        if (nameFunc == undefined)
            nameFunc = (n: number): string => {
                return this.getAgeQuantName(n);
            }
        for (let i = 0; i < howMany; i++) {
            array.push({ name: nameFunc(i), value: minVal + (Math.random() * (maxVal - minVal)) });
        }
    }

    getAgequants() {
        var l = this.stats.Statistics.StatisticsByAgeQuants;
        for (let a in l) {
            this.ages.push(+a);
        }
        this.ages.sort((a: number, b: number) => { return a - b });
    }


}
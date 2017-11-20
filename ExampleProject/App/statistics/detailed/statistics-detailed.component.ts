import { Component } from "@angular/core";
import { BaseStatisticsTab } from "../base-statistics-tab"

declare var $: any;

@Component({
    moduleId: module.id,
    selector: "statistics-detailed",
    templateUrl: "statistics-detailed.component.html",
    styleUrls: ["../statistics.css"]
})

export class StatisticsDetailedComponent extends BaseStatisticsTab{


    booleans: any[];
    discrete: any[];
    other: any[];
    colorScheme = this.colorSet[1];
    selectedStats: any[];

    ngOnInit() {
        this.selectedStats = this.stats == undefined ? undefined : this.stats.Statistics;
    }

    ngOnChanges() {
        this.updateValues(false);
    }

    updateValues(selection:boolean) {
        if (this.stats === undefined)
            return;
        if (this.ages.length === 0)
            this.getAgequants();
        if(!selection)
            this.selectedStats = this.stats.Statistics;

        this.booleans = [];
        this.discrete = [];
        this.other = [];

        this.getValues(this.selectedStats);
        this.discrete.sort(((a: any, b: any) => { return a.properties.length - b.properties.length; }));
    }

    getValues(value:any) {
        for (let p in value) {
            let v = value[p];
            if (v === undefined || v === null || typeof v !== "object") continue;
            if (v["IsBoolean"] != undefined && v["IsBoolean"]) {
                this.booleans.push({ "name": p, "value": v["TrueRatio"], total: v["TotalCount"], numberOfTrues: v["NumberOfTrues"] });
            }
            else if (v["IsDiscrete"] != undefined && v["IsDiscrete"]) {
                let prop: any[] = [];
                if (v["Stats"] != undefined) {
                    let props = v["Stats"];
                    for (var p1 in props) {
                        prop.push({ name: p1, value: props[p1].Count, extra: props[p1].Count / v["TotalCount"] });
                    }
                } else if (v["_stats"] != undefined) {
                    let props = v["_stats"];
                    for (var p2 in props) {
                        prop.push({ name: p2, value: props[p2], extra: props[p2] / v["TotalCount"] });
                    }
                }
                this.discrete.push({ name: p, properties: prop });
            } else if (v["DistributionfunctionString"] != null) {
                this.other.push({
                    name: p,
                    func: v["DistributionfunctionString"],
                    min: v["Min"],
                    max: v["Max"],
                    total: v["TotalCount"]
                });
            } else {
                if (p !== "StatisticsByAgeQuants")
                    this.getValues(v);
            }
        }
    }

    rows(array: any[]) {
        if (array == undefined)
            return [];
        let j: number[] = [];
        for (var i = 0; i < array.length / 5; i++) {
            j.push(i * 5);
        }
        return j;
    }

    set selectedGroup(n: string) {
        this.selectedStats = n === "" ? this.stats.Statistics : this.stats.Statistics.StatisticsByAgeQuants[n];
        this.updateValues(true);
    }
}
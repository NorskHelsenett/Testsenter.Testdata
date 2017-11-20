import { Component} from "@angular/core";
import { BaseStatisticsTab } from "../base-statistics-tab"
import {custodyDescription} from "../../resources/app-settings";
import {getPostalType} from "../../helpers/pregHelper";
declare var $: any;

@Component({
    moduleId: module.id,
    selector: "statistics-overview",
    templateUrl: "statistics-overview.component.html",
    styleUrls: ["../statistics.css"], 
})

export class StatisticsOverviewComponent extends BaseStatisticsTab {

    

    choices: string[];
    val1: any;
    val2: any;
    selectedValue: string;
    view: any[] = [500, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = false;
    showYAxisLabel = true;

    selectedNumber: any;
    selectedAge: any;

    kjonn: any[];
    regstatus: any[];
    sivilstatus: any[];
    custody: any[];
    postalType: any[];


    pieScheme = this.colorSet[1];
    colorMale = this.colorSet[2];
    colorFemale = this.colorSet[3];
    single: any[];
    female: any[];
    male: any[];

    ngOnChanges() {
        this.updateData(false);
    }

    updateData(selection: boolean) {
        if (this.stats != undefined && !selection) {
            this.selectedStats = this.stats.Statistics;
        }
        if (this.selectedStats == undefined)
            return;

        if (this.ages.length === 0)
            this.getAgequants();
        this.getAgeDistribution();
        this.getGenderStats();
        this.getRegStatusStats();
        this.getSivilStatusStats();
        this.getCustody();
        this.getPostalTypes();

  
    }

    getGenderStats() {
        if (this.selectedStats.Kjonn._stats === {}) {
            this.kjonn = [];
            return;
        }
        this.kjonn = [
            {
                "name": "Kvinner",
                "value": this.selectedStats.Kjonn._stats["2"] == undefined ? 0 : this.selectedStats.Kjonn._stats["2"]
    },
        {
            "name": "Menn",
            "value": this.selectedStats.Kjonn._stats["3"] == undefined ? 0 : this.selectedStats.Kjonn._stats["3"]
        },
           
        ];
    }

    getRegStatusStats() {
        this.regstatus = []; 
        let stat = this.selectedStats.RegStatus._stats;
        if (stat == undefined)
            return;
        for (let s in stat) {
            this.regstatus.push({ name: this.regStatusName[s] === undefined ? this.regStatusName[0] : this.regStatusName[s] , value: +stat[s] });
        }
    }

    getSivilStatusStats() {
        this.sivilstatus = [];
        let stat = this.selectedStats.MaritalStatus._stats;
        if (stat == undefined)
            return;
        for (let s in stat) {
            this.sivilstatus.push({ name: this.sivilstatusName[s] === undefined ? this.sivilstatusName[0] : this.sivilstatusName[s] , value: +stat[s] });
        }
    }

    getCustody() {
        this.custody = [];
        let stat = this.selectedStats.Custody.Stats;
        if (stat == undefined)
            return;
        for (let s in stat) {
            if (s === "___emtpystring___") continue;
            this.custody.push({ name: custodyDescription[s], value: +stat[s].Count });
        }

    }

    getAgeDistribution() {
        this.female = [];
        this.male = [];
        let s = this.stats.Statistics.StatisticsByAgeQuants;

        for (let l in s) {
            if (s[l].NumberOfPersons == 0)
                continue;
            let m = s[l].Kjonn._stats["3"];
            let f = s[l].Kjonn._stats["2"];
            this.male.push({ name: this.getAgeQuantName(s[l].AgeQuantLevel), level: s[l].AgeQuantLevel, value: m === undefined ? 0 : m });
            this.female.push({ name: this.getAgeQuantName(s[l].AgeQuantLevel), level: s[l].AgeQuantLevel, value: f === undefined ? 0 : f });
        }
        this.female.sort((a: any, b: any) => { return a.level - b.level; });
        this.male.sort((a: any, b: any) => { return a.level - b.level; });

    }

  
    set selectedGroup(n: string) {
        this.selectedStats = n === "" ? this.stats.Statistics : this.stats.Statistics.StatisticsByAgeQuants[n];
        this.updateData(true);
    }

    getPostalTypes(): any {
        this.postalType = [];
        if (this.stats.Statistics.AdressStatistics == undefined)
            return;
        let stat = this.stats.Statistics.AdressStatistics.PostalType._stats;
        for (let code in stat) {
            if (getPostalType(+code) === undefined)
                console.log(code);
            this.postalType.push({ name: getPostalType(+code) === undefined ? "Ukjent" : getPostalType(+code), value: +stat[code] });
        }
    }
}
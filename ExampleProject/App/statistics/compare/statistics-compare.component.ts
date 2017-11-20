import { Component } from "@angular/core";
import {StatisticsComparison, MatrixElement } from "../../models/DataModels";
import {ApiService} from "../../core/services/api.service";
declare var $: any;

@Component({
    moduleId: module.id,
    selector: "statistics-compare",
    templateUrl: "statistics-compare.component.html",
    styleUrls: ["../statistics.css"]
})

export class StatisticsCompareComponent {

    blobs: any[];
    stat1: any;
    stat2: any;
    stats: StatisticsComparison;
    loading: boolean;
    statslist: StatisticsComparison[];

    matrix: MatrixElement[][];
    show: string;

    constructor(private apiService: ApiService) {
        this.apiService.simpleGetRequest<any[]>("api/Statistics/All").subscribe((res: any) => {
            this.blobs = res;
        });   
    }


    getValueComperison() {
        this.loading = true;
        this.apiService.simpleGetRequest<StatisticsComparison[]>("api/Statistics/Compare/".concat(this.stat1 + ";" + this.stat2))
            .subscribe((res:
                any) => {
                this.loading = false;
                this.stats = res[0];
                this.show = this.keys(this.stats)[1];
                this.statslist = res;

                console.log(this.stats);
            });
    }

    keys(value:any) {
        return Object.keys(value);
    }

    orderList(value: any, index: number) {
        return Object.keys(value).sort((a: string, b: string) => {
            var v1 = value[a][index];
            if(v1) v1 = v1.replace(",", ".");
            var v2 = value[b][index];
            if (v2) v2 = v2.replace(",", ".");
            return (Math.abs(Number(v2) === NaN ? 0 : +v2) - Math.abs(Number(v1) === NaN ? 0 : +v1));
        });
    }

    sortOnIndex(value: any[], index: number) {
        return value.slice(0).sort((a: string, b: string) => {
            var v1 = a.split(";")[index];
            if (v1) v1 = v1.replace(",", ".");
            var v2 = b.split(";")[index];
            if (v2) v2 = v2.replace(",", ".");
            return (Math.abs(Number(v2)) - Math.abs(Number(v1)));
        });
    }

    getClass(col: any, f1: boolean, f2: boolean): string {
        if (col == null) return "";
        if (col.valuesAsString.split(";")[1] === col.valuesAsString.split(";")[2]) {
            return f1 || f2 ? "" : "disabled";
        }
        if (col && Math.abs(this.getValue(col.valuesAsString.split(";")[0])) > 0.3) {
            return "error";
        }
        if (col && Math.abs(this.getValue(col.valuesAsString.split(";")[0])) > 0.1) {
            return "warning";
        }
        else return "";
    }

    getValue(value: string): number {
        return value === "NaN" ? 0 : Number(value.replace(",", "."));
    }

}
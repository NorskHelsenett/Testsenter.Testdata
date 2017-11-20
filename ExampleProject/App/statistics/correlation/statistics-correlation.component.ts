import { Component, Input } from "@angular/core";
import { MatrixElement} from "../../models/DataModels";
@Component({
    moduleId: module.id,
    selector: "statistics-correlation",
    templateUrl: "statistics-correlation.component.html",
    styleUrls: ["statistics.css"]
})

export class StatisticsCorrelationComponent {
    @Input()
    stats: any;
    matrix: MatrixElement[][];
    choices: string[];
    val1: any;
    val2: any;
    selectedValue: string;


   ngOnChanges() {
       if (this.stats != undefined && this.stats.Statistics != null && this.stats.Statistics.Correlations != null) {
           this.matrix = this.stats.Statistics.Correlations.Matrix;
           this.choices = this.matrix[0].filter(x => x != null).map((c: MatrixElement) => c.ValuesAsString);
       }
   }

    getClass(col: MatrixElement, f1: boolean, f2: boolean): string {
        if (col == null) return "";
        if (col && col.XAxisName === col.YAxisName) {
            return f1 || f2 ? "" : "disabled";
        }
        if (col && Math.abs(col.Value) > 0.75) {
            return "error";
        }
        if (col && Math.abs(col.Value) > 0.5) {
            return "warning";
        }
        else return "";
    }

    selectVal() {
        if (this.val1 === undefined || this.val2 === undefined || this.matrix === undefined)
            return "";
        let x = this.choices.indexOf(this.val1) + 1;
        let y = this.choices.indexOf(this.val2) + 1;
        let res = this.matrix[x][y];
        if (res == undefined) {
            res = this.matrix[y][x];
        }
        this.selectedValue = res == undefined ? "" : res.ValuesAsString;
        console.log(this.selectedValue);
    }

}
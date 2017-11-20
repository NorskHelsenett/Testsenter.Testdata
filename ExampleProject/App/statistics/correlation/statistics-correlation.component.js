"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StatisticsCorrelationComponent = (function () {
    function StatisticsCorrelationComponent() {
    }
    StatisticsCorrelationComponent.prototype.ngOnChanges = function () {
        if (this.stats != undefined && this.stats.Statistics != null && this.stats.Statistics.Correlations != null) {
            this.matrix = this.stats.Statistics.Correlations.Matrix;
            this.choices = this.matrix[0].filter(function (x) { return x != null; }).map(function (c) { return c.ValuesAsString; });
        }
    };
    StatisticsCorrelationComponent.prototype.getClass = function (col, f1, f2) {
        if (col == null)
            return "";
        if (col && col.XAxisName === col.YAxisName) {
            return f1 || f2 ? "" : "disabled";
        }
        if (col && Math.abs(col.Value) > 0.75) {
            return "error";
        }
        if (col && Math.abs(col.Value) > 0.5) {
            return "warning";
        }
        else
            return "";
    };
    StatisticsCorrelationComponent.prototype.selectVal = function () {
        if (this.val1 === undefined || this.val2 === undefined || this.matrix === undefined)
            return "";
        var x = this.choices.indexOf(this.val1) + 1;
        var y = this.choices.indexOf(this.val2) + 1;
        var res = this.matrix[x][y];
        if (res == undefined) {
            res = this.matrix[y][x];
        }
        this.selectedValue = res == undefined ? "" : res.ValuesAsString;
        console.log(this.selectedValue);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StatisticsCorrelationComponent.prototype, "stats", void 0);
    StatisticsCorrelationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "statistics-correlation",
            templateUrl: "statistics-correlation.component.html",
            styleUrls: ["statistics.css"]
        })
    ], StatisticsCorrelationComponent);
    return StatisticsCorrelationComponent;
}());
exports.StatisticsCorrelationComponent = StatisticsCorrelationComponent;
//# sourceMappingURL=statistics-correlation.component.js.map
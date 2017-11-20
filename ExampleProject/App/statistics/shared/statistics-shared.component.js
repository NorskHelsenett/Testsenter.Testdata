"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_statistics_tab_1 = require("../base-statistics-tab");
var StatisticsSharedComponent = (function (_super) {
    __extends(StatisticsSharedComponent, _super);
    function StatisticsSharedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = [700, 500];
        // options
        _this.showXAxis = true;
        _this.showYAxis = true;
        _this.gradient = false;
        _this.showLegend = true;
        _this.showXAxisLabel = true;
        _this.xAxisLabel = 'Andel';
        _this.showYAxisLabel = true;
        _this.yAxisLabel = 'Alder';
        _this.sivilstatus = [];
        _this.regstatus = [];
        _this.colorScheme = {
            domain: ['#5AA454']
        };
        _this.pieScheme = _this.colorSet[1];
        return _this;
    }
    StatisticsSharedComponent.prototype.onSelect = function (event) {
        this.selectedNumber = event.value;
        this.selectedAge = event.name;
    };
    StatisticsSharedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "statistics-shared",
            templateUrl: "statistics-shared.component.html",
            styleUrls: ["../statistics.css"]
        })
    ], StatisticsSharedComponent);
    return StatisticsSharedComponent;
}(base_statistics_tab_1.BaseStatisticsTab));
exports.StatisticsSharedComponent = StatisticsSharedComponent;
//# sourceMappingURL=statistics-shared.component.js.map
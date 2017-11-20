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
var StatisticsGroupsComponent = (function (_super) {
    __extends(StatisticsGroupsComponent, _super);
    function StatisticsGroupsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatisticsGroupsComponent.prototype.ngAfterViewInit = function () { };
    StatisticsGroupsComponent.prototype.getAgeQuantName = function (i) {
        return i * this.stats.AgeQuantLevel + " - " + ((i * this.stats.AgeQuantLevel) + 5);
    };
    StatisticsGroupsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "statistics-group",
            templateUrl: "statistics-group.component.html",
            styleUrls: ["../statistics.css"]
        })
    ], StatisticsGroupsComponent);
    return StatisticsGroupsComponent;
}(base_statistics_tab_1.BaseStatisticsTab));
exports.StatisticsGroupsComponent = StatisticsGroupsComponent;
//# sourceMappingURL=statistics-group.component.js.map
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
var StatisticsDetailedComponent = (function (_super) {
    __extends(StatisticsDetailedComponent, _super);
    function StatisticsDetailedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colorScheme = _this.colorSet[1];
        return _this;
    }
    StatisticsDetailedComponent.prototype.ngOnInit = function () {
        this.selectedStats = this.stats == undefined ? undefined : this.stats.Statistics;
    };
    StatisticsDetailedComponent.prototype.ngOnChanges = function () {
        this.updateValues(false);
    };
    StatisticsDetailedComponent.prototype.updateValues = function (selection) {
        if (this.stats === undefined)
            return;
        if (this.ages.length === 0)
            this.getAgequants();
        if (!selection)
            this.selectedStats = this.stats.Statistics;
        this.booleans = [];
        this.discrete = [];
        this.other = [];
        this.getValues(this.selectedStats);
        this.discrete.sort((function (a, b) { return a.properties.length - b.properties.length; }));
    };
    StatisticsDetailedComponent.prototype.getValues = function (value) {
        for (var p in value) {
            var v = value[p];
            if (v === undefined || v === null || typeof v !== "object")
                continue;
            if (v["IsBoolean"] != undefined && v["IsBoolean"]) {
                this.booleans.push({ "name": p, "value": v["TrueRatio"], total: v["TotalCount"], numberOfTrues: v["NumberOfTrues"] });
            }
            else if (v["IsDiscrete"] != undefined && v["IsDiscrete"]) {
                var prop = [];
                if (v["Stats"] != undefined) {
                    var props = v["Stats"];
                    for (var p1 in props) {
                        prop.push({ name: p1, value: props[p1].Count, extra: props[p1].Count / v["TotalCount"] });
                    }
                }
                else if (v["_stats"] != undefined) {
                    var props = v["_stats"];
                    for (var p2 in props) {
                        prop.push({ name: p2, value: props[p2], extra: props[p2] / v["TotalCount"] });
                    }
                }
                this.discrete.push({ name: p, properties: prop });
            }
            else if (v["DistributionfunctionString"] != null) {
                this.other.push({
                    name: p,
                    func: v["DistributionfunctionString"],
                    min: v["Min"],
                    max: v["Max"],
                    total: v["TotalCount"]
                });
            }
            else {
                if (p !== "StatisticsByAgeQuants")
                    this.getValues(v);
            }
        }
    };
    StatisticsDetailedComponent.prototype.rows = function (array) {
        if (array == undefined)
            return [];
        var j = [];
        for (var i = 0; i < array.length / 5; i++) {
            j.push(i * 5);
        }
        return j;
    };
    Object.defineProperty(StatisticsDetailedComponent.prototype, "selectedGroup", {
        set: function (n) {
            this.selectedStats = n === "" ? this.stats.Statistics : this.stats.Statistics.StatisticsByAgeQuants[n];
            this.updateValues(true);
        },
        enumerable: true,
        configurable: true
    });
    StatisticsDetailedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "statistics-detailed",
            templateUrl: "statistics-detailed.component.html",
            styleUrls: ["../statistics.css"]
        })
    ], StatisticsDetailedComponent);
    return StatisticsDetailedComponent;
}(base_statistics_tab_1.BaseStatisticsTab));
exports.StatisticsDetailedComponent = StatisticsDetailedComponent;
//# sourceMappingURL=statistics-detailed.component.js.map
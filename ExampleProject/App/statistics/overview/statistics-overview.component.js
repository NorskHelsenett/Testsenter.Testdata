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
var app_settings_1 = require("../../resources/app-settings");
var pregHelper_1 = require("../../helpers/pregHelper");
var StatisticsOverviewComponent = (function (_super) {
    __extends(StatisticsOverviewComponent, _super);
    function StatisticsOverviewComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = [500, 400];
        // options
        _this.showXAxis = true;
        _this.showYAxis = true;
        _this.gradient = false;
        _this.showLegend = true;
        _this.showXAxisLabel = false;
        _this.showYAxisLabel = true;
        _this.pieScheme = _this.colorSet[1];
        _this.colorMale = _this.colorSet[2];
        _this.colorFemale = _this.colorSet[3];
        return _this;
    }
    StatisticsOverviewComponent.prototype.ngOnChanges = function () {
        this.updateData(false);
    };
    StatisticsOverviewComponent.prototype.updateData = function (selection) {
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
    };
    StatisticsOverviewComponent.prototype.getGenderStats = function () {
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
    };
    StatisticsOverviewComponent.prototype.getRegStatusStats = function () {
        this.regstatus = [];
        var stat = this.selectedStats.RegStatus._stats;
        if (stat == undefined)
            return;
        for (var s in stat) {
            this.regstatus.push({ name: this.regStatusName[s] === undefined ? this.regStatusName[0] : this.regStatusName[s], value: +stat[s] });
        }
    };
    StatisticsOverviewComponent.prototype.getSivilStatusStats = function () {
        this.sivilstatus = [];
        var stat = this.selectedStats.MaritalStatus._stats;
        if (stat == undefined)
            return;
        for (var s in stat) {
            this.sivilstatus.push({ name: this.sivilstatusName[s] === undefined ? this.sivilstatusName[0] : this.sivilstatusName[s], value: +stat[s] });
        }
    };
    StatisticsOverviewComponent.prototype.getCustody = function () {
        this.custody = [];
        var stat = this.selectedStats.Custody.Stats;
        if (stat == undefined)
            return;
        for (var s in stat) {
            if (s === "___emtpystring___")
                continue;
            this.custody.push({ name: app_settings_1.custodyDescription[s], value: +stat[s].Count });
        }
    };
    StatisticsOverviewComponent.prototype.getAgeDistribution = function () {
        this.female = [];
        this.male = [];
        var s = this.stats.Statistics.StatisticsByAgeQuants;
        for (var l in s) {
            if (s[l].NumberOfPersons == 0)
                continue;
            var m = s[l].Kjonn._stats["3"];
            var f = s[l].Kjonn._stats["2"];
            this.male.push({ name: this.getAgeQuantName(s[l].AgeQuantLevel), level: s[l].AgeQuantLevel, value: m === undefined ? 0 : m });
            this.female.push({ name: this.getAgeQuantName(s[l].AgeQuantLevel), level: s[l].AgeQuantLevel, value: f === undefined ? 0 : f });
        }
        this.female.sort(function (a, b) { return a.level - b.level; });
        this.male.sort(function (a, b) { return a.level - b.level; });
    };
    Object.defineProperty(StatisticsOverviewComponent.prototype, "selectedGroup", {
        set: function (n) {
            this.selectedStats = n === "" ? this.stats.Statistics : this.stats.Statistics.StatisticsByAgeQuants[n];
            this.updateData(true);
        },
        enumerable: true,
        configurable: true
    });
    StatisticsOverviewComponent.prototype.getPostalTypes = function () {
        this.postalType = [];
        if (this.stats.Statistics.AdressStatistics == undefined)
            return;
        var stat = this.stats.Statistics.AdressStatistics.PostalType._stats;
        for (var code in stat) {
            if (pregHelper_1.getPostalType(+code) === undefined)
                console.log(code);
            this.postalType.push({ name: pregHelper_1.getPostalType(+code) === undefined ? "Ukjent" : pregHelper_1.getPostalType(+code), value: +stat[code] });
        }
    };
    StatisticsOverviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "statistics-overview",
            templateUrl: "statistics-overview.component.html",
            styleUrls: ["../statistics.css"],
        })
    ], StatisticsOverviewComponent);
    return StatisticsOverviewComponent;
}(base_statistics_tab_1.BaseStatisticsTab));
exports.StatisticsOverviewComponent = StatisticsOverviewComponent;
//# sourceMappingURL=statistics-overview.component.js.map
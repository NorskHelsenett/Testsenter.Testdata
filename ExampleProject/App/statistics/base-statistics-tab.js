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
var app_settings_1 = require("../resources/app-settings");
var BaseStatisticsTab = (function () {
    function BaseStatisticsTab() {
        this.ages = [];
        this.colorSet = app_settings_1.colorSet;
        this.regStatusName = app_settings_1.regStatusName;
        this.sivilstatusName = app_settings_1.sivilStatus;
    }
    BaseStatisticsTab.prototype.getAgeQuantName = function (i) {
        return i * this.stats.AgeQuantLevel + " - " + ((i * this.stats.AgeQuantLevel) + 4);
    };
    BaseStatisticsTab.prototype.generateMockData = function (array, nameFunc, howMany, minVal, maxVal) {
        var _this = this;
        if (howMany === void 0) { howMany = 20; }
        if (minVal === void 0) { minVal = 0; }
        if (maxVal === void 0) { maxVal = 500000; }
        if (nameFunc == undefined)
            nameFunc = function (n) {
                return _this.getAgeQuantName(n);
            };
        for (var i = 0; i < howMany; i++) {
            array.push({ name: nameFunc(i), value: minVal + (Math.random() * (maxVal - minVal)) });
        }
    };
    BaseStatisticsTab.prototype.getAgequants = function () {
        var l = this.stats.Statistics.StatisticsByAgeQuants;
        for (var a in l) {
            this.ages.push(+a);
        }
        this.ages.sort(function (a, b) { return a - b; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BaseStatisticsTab.prototype, "stats", void 0);
    return BaseStatisticsTab;
}());
exports.BaseStatisticsTab = BaseStatisticsTab;
//# sourceMappingURL=base-statistics-tab.js.map
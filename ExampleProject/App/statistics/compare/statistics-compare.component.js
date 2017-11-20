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
var api_service_1 = require("../../core/services/api.service");
var StatisticsCompareComponent = (function () {
    function StatisticsCompareComponent(apiService) {
        var _this = this;
        this.apiService = apiService;
        this.apiService.simpleGetRequest("api/Statistics/All").subscribe(function (res) {
            _this.blobs = res;
        });
    }
    StatisticsCompareComponent.prototype.getValueComperison = function () {
        var _this = this;
        this.loading = true;
        this.apiService.simpleGetRequest("api/Statistics/Compare/".concat(this.stat1 + ";" + this.stat2))
            .subscribe(function (res) {
            _this.loading = false;
            _this.stats = res[0];
            _this.show = _this.keys(_this.stats)[1];
            _this.statslist = res;
            console.log(_this.stats);
        });
    };
    StatisticsCompareComponent.prototype.keys = function (value) {
        return Object.keys(value);
    };
    StatisticsCompareComponent.prototype.orderList = function (value, index) {
        return Object.keys(value).sort(function (a, b) {
            var v1 = value[a][index];
            if (v1)
                v1 = v1.replace(",", ".");
            var v2 = value[b][index];
            if (v2)
                v2 = v2.replace(",", ".");
            return (Math.abs(Number(v2) === NaN ? 0 : +v2) - Math.abs(Number(v1) === NaN ? 0 : +v1));
        });
    };
    StatisticsCompareComponent.prototype.sortOnIndex = function (value, index) {
        return value.slice(0).sort(function (a, b) {
            var v1 = a.split(";")[index];
            if (v1)
                v1 = v1.replace(",", ".");
            var v2 = b.split(";")[index];
            if (v2)
                v2 = v2.replace(",", ".");
            return (Math.abs(Number(v2)) - Math.abs(Number(v1)));
        });
    };
    StatisticsCompareComponent.prototype.getClass = function (col, f1, f2) {
        if (col == null)
            return "";
        if (col.valuesAsString.split(";")[1] === col.valuesAsString.split(";")[2]) {
            return f1 || f2 ? "" : "disabled";
        }
        if (col && Math.abs(this.getValue(col.valuesAsString.split(";")[0])) > 0.3) {
            return "error";
        }
        if (col && Math.abs(this.getValue(col.valuesAsString.split(";")[0])) > 0.1) {
            return "warning";
        }
        else
            return "";
    };
    StatisticsCompareComponent.prototype.getValue = function (value) {
        return value === "NaN" ? 0 : Number(value.replace(",", "."));
    };
    StatisticsCompareComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "statistics-compare",
            templateUrl: "statistics-compare.component.html",
            styleUrls: ["../statistics.css"]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], StatisticsCompareComponent);
    return StatisticsCompareComponent;
}());
exports.StatisticsCompareComponent = StatisticsCompareComponent;
//# sourceMappingURL=statistics-compare.component.js.map
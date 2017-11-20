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
var moment = require("moment/moment");
var filter_manager_service_1 = require("../../../../core/services/filter-manager.service");
var AgeBoxComponent = (function () {
    function AgeBoxComponent(filterManager) {
        this.filterManager = filterManager;
    }
    AgeBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        _a = this.filters, this.min = _a[0], this.max = _a[1];
        if (this.min.parameter !== "") {
            this.valueMin = String(this.getYears(this.min.parameter));
        }
        if (this.max.parameter !== "") {
            this.valueMax = String(this.getYears(this.max.parameter));
        }
        this.filterManager.removedFilter$.subscribe(function (change) {
            if (change.name === _this.min.name && _this.min.parameter === "") {
                _this.valueMin = "";
            }
            else if (change.name === _this.max.name && _this.max.parameter === "") {
                _this.valueMax = "";
            }
        });
        var _a;
    };
    AgeBoxComponent.prototype.onInput = function (isMin) {
        this.checkIfInputIsValid(isMin);
        this.setSelectedValue();
        this.performeSearch();
    };
    AgeBoxComponent.prototype.performeSearch = function () {
        this.filterManager.filterChanged([this.min, this.max]);
    };
    AgeBoxComponent.prototype.checkIfInputIsValid = function (isMin) {
        var value = isMin ? this.valueMin : this.valueMax;
        if (value === "" || value === null) {
            this.setParameterValue("", isMin);
            return;
        }
        if (+value < 0)
            value = "0";
        if (isMin && this.valueMax !== "" && +value >= +this.valueMax) {
            value = this.valueMax;
            this.valueMin = this.valueMax;
        }
        else if (!isMin && this.valueMin !== "" && +value <= +this.valueMin) {
            value = this.valueMax;
            this.valueMax = this.valueMin;
        }
        this.setParameterValue(value, isMin);
    };
    AgeBoxComponent.prototype.getYears = function (parameter) {
        return parameter === "" ? "" : moment().diff(parameter, "years");
    };
    AgeBoxComponent.prototype.setParameterValue = function (value, isMin) {
        if (value === "") {
            if (isMin)
                this.min.parameter = this.valueMin;
            else
                this.max.parameter = this.valueMax;
        }
        else {
            var date = moment().subtract(+value, "y");
            if (isMin)
                this.min.parameter = date.toISOString();
            else {
                date.subtract(1, "y").add(1, "d");
                this.max.parameter = date.toISOString();
            }
        }
    };
    AgeBoxComponent.prototype.setSelectedValue = function () {
        this.min.selected = this.min.parameter !== "";
        this.max.selected = this.max.parameter !== "";
    };
    AgeBoxComponent.prototype.onBlur = function (isMin) {
        this.checkIfInputIsValid(isMin);
        this.setSelectedValue();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AgeBoxComponent.prototype, "filters", void 0);
    AgeBoxComponent = __decorate([
        core_1.Component({
            selector: "agebox",
            moduleId: module.id,
            templateUrl: "agebox.component.html",
            styleUrls: ["agebox.component.css"]
        }),
        __metadata("design:paramtypes", [filter_manager_service_1.FilterManagerService])
    ], AgeBoxComponent);
    return AgeBoxComponent;
}());
exports.AgeBoxComponent = AgeBoxComponent;
//# sourceMappingURL=agebox.component.js.map
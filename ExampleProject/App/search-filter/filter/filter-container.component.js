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
var DataModels_1 = require("../../models/DataModels");
var filter_manager_service_1 = require("../../core/services/filter-manager.service");
var FilterContainerComponent = (function () {
    function FilterContainerComponent(filterManager) {
        this.filterManager = filterManager;
        this.belongings = [DataModels_1.FilterBelonging.Preg, DataModels_1.FilterBelonging.Flr, DataModels_1.FilterBelonging.Hpr, DataModels_1.FilterBelonging.Difi,
            DataModels_1.FilterBelonging.BedReg, DataModels_1.FilterBelonging.Ar, DataModels_1.FilterBelonging.Htk, DataModels_1.FilterBelonging.Resh];
        this.fb = DataModels_1.FilterBelonging.All;
    }
    FilterContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterManager.filters$.subscribe(function (filters) {
            _this.filters = filters;
        });
    };
    FilterContainerComponent.prototype.ngAfterViewInit = function () {
        $(".filteraccordion").accordion();
    };
    FilterContainerComponent.prototype.getFilters = function (beloning) {
        return this.filters.filter(function (f) { return f.belongsTo === beloning; });
    };
    FilterContainerComponent.prototype.belongingHasFilters = function (beloning) {
        if (this.filters == undefined)
            return false;
        return this.filters.some(function (f) { return f.belongsTo === beloning; });
    };
    FilterContainerComponent = __decorate([
        core_1.Component({
            selector: "filter-container",
            moduleId: module.id,
            templateUrl: "filter-container.component.html",
            styleUrls: ["filter-container.component.css"]
        }),
        __metadata("design:paramtypes", [filter_manager_service_1.FilterManagerService])
    ], FilterContainerComponent);
    return FilterContainerComponent;
}());
exports.FilterContainerComponent = FilterContainerComponent;
//# sourceMappingURL=filter-container.component.js.map
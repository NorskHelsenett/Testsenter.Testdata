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
var FilterGroupComponent = (function () {
    function FilterGroupComponent(filterManager) {
        this.filterManager = filterManager;
        this.displayFullList = false;
    }
    FilterGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.filter.items === null || this.filter.items === undefined)
            return;
        this.initialPrioritizedFilters = this.filter.items.slice(0, this.filter.numberToShow);
        this.filter.items.map(function (item) { return item.filterType = _this.filter.type; });
    };
    Object.defineProperty(FilterGroupComponent.prototype, "prioritizedFilters", {
        get: function () {
            var _this = this;
            if (this.filter.items === null || this.filter.items === undefined)
                return;
            return this.initialPrioritizedFilters.concat(this.filter.items
                .filter(function (f) { return f.selected && _this.initialPrioritizedFilters.indexOf(f) === -1; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterGroupComponent.prototype, "hasMore", {
        get: function () {
            var _this = this;
            if (this.filter.items === null || this.filter.items === undefined) {
                return false;
            }
            return this.filter.items.length > this.initialPrioritizedFilters.concat(this.filter.items
                .filter(function (f) { return f.selected && _this.initialPrioritizedFilters.indexOf(f) === -1; })).length;
        },
        enumerable: true,
        configurable: true
    });
    FilterGroupComponent.prototype.onCheckBoxSelect = function (item) {
        item.selected = !item.selected;
        this.filterManager.filterChanged([item]);
    };
    FilterGroupComponent.prototype.onRadioButtonSelect = function (item) {
        if (item.selected)
            return;
        this.filter.items.forEach(function (i) { return i.selected = false; });
        item.selected = true;
        this.filterManager.filterChanged([item]);
    };
    FilterGroupComponent.prototype.onInputBoxChange = function (item) {
        console.log(item);
        if (item.parameter == undefined || item.parameter === "") {
            item.selected = false;
        }
        else if (item.parameter != undefined && item.parameter !== "") {
            item.selected = true;
        }
        this.filterManager.filterChanged([item]);
    };
    FilterGroupComponent.prototype.showMore = function () {
        this.displayFullList = true;
    };
    FilterGroupComponent.prototype.showLess = function () {
        this.displayFullList = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", DataModels_1.FilterGroup)
    ], FilterGroupComponent.prototype, "filter", void 0);
    FilterGroupComponent = __decorate([
        core_1.Component({
            selector: "filter-group",
            moduleId: module.id,
            templateUrl: "filter-group.component.html",
            styleUrls: ["filter-group.component.css"]
        }),
        __metadata("design:paramtypes", [filter_manager_service_1.FilterManagerService])
    ], FilterGroupComponent);
    return FilterGroupComponent;
}());
exports.FilterGroupComponent = FilterGroupComponent;
//# sourceMappingURL=filter-group.component.js.map
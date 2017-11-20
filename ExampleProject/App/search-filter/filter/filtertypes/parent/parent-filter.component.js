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
var DataModels_1 = require("../../../../models/DataModels");
var filter_manager_service_1 = require("../../../../core/services/filter-manager.service");
var ParentFilterComponent = (function () {
    function ParentFilterComponent(filterManager) {
        this.filterManager = filterManager;
    }
    ParentFilterComponent.prototype.onCheckBoxSelect = function (item) {
        if (item === this.parent && this.parent.selected) {
            this.parentNegative.selected = false;
        }
        else {
            this.parent.selected = false;
            this.childItem1.selected = false;
            this.childItem2.selected = false;
        }
        this.filterManager.filterChanged(this.getFilters());
    };
    ParentFilterComponent.prototype.onPregCheckBoxSelect = function (item) {
        if (item === this.childItem1)
            this.childItem2.selected = false;
        else
            this.childItem1.selected = false;
        this.filterManager.filterChanged(this.getFilters());
    };
    ParentFilterComponent.prototype.getFilters = function () {
        return this.group.items.concat(this.childItems);
    };
    ParentFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterManager.removedFilter$.subscribe(function (f) {
            if (f.uniqueValue === _this.parent.uniqueValue) {
                _this.childItems.forEach(function (i) { return i.selected = false; });
                _this.filterManager.filterChanged(_this.childItems);
            }
            if (f.uniqueValue === _this.parentNegative.uniqueValue) {
                _this.childItems.forEach(function (i) { return i.selected = false; });
                _this.filterManager.filterChanged(_this.childItems);
            }
        });
        _a = this.group.items, this.parent = _a[0], this.parentNegative = _a[1];
        this.childItems = [].concat.apply([], this.group.groups.map(function (g) { return g.items; }));
        _b = this.childItems, this.childItem1 = _b[0], this.childItem2 = _b[1];
        var _a, _b;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", DataModels_1.FilterGroup)
    ], ParentFilterComponent.prototype, "group", void 0);
    ParentFilterComponent = __decorate([
        core_1.Component({
            selector: "parent-filter",
            moduleId: module.id,
            templateUrl: "parent-filter.component.html",
            styleUrls: ["../filter-group.component"]
        }),
        __metadata("design:paramtypes", [filter_manager_service_1.FilterManagerService])
    ], ParentFilterComponent);
    return ParentFilterComponent;
}());
exports.ParentFilterComponent = ParentFilterComponent;
//# sourceMappingURL=parent-filter.component.js.map
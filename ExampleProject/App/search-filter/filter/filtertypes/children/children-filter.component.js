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
var ChildrenFilterComponent = (function () {
    function ChildrenFilterComponent(filterManager) {
        var _this = this;
        this.filterManager = filterManager;
        this.hasCustodySelected = false;
        this.hasNotCustodySelected = false;
        this.agevalues = [];
        this.ageSelected = "0";
        this.subscription = this.filterManager.removedFilter$.subscribe(function (item) {
            if (item.parent === _this.hasCustodyGroup.name) {
                _this.hasCustodySelected = false;
                _this.setDropdownDefault();
                _this.unselectGroup(true);
            }
            if (item.parent === _this.hasNotCustodyGroup.name) {
                _this.hasNotCustodySelected = false;
                _this.setDropdownDefault();
                _this.unselectGroup(false);
            }
            if (item.parent === _this.group.name) {
                _this.hasCustodySelected = false;
                _this.hasNotCustodySelected = false;
                _this.unselectGroup();
                _this.group.items.forEach(function (f) { return f.selected = false; });
                if (_this.ageSelected === "0") {
                    _this.setDropdownDefault();
                    if (_this.lastFilter)
                        _this.lastFilter.selected = false;
                    _this.performeSearch();
                }
                else
                    _this.setDropdownDefault();
            }
        });
    }
    ChildrenFilterComponent.prototype.ngOnInit = function () {
        this.hasChild = this.group.items[0];
        this.hasNotChild = this.group.items[this.group.items.length - 1];
        _a = this.group.groups, this.hasCustodyGroup = _a[0], this.hasNotCustodyGroup = _a[1];
        this.agevalues = this.hasCustodyGroup.items.map(function (f) { return f.name; });
        if (this.hasCustodyGroup.items.some(function (i) { return i.selected; })) {
            this.hasCustodySelected = true;
        }
        else if (this.hasNotCustodyGroup.items.some(function (i) { return i.selected; })) {
            this.hasNotCustodySelected = true;
        }
        var _a;
    };
    ChildrenFilterComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('#agedropdown')
            .dropdown({
            onChange: function (value) {
                _this.ageSelected = value;
                _this.setFilters();
                _this.performeSearch();
            }
        });
        if (this.hasNotCustodySelected) {
            var index = this.hasNotCustodyGroup.items.findIndex(function (i) { return i.selected; });
            this.lastFilter = this.hasNotCustodyGroup.items[index];
            this.ageSelected = String(index);
            if (index != 0) {
                $('#agedropdown')
                    .dropdown("set selected", String(this.ageSelected));
            }
        }
        else if (this.hasCustodySelected) {
            var index = this.hasCustodyGroup.items.findIndex(function (i) { return i.selected; });
            this.lastFilter = this.hasCustodyGroup.items[index];
            this.ageSelected = String(index);
            if (index != 0) {
                $('#agedropdown')
                    .dropdown("set selected", String(this.ageSelected));
            }
        }
    };
    ChildrenFilterComponent.prototype.setDropdownDefault = function () {
        $("#agedropdown").dropdown("restore default value");
    };
    ChildrenFilterComponent.prototype.onSelect = function (isHasChild) {
        if (isHasChild) {
            this.hasNotChild.selected = false;
        }
        else {
            this.hasChild.selected = false;
            this.hasCustodySelected = false;
            this.hasNotCustodySelected = false;
            this.setDropdownDefault();
            this.unselectGroup();
        }
        this.performeSearch();
    };
    ChildrenFilterComponent.prototype.onCustodySelect = function (custody) {
        if (!custody) {
            this.hasCustodySelected = false;
        }
        else {
            this.hasNotCustodySelected = false;
        }
        if (!this.hasCustodySelected && !this.hasNotCustodySelected) {
            this.unselectGroup();
        }
        this.setFilters();
        this.performeSearch();
    };
    ChildrenFilterComponent.prototype.performeSearch = function () {
        this.filterManager.filterChanged(this.getFilterItems());
    };
    ChildrenFilterComponent.prototype.getFilterItems = function () {
        var items = this.group.items.concat(this.hasCustodyGroup.items)
            .concat(this.hasNotCustodyGroup.items);
        return items;
    };
    ChildrenFilterComponent.prototype.unselectGroup = function (isHasCustody) {
        if (isHasCustody === undefined) {
            this.hasCustodyGroup.items.forEach(function (f) { return f.selected = false; });
            this.hasNotCustodyGroup.items.forEach(function (f) { return f.selected = false; });
        }
        else {
            var group = isHasCustody ? this.hasCustodyGroup : this.hasNotCustodyGroup;
            group.items.forEach(function (f) { return f.selected = false; });
        }
    };
    ChildrenFilterComponent.prototype.setFilters = function () {
        if (this.lastFilter && this.lastFilter != this.hasChild)
            this.lastFilter.selected = false;
        var appropriateFilterGroup;
        if (this.hasNotChild.selected) {
            this.unselectGroup();
            return;
        }
        if (this.hasChild.selected) {
            appropriateFilterGroup = this.group;
        }
        if (this.hasCustodySelected) {
            appropriateFilterGroup = this.hasCustodyGroup;
        }
        if (this.hasNotCustodySelected) {
            appropriateFilterGroup = this.hasNotCustodyGroup;
        }
        if (appropriateFilterGroup === undefined) {
            return;
        }
        this.lastFilter = appropriateFilterGroup.items[Number(this.ageSelected)];
        appropriateFilterGroup.items[Number(this.ageSelected)].selected = true;
    };
    ChildrenFilterComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", DataModels_1.FilterGroup)
    ], ChildrenFilterComponent.prototype, "group", void 0);
    ChildrenFilterComponent = __decorate([
        core_1.Component({
            selector: "children-filter",
            moduleId: module.id,
            templateUrl: "children-filter.component.html"
        }),
        __metadata("design:paramtypes", [filter_manager_service_1.FilterManagerService])
    ], ChildrenFilterComponent);
    return ChildrenFilterComponent;
}());
exports.ChildrenFilterComponent = ChildrenFilterComponent;
//# sourceMappingURL=children-filter.component.js.map
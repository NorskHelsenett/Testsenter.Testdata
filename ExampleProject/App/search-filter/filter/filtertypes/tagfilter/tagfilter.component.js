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
var data_manager_service_1 = require("../../../../core/services/data-manager.service");
var filter_manager_service_1 = require("../../../../core/services/filter-manager.service");
var TagFilterComponent = (function () {
    function TagFilterComponent(dataManagerService, filterManager) {
        this.dataManagerService = dataManagerService;
        this.filterManager = filterManager;
        this.subscriptions = [];
        this.subscriptions.push(this.filterManager.activeFilters$.subscribe(function (items) {
            if (items.length === 0) {
                $('#tagfilter').dropdown("clear");
            }
        }));
        this.subscriptions.push(this.filterManager.removedFilter$.subscribe(function (item) {
            $("#tagfilter").dropdown("remove selected", item.name);
        }));
        this.subscriptions.push(this.dataManagerService.deletedTag$.subscribe(function (tag) {
            console.log("Deleted tag", tag);
            $("#tagfilter").dropdown("remove selected", tag.name);
        }));
    }
    TagFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataManagerService.tags$.subscribe(function (tags) {
            _this.taglist = tags;
        });
    };
    TagFilterComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('#tagfilter').dropdown({
            forceSelection: false,
            onAdd: function (value) {
                if (!_this.ignore) {
                    _this.changeTagFilter(value, true);
                }
            },
            onRemove: function (value, text) {
                if (!_this.ignore) {
                    _this.changeTagFilter(value, false);
                }
            }
        });
        if (this.group.items.some(function (i) { return i.selected; })) {
            this.ignore = true;
            $('#tagfilter').dropdown("set selected", this.group.items.filter(function (i) { return i.selected; }).map(function (i) { return i.name; }));
            this.ignore = false;
        }
    };
    TagFilterComponent.prototype.changeTagFilter = function (name, state) {
        if (!this.group)
            return;
        var item = this.group.items.find(function (i) { return i.name === name; });
        if (!item)
            return;
        item.selected = state;
        this.filterManager.filterChanged([item]);
    };
    TagFilterComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", DataModels_1.FilterGroup)
    ], TagFilterComponent.prototype, "group", void 0);
    TagFilterComponent = __decorate([
        core_1.Component({
            selector: "tagfilter",
            moduleId: module.id,
            templateUrl: "tagfilter.component.html"
        }),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService, filter_manager_service_1.FilterManagerService])
    ], TagFilterComponent);
    return TagFilterComponent;
}());
exports.TagFilterComponent = TagFilterComponent;
//# sourceMappingURL=tagfilter.component.js.map
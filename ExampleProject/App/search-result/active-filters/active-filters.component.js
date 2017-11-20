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
var mediator_service_1 = require("../../core/services/mediator.service");
var search_manager_service_1 = require("../../core/services/search-manager.service");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var datehelper_1 = require("../../helpers/datehelper");
var ActiveFiltersComponent = (function () {
    function ActiveFiltersComponent(filterManager, mediator, searchManager, userManger) {
        this.filterManager = filterManager;
        this.mediator = mediator;
        this.searchManager = searchManager;
        this.userManger = userManger;
        this.activeFilters = [];
        this.savable = false;
        this.ownedByUser = false;
        this.activeFilterCount = 0;
        this.subscriptions = [];
    }
    ActiveFiltersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.term = new DataModels_1.SearchQuery();
        this.subscriptions.push(this.filterManager.activeFilters$.subscribe(function (filters) {
            _this.activeFilters = filters;
            _this.isSavable();
            _this.setActiveFilterCount();
        }));
        this.subscriptions.push(this.mediator.searchTerm$.subscribe(function (term) {
            _this.term = term;
            _this.isSavable();
            _this.isOwnedByUser();
            _this.setActiveFilterCount();
        }));
        this.subscriptions.push(this.userManger.getUserNameAsync().subscribe(function (name) {
            _this.userName = name;
            _this.isOwnedByUser();
        }));
    };
    ActiveFiltersComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ActiveFiltersComponent.prototype.setActiveFilterCount = function () {
        this.activeFilterCount = this.activeFilters.length + ((this.term.searchTerm === "" || this.term.searchTerm == undefined) ? 0 : 1);
    };
    ActiveFiltersComponent.prototype.isOwnedByUser = function () {
        this.ownedByUser = this.term.dbName && (this.term.registeredBy === this.userName);
    };
    ActiveFiltersComponent.prototype.isSavable = function () {
        var _this = this;
        if (!this.term.dbName && ((this.term.searchTerm !== "" && this.term.searchTerm !== undefined) || (this.activeFilters && this.activeFilters.some(function (i) { return i.selected; })))) {
            this.savable = true;
            setTimeout(function () { return _this.initPopUp(); }, 100);
        }
        else
            this.savable = false;
    };
    ActiveFiltersComponent.prototype.ngAfterViewInit = function () {
        this.initPopUp();
    };
    ActiveFiltersComponent.prototype.initPopUp = function () {
        var _this = this;
        $("#saveSearch").popup({
            on: "click",
            onHide: function () {
                _this.error = false;
            }
        });
        $("#deleteSearch").popup({
            on: "click"
        });
    };
    ActiveFiltersComponent.prototype.save = function (name, description) {
        var _this = this;
        this.error = false;
        if (name.length === 0) {
            this.error = true;
            return;
        }
        this.saving = true;
        this.searchManager.saveSearch(name, description).subscribe(function (res) {
            _this.term = res;
            _this.saving = false;
            $("#saveSearch").popup("hide");
        });
    };
    ActiveFiltersComponent.prototype.searchWithEmptyFilters = function () {
        this.searchManager.searchWithEmptyFilters();
    };
    ActiveFiltersComponent.prototype.deleteSearch = function () {
        var _this = this;
        if (!this.term.dbName)
            return;
        this.deleting = true;
        this.searchManager.deleteSearch(this.term).subscribe(function (res) {
            _this.deleting = false;
            if (res) {
                _this.closeConfirmation();
                _this.term.dbName = undefined;
            }
            else {
                // legg til feil melding
            }
        });
    };
    ActiveFiltersComponent.prototype.close = function () {
        this.error = false;
        $("#saveSearch").popup("hide");
    };
    ActiveFiltersComponent.prototype.closeConfirmation = function () {
        $("#deleteSearch").popup("hide");
    };
    ActiveFiltersComponent.prototype.onRemove = function (item) {
        item.selected = false;
        item.parameter = "";
        this.filterManager.filterChanged([item]);
    };
    ActiveFiltersComponent.prototype.onSearchRemove = function () {
        this.term.searchTerm = "";
        this.mediator.clearSearchTerm();
    };
    ActiveFiltersComponent.prototype.getParameter = function (item) {
        if (item.name === "Minst" || item.name === "Maks") {
            return datehelper_1.getYearFromDateString(item.parameter).toString();
        }
        return item.parameter;
    };
    ActiveFiltersComponent = __decorate([
        core_1.Component({
            selector: "active-filters",
            moduleId: module.id,
            templateUrl: "active-filters.component.html",
            styleUrls: ["active-filters.component.css"]
        }),
        __metadata("design:paramtypes", [filter_manager_service_1.FilterManagerService,
            mediator_service_1.MediatorService,
            search_manager_service_1.SearchManagerService,
            user_manager_service_1.UserManagerService])
    ], ActiveFiltersComponent);
    return ActiveFiltersComponent;
}());
exports.ActiveFiltersComponent = ActiveFiltersComponent;
//# sourceMappingURL=active-filters.component.js.map
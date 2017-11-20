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
var UtilityModels_1 = require("../models/UtilityModels");
var filter_manager_service_1 = require("../core/services/filter-manager.service");
var search_manager_service_1 = require("../core/services/search-manager.service");
var user_manager_service_1 = require("../core/services/user-manager.service");
var mediator_service_1 = require("../core/services/mediator.service");
var IndexComponent = (function () {
    function IndexComponent(userManagerService, mediatorService, filterManager, searchManager) {
        var _this = this;
        this.userManagerService = userManagerService;
        this.mediatorService = mediatorService;
        this.filterManager = filterManager;
        this.searchManager = searchManager;
        this.ChildViews = UtilityModels_1.ChildViews;
        this.searchInProgress = false;
        this.active = 0;
        this.term = "";
        this.loading = false;
        this.mediatorService.searching$.subscribe(function (value) { return _this.searchInProgress = value; });
        this.mediatorService.changeMainView$.subscribe(function (view) { return _this.switchCurrentView(view); });
        this.mediatorService.searchTerm$.subscribe(function (term) { return _this.term = term.searchTerm; });
        this.filterManager.activeFilters$.subscribe(function (filter) {
            _this.active = filter ? filter.length : 0;
        });
    }
    IndexComponent.prototype.ngOnInit = function () {
        this.currentView = UtilityModels_1.ChildViews.Dashboard;
        this.userManagerService.getUserDetailsFromServer().subscribe();
    };
    Object.defineProperty(IndexComponent.prototype, "activeFilters", {
        get: function () {
            return this.active + ((this.term === "" || this.term == undefined) ? 0 : 1);
        },
        enumerable: true,
        configurable: true
    });
    IndexComponent.prototype.onShowSearch = function () {
        this.switchCurrentView(UtilityModels_1.ChildViews.Search);
    };
    IndexComponent.prototype.switchCurrentView = function (view) {
        this.currentView = view;
    };
    IndexComponent.prototype.showSurveillances = function () {
        this.switchCurrentView(UtilityModels_1.ChildViews.Surveillance);
    };
    IndexComponent.prototype.showSearch = function () {
        this.switchCurrentView(UtilityModels_1.ChildViews.Search);
    };
    IndexComponent.prototype.searchWithEmptyFilters = function () {
        this.searchManager.searchWithEmptyFilters();
    };
    IndexComponent = __decorate([
        core_1.Component({
            selector: "index",
            moduleId: module.id,
            templateUrl: "index.component.html",
            styleUrls: ["index.component.css"]
        }),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService, mediator_service_1.MediatorService,
            filter_manager_service_1.FilterManagerService, search_manager_service_1.SearchManagerService])
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map
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
var search_manager_service_1 = require("../../core/services/search-manager.service");
var UtilityModels_1 = require("../../models/UtilityModels");
var mediator_service_1 = require("../../core/services/mediator.service");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var SavedSearchTileComponent = (function () {
    function SavedSearchTileComponent(searchManager, mediatorService, userManager) {
        this.searchManager = searchManager;
        this.mediatorService = mediatorService;
        this.userManager = userManager;
        this.ownedBy = UtilityModels_1.OwnedBy;
        this.numberToShow = 5;
        this.display = 5;
    }
    SavedSearchTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.searchManager.savedSearchList$.subscribe(function (list) {
            _this.userManager.getUserNameAsync().subscribe(function (name) {
                _this.loading = false;
                _this.searchList = _this.selected === UtilityModels_1.OwnedBy.All ? list.filter(function (s) { return s.registeredBy !== name; }) :
                    list.filter(function (s) { return s.registeredBy === name; });
                setTimeout(function () { return $('.filteraccordion').accordion(); }, 1000);
            });
        });
    };
    SavedSearchTileComponent.prototype.ngAfterViewInit = function () {
        $('.filteraccordion').accordion();
    };
    SavedSearchTileComponent.prototype.refresh = function () {
        $('.filteraccordion').accordion();
    };
    SavedSearchTileComponent.prototype.search = function (query) {
        this.searchManager.performeSavedSearch(query);
    };
    SavedSearchTileComponent.prototype.changeLength = function () {
        var _this = this;
        this.display = this.display === this.numberToShow ? this.searchList.length : this.numberToShow;
        setTimeout(function () { return _this.refresh(); }, 1000);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SavedSearchTileComponent.prototype, "selected", void 0);
    SavedSearchTileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "saved-search-tile",
            templateUrl: "saved-search-tile.component.html",
            styleUrls: ["../dashboard.component.css"]
        }),
        __metadata("design:paramtypes", [search_manager_service_1.SearchManagerService, mediator_service_1.MediatorService, user_manager_service_1.UserManagerService])
    ], SavedSearchTileComponent);
    return SavedSearchTileComponent;
}());
exports.SavedSearchTileComponent = SavedSearchTileComponent;
//# sourceMappingURL=saved-search-tile.component.js.map
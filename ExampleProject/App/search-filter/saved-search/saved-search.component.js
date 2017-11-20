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
var UtilityModels_1 = require("../../models/UtilityModels");
var data_manager_service_1 = require("../../core/services/data-manager.service");
var search_manager_service_1 = require("../../core/services/search-manager.service");
var mediator_service_1 = require("../../core/services/mediator.service");
var SavedSearchComponent = (function () {
    function SavedSearchComponent(dataManager, searchManager, mediator) {
        this.dataManager = dataManager;
        this.searchManager = searchManager;
        this.mediator = mediator;
        this.searchList = [];
        this.ownedBy = UtilityModels_1.OwnedBy;
        this.selected = UtilityModels_1.OwnedBy.Me;
    }
    SavedSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchManager.savedSearchList$.subscribe(function (list) {
            if (_this.searchList.length === list.length)
                $(".savedSearchList").dropdown("clear");
            _this.searchList = list;
        });
        this.mediator.searchTerm$.subscribe(function (active) {
            if (_this.currentSelection && _this.currentSelection !== active) {
                _this.restoreDropdown();
                _this.currentSelection = undefined;
            }
        });
        this.mediator.indexSwitch$.subscribe(function (index) { return _this.index = index; });
        this.mediator.userInfo$.subscribe(function () { return _this.selected = UtilityModels_1.OwnedBy.Me; });
    };
    SavedSearchComponent.prototype.restoreDropdown = function () {
        $(".savedSearchList").dropdown("clear");
    };
    SavedSearchComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $(".savedSearchList").dropdown({
            forceSelection: false,
            sortSelect: true,
            onChange: function (value) {
                var search = _this.searchList.find(function (s) { return s.dbName === value; });
                if (search) {
                    _this.currentSelection = search;
                    _this.searchManager.performeSavedSearch(search);
                }
            }
        });
    };
    SavedSearchComponent = __decorate([
        core_1.Component({
            selector: "saved-search",
            moduleId: module.id,
            templateUrl: "saved-search.component.html",
            styleUrls: ["saved-search.component.css"]
        }),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService, search_manager_service_1.SearchManagerService, mediator_service_1.MediatorService])
    ], SavedSearchComponent);
    return SavedSearchComponent;
}());
exports.SavedSearchComponent = SavedSearchComponent;
//# sourceMappingURL=saved-search.component.js.map
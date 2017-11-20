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
var mediator_service_1 = require("../../core/services/mediator.service");
var search_manager_service_1 = require("../../core/services/search-manager.service");
var app_settings_1 = require("../../resources/app-settings");
var SearchBoxComponent = (function () {
    function SearchBoxComponent(mediatorService, searchManager) {
        var _this = this;
        this.mediatorService = mediatorService;
        this.searchManager = searchManager;
        this.currentIndex = UtilityModels_1.HodorIndexes.Person;
        this.Indexes = UtilityModels_1.HodorIndexes;
        this.validSearchTerm = true;
        this.searchTerm = "";
        this.environments = app_settings_1.environments;
        this.mediatorService.searchTerm$.subscribe(function (keyword) {
            _this.searchTerm = keyword.searchTerm;
            _this.validSearchTerm = _this.checkSearchTerm(keyword.searchTerm);
        });
    }
    SearchBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setEnvironment("Test01");
        this.mediatorService.searching$.subscribe(function (value) {
            _this.loading = value;
        });
        this.mediatorService.clearSearchTerm$.subscribe(function () { return _this.searchTerm = ""; });
        this.mediatorService.indexSwitch$.subscribe(function (index) { return _this.currentIndex = index; });
    };
    SearchBoxComponent.prototype.search = function (keyword) {
        this.validSearchTerm = this.checkSearchTerm(keyword);
        if (this.validSearchTerm)
            this.searchManager.setSearchTerm(this.searchTerm);
        this.searchManager.performeSearch();
    };
    SearchBoxComponent.prototype.checkSearchTerm = function (keyword) {
        if (!keyword)
            return true;
        keyword = keyword.trim();
        this.searchTerm = keyword;
        if (keyword.length > 300) {
            this.setMessage("Søkeordene kan makismalt samlet lengde på 300 tegn", "negative");
            return false;
        }
        this.message = "";
        return true;
    };
    SearchBoxComponent.prototype.cancelSearch = function () {
        this.searchManager.cancelSearch();
    };
    SearchBoxComponent.prototype.blur = function (keyword) {
        this.validSearchTerm = this.checkSearchTerm(keyword);
        if (this.validSearchTerm)
            this.searchManager.setSearchTerm(this.searchTerm);
    };
    SearchBoxComponent.prototype.setMessage = function (message, messageClass) {
        this.message = message;
        this.messageClass = messageClass;
    };
    SearchBoxComponent.prototype.setLoadingStatus = function (flag) {
        this.loading = flag;
    };
    SearchBoxComponent.prototype.setEnvironment = function (env) {
        this.searchManager.setEnvironment(env);
    };
    SearchBoxComponent.prototype.switchIndex = function (newIndex) {
        if (newIndex !== this.currentIndex) {
            this.currentIndex = newIndex;
            this.mediatorService.switchIndex(newIndex);
            this.mediatorService.clearSearchTerm();
        }
    };
    SearchBoxComponent = __decorate([
        core_1.Component({
            selector: "search-box",
            moduleId: module.id,
            templateUrl: "search-box.component.html",
            styleUrls: ["search-box.component.css"]
        }),
        __metadata("design:paramtypes", [mediator_service_1.MediatorService, search_manager_service_1.SearchManagerService])
    ], SearchBoxComponent);
    return SearchBoxComponent;
}());
exports.SearchBoxComponent = SearchBoxComponent;
//# sourceMappingURL=search-box.component.js.map
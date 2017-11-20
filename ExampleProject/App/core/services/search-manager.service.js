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
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var mediator_service_1 = require("./mediator.service");
var data_manager_service_1 = require("./data-manager.service");
var filter_manager_service_1 = require("./filter-manager.service");
var api_service_1 = require("./api.service");
var searchParser_1 = require("../../helpers/searchParser");
var DataModels_1 = require("../../models/DataModels");
var UtilityModels_1 = require("../../models/UtilityModels");
/**
 * Håndterer alt relatert med søk
 */
var SearchManagerService = (function () {
    function SearchManagerService(dataManager, mediator, filterManager, apiService) {
        var _this = this;
        this.dataManager = dataManager;
        this.mediator = mediator;
        this.filterManager = filterManager;
        this.apiService = apiService;
        this.searchTerm = new searchParser_1.SearchParser("");
        this.savedSearchList = [];
        this.savedSearches = new ReplaySubject_1.ReplaySubject(1);
        this.searchParameters = new DataModels_1.HodorSearchParameters();
        this.search = new DataModels_1.Search();
        this.index = UtilityModels_1.HodorIndexes.Person;
        this.savedSearchList$ = this.savedSearches.asObservable();
        this.search.searchParameters = this.searchParameters;
        this.mediator.performeSearch$.subscribe(function () { return _this.performeSearch(); });
        this.mediator.updateSavedSearches$.subscribe(function () { return _this.getSavedSearch(); });
        this.mediator.indexSwitch$.subscribe(function (switchTo) { return _this.switchIndex(switchTo); });
        this.mediator.clearSearchTerm$.subscribe(function () {
            _this.searchTerm.term = "";
            _this.performeSearch();
        });
        this.mediator.searchTerm$.subscribe(function (term) { return _this.searchTerm.term = term.searchTerm; });
        this.apiService.getSavedSearches().subscribe(function (res) {
            _this.savedSearchList = res;
            _this.savedSearches.next(_this.savedSearchList);
        });
    }
    SearchManagerService.prototype.switchIndex = function (switchTo) {
        this.index = switchTo;
        this.searchTerm.term = "";
    };
    SearchManagerService.prototype.setEnvironment = function (env) {
        this.searchParameters.environment = env;
    };
    /**
     * Henter inn alle lagrede søk fra serveren
     */
    SearchManagerService.prototype.getSavedSearch = function () {
        var _this = this;
        this.apiService.getSavedSearches().subscribe(function (res) {
            _this.savedSearchList = res;
            _this.savedSearches.next(_this.savedSearchList);
        });
    };
    /**
     * Setter søkeordet som vil bli brukt ved søk
     * @param keyword
     */
    SearchManagerService.prototype.setSearchTerm = function (keyword) {
        this.searchTerm.term = keyword;
    };
    /**
     * Avbryt pågående søk
     */
    SearchManagerService.prototype.cancelSearch = function () {
        this.dataManager.cancelSearch();
        this.filterManager.undo();
    };
    /**
     * Utfør søk uten noen søkeparameter
     */
    SearchManagerService.prototype.searchWithEmptyFilters = function () {
        this.searchTerm.term = "";
        this.filterManager.resetFilters();
        this.performeSearch();
    };
    /**
     * Utfør søk med kun gitt nin som søkeparamter
     * @param nin
     */
    SearchManagerService.prototype.searchWithNin = function (nin) {
        this.filterManager.resetFilters();
        this.searchTerm.term = nin;
        this.performeSearch();
    };
    /**
     * Utfør et "OR" søk med nin'ene som er gitt.
     * @param nins
     */
    SearchManagerService.prototype.searchForMultipleNins = function (nins) {
        this.filterManager.resetFilters();
        this.searchTerm.term = nins.join(" | ");
        this.performeSearch();
    };
    /**
     * Utfører et søk basert på et lagret søk
     * @param search
     */
    SearchManagerService.prototype.performeSavedSearch = function (search) {
        this.mediator.switchIndex(search.searchIndex);
        this.filterManager.updateFilters(search.filters, search.selectedFilters);
        this.searchTerm.term = search.searchTerm;
        this.performeSearch(search);
    };
    /**
     * Setter søkeordet til en tom string
     */
    SearchManagerService.prototype.resetSearchTerm = function () {
        this.searchTerm.term = "";
    };
    /**
    * Setter sidetallet som blir bukt i søket
    */
    SearchManagerService.prototype.setPage = function (page) {
        this.searchParameters.page = page;
    };
    /**
     * Lagrer et definert søk slik at det kan bli brukt ved en senere anledning
     * @param name
     * @param description
     */
    SearchManagerService.prototype.saveSearch = function (name, description) {
        var _this = this;
        var search = new DataModels_1.SearchQuery();
        search.filters = this.filterManager.searchFilters;
        search.friendlyName = name;
        search.description = description;
        search.searchTerm = this.searchTerm.term;
        search.searchIndex = this.index;
        return this.apiService.saveSearch(search).map(function (res) {
            if (res) {
                _this.savedSearchList.unshift(res);
                _this.savedSearches.next(_this.savedSearchList);
            }
            return res;
        });
    };
    SearchManagerService.prototype.deleteSearch = function (search) {
        var _this = this;
        return this.apiService.deleteSearch(search).map(function (res) {
            if (res) {
                _this.savedSearchList.splice(_this.savedSearchList.findIndex(function (s) { return s.dbName === search.dbName; }), 1);
                _this.savedSearches.next(_this.savedSearchList);
                return true;
            }
            else {
                return false;
            }
        });
    };
    SearchManagerService.prototype.performeSearch = function (query, page) {
        if (this.searchTerm.term === "invalid")
            return;
        if (page)
            this.searchParameters.page = page;
        else
            this.searchParameters.page = 0;
        this.mediator.changeMainView(UtilityModels_1.ChildViews.Search);
        var searchQuery = query;
        if (!searchQuery) {
            searchQuery = {
                searchTerm: this.searchTerm.term,
                filters: this.filterManager.searchFilters,
                searchType: this.searchTerm.type
            };
        }
        this.mediator.searchTerm(searchQuery);
        this.search.searchQuery = searchQuery;
        this.dataManager.getSearchResult(this.search);
    };
    SearchManagerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService, mediator_service_1.MediatorService, filter_manager_service_1.FilterManagerService,
            api_service_1.ApiService])
    ], SearchManagerService);
    return SearchManagerService;
}());
exports.SearchManagerService = SearchManagerService;
//# sourceMappingURL=search-manager.service.js.map
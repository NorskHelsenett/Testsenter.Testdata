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
var Subject_1 = require("rxjs/Subject");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var api_service_1 = require("./api.service");
var mediator_service_1 = require("./mediator.service");
var UtilityModels_1 = require("../../models/UtilityModels");
/**
 * Servicen tar seg av alt relatert til filtrene
 */
var FilterManagerService = (function () {
    function FilterManagerService(apiService, mediatorService) {
        var _this = this;
        this.apiService = apiService;
        this.mediatorService = mediatorService;
        this.filtersSubject = new ReplaySubject_1.ReplaySubject(1);
        this.activeFilterSubject = new ReplaySubject_1.ReplaySubject(1);
        this.removedFilterSubject = new Subject_1.Subject();
        //Brukes til å publisere filterlisten som brukes 
        this.filters$ = this.filtersSubject.asObservable();
        //Brukes til å publisere aktive filtere
        this.activeFilters$ = this.activeFilterSubject.asObservable();
        //Brukes til å publisere filtere som var, men som ikke lengre er aktive
        this.removedFilter$ = this.removedFilterSubject.asObservable();
        this.lastChange = [];
        this.activeFilters = [];
        this.index = UtilityModels_1.HodorIndexes.Person;
        this.apiService.getFilters(UtilityModels_1.HodorIndexes.Person).subscribe(function (f) {
            _this.initialPersonFilters = JSON.parse(JSON.stringify(f));
            _this.processFilters(f);
        });
        this.apiService.getFilters(UtilityModels_1.HodorIndexes.Business).subscribe(function (f) {
            _this.initialBusinessFilters = JSON.parse(JSON.stringify(f));
        });
        this.mediatorService.indexSwitch$.subscribe(function (switchTo) { return _this.changeFilterType(switchTo); });
    }
    /**
     * Tilbakestiller siste filterendring
     */
    FilterManagerService.prototype.undo = function () {
        this.lastChange.forEach(function (f) { return f.selected = !f.selected; });
        this.activeFilterSubject.next(this.activeFilters);
    };
    /**
     * Oppdaterer aktive filterlisten og pubilserer denne via {@link MediatorService}. Hvis @param item kun inneholder et element som ikke er
     * valgt vil dette filteret også bli publisert.
     * @param item Filteret/filterene som har blitt endret
     * @param performeSearch Bestemmer om et søk skal bli tatt med de nye filterne
     */
    FilterManagerService.prototype.filterChanged = function (item, performeSearch) {
        if (performeSearch === void 0) { performeSearch = true; }
        this.lastChange = item;
        var _loop_1 = function (filter) {
            var i = this_1.activeFilters.findIndex(function (f) { return f.uniqueValue === filter.uniqueValue; });
            if (i === -1 && filter.selected)
                this_1.activeFilters.push(filter);
            if (i !== -1 && !filter.selected)
                this_1.activeFilters.splice(i, 1);
        };
        var this_1 = this;
        for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
            var filter = item_1[_i];
            _loop_1(filter);
        }
        if (item.length === 1 && !item[0].selected) {
            this.removedFilterSubject.next(item[0]);
        }
        this.activeFilterSubject.next(this.activeFilters);
        if (performeSearch)
            this.mediatorService.performeSearch();
    };
    FilterManagerService.prototype.processFilters = function (f) {
        this.filters = f;
        this.filtersSubject.next(this.filters);
    };
    /**
     * Oppdaterer filtervalgene samt aktive filtere. Primært brukt med lagrede søk
     * @param filters De nye filtrene
     * @param selectedFilters Liste med filtere som er valgt.
     */
    FilterManagerService.prototype.updateFilters = function (filters, selectedFilters) {
        var newFilters = JSON.parse(JSON.stringify(filters));
        this.processFilters(newFilters);
        this.activeFilters = JSON.parse(JSON.stringify(selectedFilters));
        this.activeFilterSubject.next(this.activeFilters);
    };
    /**
     * Utfører et søk med kun en tag som filter.
     * @param name Navnet på tagen som skal bli brukt i søket
     */
    FilterManagerService.prototype.searchWithTag = function (name) {
        this.resetFilters();
        this.mediatorService.searchTerm({ searchTerm: "" });
        var tagGroup = this.filters.find(function (g) { return g.name.toLowerCase() === "tags"; });
        var item = tagGroup.items.find(function (f) { return f.name === name; });
        if (item) {
            item.selected = true;
            this.filterChanged([item]);
        }
    };
    FilterManagerService.prototype.changeFilterType = function (switchTo) {
        this.index = switchTo;
        this.resetFilters();
        this.processFilters(switchTo === UtilityModels_1.HodorIndexes.Business ? this.initialBusinessFilters : this.initialPersonFilters);
    };
    /**
     * Tilbakestiller filtervalgene til opprinnelig verdier
     */
    FilterManagerService.prototype.resetFilters = function () {
        this.filters = JSON.parse(JSON.stringify(this.index === UtilityModels_1.HodorIndexes.Person ? this.initialPersonFilters : this.initialBusinessFilters));
        this.activeFilters = [];
        this.lastChange = undefined;
        this.activeFilterSubject.next(this.activeFilters);
        this.filtersSubject.next(this.filters);
    };
    Object.defineProperty(FilterManagerService.prototype, "searchFilters", {
        get: function () {
            return this.filters;
        },
        enumerable: true,
        configurable: true
    });
    FilterManagerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService, mediator_service_1.MediatorService])
    ], FilterManagerService);
    return FilterManagerService;
}());
exports.FilterManagerService = FilterManagerService;
//# sourceMappingURL=filter-manager.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
/**
 *
 */
var MediatorService = (function () {
    function MediatorService() {
        // Sources
        this._surveillanceRemoved = new Subject_1.Subject();
        this._surveillanceAdded = new Subject_1.Subject();
        this._filterChange = new Subject_1.Subject();
        this._searching = new Subject_1.Subject();
        this._changeMainView = new Subject_1.Subject();
        this._userInfo = new ReplaySubject_1.ReplaySubject(1);
        this._performeSearch = new Subject_1.Subject();
        this._clearSearchTerm = new Subject_1.Subject();
        this._searchTerm = new ReplaySubject_1.ReplaySubject(1);
        this._errorMessage = new ReplaySubject_1.ReplaySubject(1);
        this._updateSavedSearches = new Subject_1.Subject();
        this._indexSwitch = new ReplaySubject_1.ReplaySubject(1);
        this.surveillancerRemoved$ = this._surveillanceRemoved.asObservable();
        this.surveillanceAdded$ = this._surveillanceAdded.asObservable();
        this.searching$ = this._searching.asObservable();
        this.changeMainView$ = this._changeMainView.asObservable();
        this.userInfo$ = this._userInfo.asObservable();
        this.filterChange$ = this._filterChange.asObservable();
        this.performeSearch$ = this._performeSearch.asObservable();
        this.clearSearchTerm$ = this._clearSearchTerm.asObservable();
        this.searchTerm$ = this._searchTerm.asObservable();
        this.errorMessage$ = this._errorMessage.asObservable();
        this.updateSavedSearches$ = this._updateSavedSearches.asObservable();
        this.indexSwitch$ = this._indexSwitch.asObservable();
    }
    MediatorService.prototype.notifyAboutDeletedSurveillance = function (person) {
        this._surveillanceRemoved.next(person);
    };
    MediatorService.prototype.notifyAboutAddedSurveillance = function (person) {
        this._surveillanceAdded.next(person);
    };
    MediatorService.prototype.filterChanged = function (change) {
        this._filterChange.next(change);
    };
    MediatorService.prototype.isSearching = function (value) {
        this._searching.next(value);
    };
    MediatorService.prototype.changeMainView = function (view) {
        this._changeMainView.next(view);
    };
    MediatorService.prototype.pushUserInfo = function (user) {
        this._userInfo.next(user);
    };
    MediatorService.prototype.performeSearch = function () {
        this._performeSearch.next();
    };
    MediatorService.prototype.clearSearchTerm = function () {
        this._clearSearchTerm.next();
    };
    MediatorService.prototype.searchTerm = function (term) {
        this._searchTerm.next(term);
    };
    MediatorService.prototype.setErrorMessage = function (message) {
        this._errorMessage.next(message);
    };
    MediatorService.prototype.updateSavedSearches = function () {
        this._updateSavedSearches.next();
    };
    MediatorService.prototype.switchIndex = function (switchTo) {
        this._indexSwitch.next(switchTo);
    };
    MediatorService = __decorate([
        core_1.Injectable()
    ], MediatorService);
    return MediatorService;
}());
exports.MediatorService = MediatorService;
//# sourceMappingURL=mediator.service.js.map
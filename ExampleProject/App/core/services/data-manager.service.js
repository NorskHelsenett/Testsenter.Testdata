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
var of_1 = require("rxjs/observable/of");
require("rxjs/add/operator/toPromise");
var api_service_1 = require("./api.service");
var mediator_service_1 = require("./mediator.service");
var user_manager_service_1 = require("./user-manager.service");
var DataModels_1 = require("../../models/DataModels");
var UtilityModels_1 = require("../../models/UtilityModels");
var registerhelper_1 = require("../../helpers/registerhelper");
/**
 * Håndterer all data relatert til søkeresultarer, varslinger og tags.
 */
var DataManagerService = (function () {
    function DataManagerService(apiService, mediatorService, userManagerService) {
        var _this = this;
        this.apiService = apiService;
        this.mediatorService = mediatorService;
        this.userManagerService = userManagerService;
        this.searchResultsSubject = new ReplaySubject_1.ReplaySubject(1);
        this.surveillanceResultsSubject = new ReplaySubject_1.ReplaySubject(1);
        this.deletedTagSubject = new Subject_1.Subject();
        this.surveillanceStatusSubject = new ReplaySubject_1.ReplaySubject(1);
        this.tagsSubject = new ReplaySubject_1.ReplaySubject(1);
        this.index = UtilityModels_1.HodorIndexes.Person;
        this.searchResults$ = this.searchResultsSubject.asObservable();
        this.surveillanceResults$ = this.surveillanceResultsSubject.asObservable();
        this.surveillanceStatus$ = this.surveillanceStatusSubject.asObservable();
        this.tags$ = this.tagsSubject.asObservable();
        this.deletedTag$ = this.deletedTagSubject.asObservable();
        this.mediatorService.surveillancerRemoved$.subscribe(function (data) { return _this.updateSurveillance(data, false); });
        this.mediatorService.surveillanceAdded$.subscribe(function (data) { return _this.updateSurveillance(data, true); });
        this.mediatorService.userInfo$.subscribe(function (user) { return _this.getSurveillances(user); });
        this.mediatorService.indexSwitch$.subscribe(function (index) { return _this.switchIndex(index); });
        this.personDetailList = [];
        this.businessDetailList = [];
    }
    DataManagerService.prototype.switchIndex = function (switchTo) {
        this.index = switchTo;
        this.searchResults = new DataModels_1.SearchResult();
        this.searchResultsSubject.next(this.searchResults);
    };
    /**
     * Henter inn varslingene til en brukers prosjekt. Først hentes personer som prosjektet har satt opp varslinger på ned fra søkeindeksen.
     * Etter dette blir informasjon om varslingene hentet fra serveren.
     * @param user Brukeren man ønsker å hente varslinger til
     */
    DataManagerService.prototype.getSurveillances = function (user) {
        var _this = this;
        if (user.projectValue === -1)
            return;
        this.mediatorService.isSearching(true);
        this.apiService.getIndexedProjectSurveillances(user.projectValue).subscribe(function (res) {
            if (!res) {
                _this.mediatorService.isSearching(false);
                return;
            }
            _this.surveillanceResults = res;
            _this.apiService.getSurveillanceForProject().subscribe(function (data) {
                _this.processSurveillances(data);
                _this.surveillanceResultsSubject.next(_this.surveillanceResults);
                _this.mediatorService.isSearching(false);
            }, function (error) {
                _this.mediatorService.isSearching(false);
                _this.mediatorService.setErrorMessage(new UtilityModels_1.ErrorMessage("En feil oppsto når dine varslinger skulle hentes, vennligst prøv igjen"));
            });
        }, function (error) {
            _this.mediatorService.isSearching(false);
            _this.mediatorService.setErrorMessage(new UtilityModels_1.ErrorMessage("En feil oppsto når dine varslinger skulle hentes, vennligst prøv igjen"));
        });
        this.apiService.getTags().subscribe(function (tags) {
            _this.tags = tags;
            _this.tagsSubject.next(_this.tags);
        });
    };
    /**
     * Legger til en tag til en person
     * @param tag Navnet på taggen
     * @param id Id'en til personen, enten nin eller hrp nummer. Id'en til en person er gitt av commonIdentifier feltet i personens {@link RegisterPerson} objekt
     * @param person Person objektet som taggen skal legges til
     */
    DataManagerService.prototype.addTag = function (tag, id, person, index) {
        var _this = this;
        var tagInfo = this.tags.find(function (x) { return x.name === tag; });
        if (tagInfo && person.tags.find(function (t) { return t === tagInfo.key; }))
            return;
        this.apiService.addTag(id, tag, index).subscribe(function (res) {
            if (_this.tags.find(function (t) { return t.name === res.name; }) === undefined) {
                _this.tags.push(res);
                _this.tagsSubject.next(_this.tags);
            }
            person.tags.push(res.key);
        });
    };
    /**
    * Fjerner en tag fra en person
    * @param tag Navnet på taggen
    * @param id Id'en til personen, enten nin eller hrp nummer. Id'en til en person er gitt av commonIdentifier feltet i personens {@link RegisterPerson} objekt
    * @param person Person objektet som taggen skal fjernes fra
    */
    DataManagerService.prototype.removeTag = function (tag, id, item, index) {
        var t = this.tags.find(function (x) { return x.name === tag; });
        if (t)
            item.tags.splice(item.tags.indexOf(t.key), 1);
        this.apiService.removeTag(id, tag, index).subscribe();
    };
    /**
     * Sletter en tag. Alle persones som var tagget med denne taggen vil da miste den. Man kan kun slette tager man selv har opprettet.
     * Lagerede søk som kun inneholder taggen vil også bli slettet.
     * @param tag Taggen som skal bli slettet
     */
    DataManagerService.prototype.deleteTag = function (tag) {
        var _this = this;
        this.apiService.deleteTag(tag.name).subscribe(function (res) {
            if (_this.searchResults) {
                _this.searchResults.documents.filter(function (p) { return p.tags.some(function (t) { return t === tag.key; }); })
                    .forEach(function (p) { return p.tags.splice(p.tags.indexOf(tag.key), 1); });
                _this.searchResultsSubject.next(_this.searchResults);
            }
            if (_this.surveillanceResults) {
                _this.surveillanceResults.filter(function (p) { return p.tags.some(function (t) { return t === tag.key; }); })
                    .forEach(function (p) { return p.tags.splice(p.tags.indexOf(tag.key), 1); });
                _this.surveillanceResultsSubject.next(_this.surveillanceResults);
            }
            if (_this.tags) {
                _this.tags.splice(_this.tags.indexOf(tag), 1);
                _this.tagsSubject.next(_this.tags);
            }
            _this.deletedTagSubject.next(tag);
            if (!res) {
                _this.mediatorService.updateSavedSearches();
            }
        });
    };
    /**
     * Tar inn en liste med overvåkningsresultater og matcher dem opp med en eksisterende med personer.
     * @param data
     */
    DataManagerService.prototype.processSurveillances = function (data) {
        var _this = this;
        data.forEach(function (result) {
            var match = _this.surveillanceResults.find(function (p) { return p.commonIdentifier === result.commonIdentifier; });
            if (match) {
                if (match.latestSurveillanceResults == undefined)
                    match.latestSurveillanceResults = [];
                match.latestSurveillanceResults.push(result);
                if (match.surveillancesInfo == undefined)
                    match.surveillancesInfo = [];
                match.surveillancesInfo.push({ key: result.actionKey, registeredBy: result.registeredBy });
            }
        });
        this.surveillanceResults = this.surveillanceResults.filter(function (r) { return r.latestSurveillanceResults != undefined; });
        this.setSurveillanceState(this.surveillanceResults);
        this.pushSurveillanceStatus();
    };
    //Burde flyttes til search-mananger
    DataManagerService.prototype.getSearchResult = function (query) {
        var _this = this;
        this.mediatorService.isSearching(true);
        if (this.index === UtilityModels_1.HodorIndexes.Business) {
            this.searchSubscription = this.apiService.buisnessSearch(query).subscribe(function (data) {
                _this.searchResults = data;
                _this.searchResultsSubject.next(_this.searchResults);
                _this.mediatorService.isSearching(false);
            }, function (error) {
                _this.searchResultsSubject.next(undefined);
                _this.mediatorService.isSearching(false);
                console.log("Something went wrong " + error);
            });
        }
        else {
            this.searchSubscription = this.apiService.personSearch(query)
                .subscribe(function (data) {
                _this.processSearchResult(data.documents);
                _this.searchResults = data;
                _this.searchResultsSubject.next(_this.searchResults);
                _this.mediatorService.isSearching(false);
            }, function (error) {
                _this.searchResultsSubject.next(undefined);
                _this.mediatorService.isSearching(false);
                console.log("Something went wrong " + error);
            });
        }
    };
    DataManagerService.prototype.processSearchResult = function (result) {
        if (this.surveillanceResults === undefined ||
            this.surveillanceResults.length === 0)
            return;
        if (result == undefined)
            return;
        var _loop_1 = function (person) {
            var match = this_1.surveillanceResults.find(function (s) { return s.commonIdentifier === person.commonIdentifier; });
            if (match !== undefined) {
                result.splice(result.indexOf(person), 1);
                result.unshift(match);
            }
        };
        var this_1 = this;
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var person = result_1[_i];
            _loop_1(person);
        }
    };
    DataManagerService.prototype.setSurveillanceState = function (projectSurveillances) {
        projectSurveillances.forEach(function (person) {
            person.status = UtilityModels_1.SurveillanceStatus.Synced;
            if (person.latestSurveillanceResults == undefined)
                return;
            if (person.latestSurveillanceResults
                .some(function (res) { return registerhelper_1.getSurveillanceResult(res) === UtilityModels_1.SurveillanceStatus.Unsynced; }))
                person.status = UtilityModels_1.SurveillanceStatus.Unsynced;
        });
    };
    DataManagerService.prototype.addCommentToPerson = function (content, ci) {
        var _this = this;
        var comment = {
            commonIdentifier: ci,
            content: content
        };
        return this.apiService.addComment(comment).map(function (res) {
            if (res) {
                console.log(isNaN(+ci));
                var item = void 0;
                if (isNaN(+ci)) {
                    item = _this.businessDetailList.find(function (p) { return p.commonIdentifier === comment.commonIdentifier; });
                }
                else {
                    item = _this.personDetailList.find(function (p) { return p.commonIdentifier === comment.commonIdentifier; });
                }
                if (!item.comments)
                    item.comments = [res];
                else
                    item.comments.unshift(res);
                return true;
            }
            return false;
        });
    };
    DataManagerService.prototype.removeComment = function (comment) {
        var _this = this;
        this.apiService.removeComment(comment).subscribe(function (res) {
            if (res) {
                var person = _this.personDetailList.find(function (p) { return p.commonIdentifier === comment.commonIdentifier; });
                if (person)
                    person.comments.splice(person.comments.findIndex(function (c) { return c.key === comment.key; }), 1);
            }
        });
    };
    DataManagerService.prototype.cancelSearch = function () {
        this.mediatorService.isSearching(false);
        if (this.searchSubscription)
            this.searchSubscription.unsubscribe();
    };
    DataManagerService.prototype.updateSurveillance = function (person, add) {
        if (person === null)
            return;
        if (this.surveillanceResults === undefined)
            this.surveillanceResults = [];
        var position = this.surveillanceResults.findIndex(function (p) { return p.commonIdentifier === person.commonIdentifier; });
        if (position === -1) {
            person.status = UtilityModels_1.SurveillanceStatus.Synced;
            this.surveillanceResults.unshift(person);
        }
        else {
            if (!person.detail.surveillances.some(function (sur) { return sur.isChecked; })) {
                this.surveillanceResults.splice(position, 1);
                this.personDetailList.splice(this.personDetailList
                    .findIndex(function (p) { return p.commonIdentifier === person.commonIdentifier; }));
            }
            else {
                this.surveillanceResults.splice(position, 1);
                this.surveillanceResults.unshift(person);
            }
        }
        this.pushSurveillanceStatus();
        this.surveillanceResultsSubject.next(this.surveillanceResults);
    };
    /**
     * Går gjennom alle varslingene og teller opp hvor mange som er i synk/usynk for bruker og dens prosjkets varslinger.
     * Disse blir så publisert og brukt av blant annet {@link SurveillanceStatusComponent}
     */
    DataManagerService.prototype.pushSurveillanceStatus = function () {
        var status = new UtilityModels_1.SurveillanceInformation;
        var name = this.userManagerService.getName();
        status.personalSynced = this.surveillanceResults.filter(function (p) { return p.status === UtilityModels_1.SurveillanceStatus.Synced && p.surveillancesInfo.some(function (sb) { return sb.registeredBy === name; }); }).length;
        status.personalUnsynced = this.surveillanceResults.filter(function (p) { return p.status === UtilityModels_1.SurveillanceStatus.Unsynced && p.surveillancesInfo.some(function (sb) { return sb.registeredBy === name; }); }).length;
        status.projectSynced = this.surveillanceResults.filter(function (p) { return p.status === UtilityModels_1.SurveillanceStatus.Synced && !p.surveillancesInfo.some(function (sb) { return sb.registeredBy === name; }); }).length;
        status.projectUnsynced = this.surveillanceResults.filter(function (p) { return p.status === UtilityModels_1.SurveillanceStatus.Unsynced && !p.surveillancesInfo.some(function (sb) { return sb.registeredBy === name; }); }).length;
        this.surveillanceStatusSubject.next(status);
    };
    DataManagerService.prototype.getPersonDetail = function (person) {
        var _this = this;
        return this.apiService.getPersonDetails(person)
            .map(function (res) {
            res.commonIdentifier = person.commonIdentifier;
            person.detail = res;
            _this.personDetailList.push(res);
            return res;
        });
    };
    DataManagerService.prototype.getBusinessDetail = function (business) {
        var _this = this;
        return this.apiService.getBusinessDetails(business)
            .map(function (res) {
            res.commonIdentifier = business.commonIdentifier;
            business.detail = res;
            _this.businessDetailList.push(res);
            return res;
        });
    };
    /**
     * Returnerer {@link PersonDetails} objektet til {@link RegisterPerson} objektet med samme commonIdentifer
     * @param person Personen man ønsker detaljer
     */
    DataManagerService.prototype.getCachedPersonDetails = function (person) {
        var match = this.personDetailList.find(function (ele) { return ele.commonIdentifier === person.commonIdentifier; });
        return match != undefined ? of_1.of(match) : this.getPersonDetail(person);
    };
    DataManagerService.prototype.getCachedBusinessDetails = function (business) {
        var match = this.businessDetailList.find(function (ele) { return ele.commonIdentifier === business.commonIdentifier; });
        return match != undefined ? of_1.of(match) : this.getBusinessDetail(business);
    };
    /**
     *
     * @param id Id'en til tage man vil ha navnet til
     * @returns Navnet til tagen med gitt id
     */
    DataManagerService.prototype.getTagName = function (id) {
        if (!this.tags) {
            return "";
        }
        var tag = this.tags.find(function (t) { return t.key === id; });
        return tag === undefined ? "" : tag.name;
    };
    /**
     *
     * @param name Navnet på tagen man ønsker informasjon om
     * @returns {@link Tag} objektet for tag med gitt navn
     */
    DataManagerService.prototype.getTagInfo = function (name) {
        return this.tags.find(function (t) { return t.name === name; });
    };
    /**
     *
     * @returns Tidspunktet for sist synkronisering mot PREG, HRP og FLR
     */
    DataManagerService.prototype.getSyncTimesAsync = function () {
        if (this.syncTimes)
            return of_1.of(this.syncTimes);
        return this.getSyncTimes();
    };
    DataManagerService.prototype.getSyncTimes = function () {
        var _this = this;
        return this.apiService.latestSynchronization().map(function (res) {
            _this.syncTimes = res;
            return res;
        });
    };
    DataManagerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService, mediator_service_1.MediatorService, user_manager_service_1.UserManagerService])
    ], DataManagerService);
    return DataManagerService;
}());
exports.DataManagerService = DataManagerService;
//# sourceMappingURL=data-manager.service.js.map
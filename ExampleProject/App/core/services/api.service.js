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
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var of_1 = require("rxjs/observable/of");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var mediator_service_1 = require("./mediator.service");
var UtilityModels_1 = require("../../models/UtilityModels");
var endpoints = require("../../resources/api-routes");
/**
 * Håndterer alle api-kall til serveren
 */
var ApiService = (function () {
    function ApiService(http, toastr, mediator) {
        this.http = http;
        this.toastr = toastr;
        this.mediator = mediator;
    }
    /**
     * Kaller server for å utføre personsøk
     * @param query
     */
    ApiService.prototype.personSearch = function (query) {
        return this.http.post(endpoints.apiPersonSearch(query.searchParameters.environment), query);
    };
    /**
     * Kaller server for å utføre virksomhetssøk
     * @param query
     */
    ApiService.prototype.buisnessSearch = function (query) {
        return this.http.post(endpoints.apiBusinessSearch(query.searchParameters.environment), query);
    };
    /**
     * Henter inn oppsatte varslinger for brukerens prosjekt
     */
    ApiService.prototype.getSurveillanceForProject = function () {
        return this.http.get(endpoints.apiProjectSurveillance);
    };
    //Surveillances
    /**
     * Registerer ny varsling på person
     * @param url
     * @param body Personens nåværende verdier
     */
    ApiService.prototype.postSurveillance = function (url, body) {
        return this.http.post("" + url, JSON.stringify(body), { headers: new http_1.HttpHeaders().set('Content-Type', 'application/json') });
    };
    /**
     * Fjerner en varsling av en person
     * @param url
     */
    ApiService.prototype.deleteSurveillance = function (url) {
        return this.http.delete("" + url);
    };
    ApiService.prototype.acceptChanges = function (url, body) {
        return this.http.put(url, JSON.stringify(body), { headers: new http_1.HttpHeaders().set('Content-Type', 'application/json') });
    };
    // Person details
    /**
     * Henter inn detaljer (PREG, HRP, FLR, Difi json osv.) for person i søkeresultat
     * @param person
     */
    ApiService.prototype.getPersonDetails = function (person) {
        return this.http.post(endpoints.apiPersonDetail, person);
    };
    /**
     * Henter inn detaljer (AR, BedReg, Htk, Resh json osv.) for virksomhet i søkeresultat
     * @param person
     */
    ApiService.prototype.getBusinessDetails = function (person) {
        return this.http.post(endpoints.apiBusinessDetail, person);
    };
    /**
     * Henter inn familien til personen med angitt Nin
     * @param nin Nin til personen man ønsker å hente familen til.
     */
    ApiService.prototype.getFamily = function (nin) {
        var url = endpoints.apiGetFamily.concat(nin);
        return this.http.get(url);
    };
    ApiService.prototype.getFilters = function (index) {
        return this.http.get(endpoints.apiGetFilters(index));
    };
    //User
    ApiService.prototype.getUser = function () {
        return this.http.get(endpoints.apiGetUser);
    };
    ApiService.prototype.isLoggedIn = function () {
        return this.http.get(endpoints.apiIsLoggedIn);
    };
    ApiService.prototype.logIn = function (data) {
        return this.http.post(endpoints.apiLogIn, data);
    };
    ApiService.prototype.logOut = function () {
        return this.http.get(endpoints.apiLogOut);
    };
    ApiService.prototype.createUser = function (user) {
        return this.http.post(endpoints.apiCreateUser, user);
    };
    ApiService.prototype.updateUser = function (user) {
        return this.http.put(endpoints.apiUpdateUser, user);
    };
    ApiService.prototype.updateRegisterUser = function (form) {
        return this.http.post(endpoints.apiUpdateRegisterUser, form);
    };
    ApiService.prototype.hasValidRegisterUser = function () {
        var _this = this;
        return this.http.get(endpoints.apiHasValidRegisterUser).catch(function (error) {
            console.log("Got error in api service");
            _this.customeErrorHandling(new UtilityModels_1.ErrorMessage("Kunne ikke oppnå kontakt med RegisterPlattformen"));
            return of_1.of(false);
        });
    };
    ApiService.prototype.checkRegisterUser = function (form) {
        return this.http.post(endpoints.apiCheckRegisterUser, form);
    };
    ApiService.prototype.getIndexedProjectSurveillances = function (projectid) {
        return this.simpleGetRequest(endpoints.apiIndexedProjectSurveillance.concat(String(projectid)));
    };
    ApiService.prototype.validUserInformation = function () {
        return this.http.get(endpoints.apiValidUserInformation);
    };
    ApiService.prototype.generateNewPassword = function (username) {
        return this.http.get(endpoints.apiGenerateNewPassword.concat(username));
    };
    // Tags
    ApiService.prototype.getTags = function () {
        return this.simpleGetRequest(endpoints.apiGetTags);
    };
    ApiService.prototype.addTag = function (id, tag, index) {
        return this.http.put(endpoints.apiUpdateTag.concat("?commonIdentifier=" + id + "&tag=" + tag + "&index=" + UtilityModels_1.HodorIndexes[index]), {});
    };
    ApiService.prototype.removeTag = function (id, tag, index) {
        return this.http.delete(endpoints.apiUpdateTag.concat("?commonIdentifier=" + id + "&tag=" + tag + "&index=" + UtilityModels_1.HodorIndexes[index]));
    };
    ApiService.prototype.deleteTag = function (tag) {
        return this.http.delete(endpoints.apiDeleteTag.concat("?tag=" + tag)).catch(this.handleHttpError);
    };
    // Saved search
    ApiService.prototype.saveSearch = function (search) {
        return this.http.post(endpoints.apiSavedSearches, search).catch(this.handleHttpError);
    };
    ApiService.prototype.deleteSearch = function (search) {
        return this.http.delete(endpoints.apiSavedSearches.concat("?dbname=" + search.dbName)).catch(this.handleHttpError);
    };
    ApiService.prototype.getSavedSearches = function () {
        return this.simpleGetRequest(endpoints.apiSavedSearches);
    };
    // Comments 
    ApiService.prototype.addComment = function (comment) {
        return this.http.post(endpoints.apiComments, comment).catch(this.handleHttpError);
    };
    ApiService.prototype.removeComment = function (comment) {
        return this.http.delete(endpoints.apiComments
            .concat("?key=" + comment.key + "&commonIdentifier=" + comment.commonIdentifier)).catch(this.handleHttpError);
    };
    ApiService.prototype.getAllComments = function () {
        return this.simpleGetRequest(endpoints.apiComments);
    };
    //Misc
    ApiService.prototype.latestSynchronization = function () {
        return this.simpleGetRequest(endpoints.apiLastestSync);
    };
    ApiService.prototype.simpleGetRequest = function (url, callback) {
        return this.http.get(url);
    };
    ApiService.prototype.simplePostRequest = function (url, data, callback) {
        return this.http.post(url, data);
    };
    ApiService.prototype.asyncPostRequest = function (url, data, callback) {
        return this.http.post(url, data);
    };
    ApiService.prototype.handleHttpError = function (error) {
        var errMsg = error.message ? error.message : error.toString();
        console.error(errMsg);
        this.toastr.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ApiService.prototype.customeErrorHandling = function (error) {
        this.mediator.setErrorMessage(error);
    };
    ApiService.prototype.handleError = function (error) {
        var friendlyMessage = "";
        //if error.status is not set it's an error from angular http
        if (!error.status) {
            console.log("Got error when doing http server call in api.service.ts: ");
            console.log(error.message || error);
            return Promise.reject("Noe gikk galt da websiden prøvde å kommunisere med server");
        }
        if (error.status === 404)
            friendlyMessage = "Oppnår ikke kontakt med tjener. Prøv igjen senere";
        return Promise.reject(friendlyMessage || error.status + " " + error.statusText);
    };
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, ng2_toastr_1.ToastsManager, mediator_service_1.MediatorService])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map
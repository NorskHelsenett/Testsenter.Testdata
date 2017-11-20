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
var of_1 = require("rxjs/observable/of");
var api_service_1 = require("./api.service");
var mediator_service_1 = require("./mediator.service");
var app_settings_1 = require("../../resources/app-settings");
/**
 * Servicen håndterer alt av brukerdata samt inn- og utlogging
 */
var UserManagerService = (function () {
    function UserManagerService(apiService, mediatorService) {
        this.apiService = apiService;
        this.mediatorService = mediatorService;
    }
    UserManagerService.prototype.checkIfLoginIsValid = function (username, password) {
        return this.apiService.logIn({ userName: username, password: password });
    };
    UserManagerService.prototype.setUser = function (user) {
        this.userData = user;
        if (user === undefined || user === null)
            return;
        this.userData.password = "";
        this.userData.oldPassword = "";
        this.mediatorService.pushUserInfo(user);
    };
    UserManagerService.prototype.setUserApiKey = function (key) {
        if (this.userData == undefined)
            return;
        this.userData.searchApiKey = key;
    };
    UserManagerService.prototype.getUserDetailsFromServer = function () {
        var _this = this;
        return this.apiService.getUser().map(function (res) {
            if (res === {}) {
                return;
            }
            _this.setUser(res);
            return res;
        });
    };
    UserManagerService.prototype.setValidRegisterUser = function (value) {
        this.validRegisterUser = value;
    };
    UserManagerService.prototype.setRegisterUsername = function (username) {
        this.userData.registerUserName = username;
    };
    UserManagerService.prototype.getProjects = function () {
        return app_settings_1.projectNames;
    };
    UserManagerService.prototype.getRoles = function () {
        return app_settings_1.roleNames;
    };
    UserManagerService.prototype.getProjectIdAsync = function () {
        if (this.userData)
            return of_1.of(this.userData.projectValue);
        return this.getUser().map(function (user) { return user.projectValue; });
    };
    UserManagerService.prototype.getProjectId = function () {
        if (this.userData == undefined)
            return -1;
        return this.userData.projectValue;
    };
    UserManagerService.prototype.getUserNameAsync = function () {
        if (this.userData)
            return of_1.of(this.userData.username);
        return this.getUser().map(function (data) { return data.username; });
    };
    UserManagerService.prototype.getUserName = function () {
        return this.userData ? this.userData.username : "";
    };
    UserManagerService.prototype.getName = function () {
        return this.userData == undefined ? "" : this.userData.name;
    };
    UserManagerService.prototype.getNameAsync = function () {
        if (this.userData)
            return of_1.of(this.userData.name);
        return this.getUser().map(function (data) { return data.name; });
    };
    UserManagerService.prototype.getApiKeyAsync = function () {
        if (this.userData)
            return of_1.of(this.userData.searchApiKey);
        return this.getUser().map(function (data) { return data.searchApiKey; });
    };
    UserManagerService.prototype.isLoggedIn = function () {
        if (this.userData)
            return of_1.of(true);
        return this.apiService.isLoggedIn();
    };
    UserManagerService.prototype.getRegisterUsername = function () {
        return this.getUser().map(function (user) {
            if (user)
                return user.registerUserName;
            return "";
        });
    };
    UserManagerService.prototype.hasValidRegisterUser = function () {
        return this.apiService.hasValidRegisterUser();
    };
    UserManagerService.prototype.hasValidUserInformation = function () {
        return this.apiService.validUserInformation();
    };
    UserManagerService.prototype.updateRegisterUser = function (form) {
        return this.apiService.updateRegisterUser(form);
    };
    UserManagerService.prototype.checkRegisterUser = function (form) {
        return this.apiService.checkRegisterUser(form);
    };
    UserManagerService.prototype.getUser = function () {
        if (this.userData !== undefined) {
            return of_1.of(this.userData);
        }
        return this.getUserDetailsFromServer();
    };
    UserManagerService.prototype.createUser = function (user) {
        return this.apiService.createUser(user);
    };
    UserManagerService.prototype.updateUser = function (user) {
        return this.apiService.updateUser(user);
    };
    UserManagerService.prototype.generateNewPassword = function (username) {
        return this.apiService.generateNewPassword(username);
    };
    UserManagerService.prototype.logOut = function () {
        return this.apiService.logOut();
    };
    UserManagerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService, mediator_service_1.MediatorService])
    ], UserManagerService);
    return UserManagerService;
}());
exports.UserManagerService = UserManagerService;
//# sourceMappingURL=user-manager.service.js.map
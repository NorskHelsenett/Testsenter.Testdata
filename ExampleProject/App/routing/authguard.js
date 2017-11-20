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
var router_1 = require("@angular/router");
var user_manager_service_1 = require("../core/services/user-manager.service");
/**
 * Sjekker om en bruker har alle informasjon fyllt ut, hvis ikke blir brukeren omdirkert til endre bruker siden
 */
var ValidInformationGuard = (function () {
    function ValidInformationGuard(userManagerService, router) {
        this.userManagerService = userManagerService;
        this.router = router;
    }
    ValidInformationGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.userManagerService.hasValidUserInformation().map(function (user) {
            if (!user) {
                _this.router.navigateByUrl("/adduserinformation");
                return false;
            }
            return true;
        }, function (error) { return console.log("Got error from backend"); });
    };
    ValidInformationGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService, router_1.Router])
    ], ValidInformationGuard);
    return ValidInformationGuard;
}());
exports.ValidInformationGuard = ValidInformationGuard;
/**
 * Sjekker om en bruker er logget inn
 */
var LoggedInGuard = (function () {
    function LoggedInGuard(userManagerService, router) {
        this.userManagerService = userManagerService;
        this.router = router;
    }
    LoggedInGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.userManagerService.isLoggedIn().map(function (res) {
            if (!res) {
                _this.router.navigateByUrl('/login/');
                return false;
            }
            return true;
        }, function (Error) { return console.log("Got error from backend"); });
    };
    LoggedInGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService, router_1.Router])
    ], LoggedInGuard);
    return LoggedInGuard;
}());
exports.LoggedInGuard = LoggedInGuard;
/**
 * Sjekker om bruker har gyldig registerbruker
 */
var RegisterGuard = (function () {
    function RegisterGuard(userManagerService, router) {
        this.userManagerService = userManagerService;
        this.router = router;
    }
    RegisterGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.userManagerService.hasValidRegisterUser().map(function (res) {
            _this.userManagerService.setValidRegisterUser(res);
            if (!res) {
                _this.router.navigateByUrl("/invalidregisteruser");
                return false;
            }
            return true;
        }, function (error) { return console.log("Got error from backend"); });
    };
    RegisterGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService, router_1.Router])
    ], RegisterGuard);
    return RegisterGuard;
}());
exports.RegisterGuard = RegisterGuard;
/**
 * Sjekker om bruker har tilgang til endre registerbruker siden
 */
var ChangeRegisterUserGuard = (function () {
    function ChangeRegisterUserGuard(userManagerService, router) {
        this.userManagerService = userManagerService;
        this.router = router;
    }
    ChangeRegisterUserGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.userManagerService.hasValidRegisterUser().map(function (res) {
            if (res) {
                _this.router.navigateByUrl("");
                return false;
            }
            return true;
        }, function (error) { return console.log("Got error from backend"); });
    };
    ChangeRegisterUserGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService, router_1.Router])
    ], ChangeRegisterUserGuard);
    return ChangeRegisterUserGuard;
}());
exports.ChangeRegisterUserGuard = ChangeRegisterUserGuard;
//# sourceMappingURL=authguard.js.map
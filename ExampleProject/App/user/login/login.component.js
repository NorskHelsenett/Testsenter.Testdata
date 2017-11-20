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
var user_manager_service_1 = require("../../core/services/user-manager.service");
var formvalidators_1 = require("../../helpers/formvalidators");
var LoginComponent = (function () {
    function LoginComponent(router, userManager, route) {
        this.router = router;
        this.userManager = userManager;
        this.route = route;
        this.errorMessage = "";
        this.epostMessage = "";
        this.passwordMessage = "";
        this.epost = "";
        this.password = "";
        this.validEpost = true;
        this.validPassword = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.createsuccess = params["state"] === "createsuccess";
            _this.newpasswordsuccess = params["state"] === "newpasswordsuccess";
        });
    };
    LoginComponent.prototype.newUser = function () {
        this.router.navigate(["createuser"]);
    };
    LoginComponent.prototype.onSubmit = function () {
        if (this.checkInput()) {
            this.loading = true;
            this.login();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.userManager.checkIfLoginIsValid(this.epost, this.password).subscribe(function (res) {
            if (res === "success")
                _this.router.navigate([""]);
            else {
                _this.loading = false;
                _this.errorMessage = res;
                _this.updateMessages();
            }
        });
    };
    LoginComponent.prototype.checkInput = function () {
        this.errorMessage = "";
        this.updateMessages();
        return this.checkEpost() && this.checkPassword();
    };
    LoginComponent.prototype.checkEpost = function () {
        this.validEpost = formvalidators_1.validateEmail(this.epost);
        this.epostMessage = this.validEpost ? "" : "Vennligst skriv inn en gylid epostadresse";
        this.updateMessages();
        return this.validEpost;
    };
    LoginComponent.prototype.checkPassword = function () {
        this.validPassword = this.password.length > 0;
        this.passwordMessage = this.validPassword ? "" : "Vennligst fyll inn et passord";
        this.updateMessages();
        return this.validPassword;
    };
    LoginComponent.prototype.updateMessages = function () {
        this.messages = this.errorMessage.length > 0 || this.epostMessage.length > 0 || this.passwordMessage.length > 0;
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "login",
            moduleId: module.id,
            templateUrl: "login.component.html",
            styleUrls: ["login.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, user_manager_service_1.UserManagerService, router_1.ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
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
var formvalidators_1 = require("../../helpers/formvalidators");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var ForgottenPasswordComponent = (function () {
    function ForgottenPasswordComponent(router, userManagerService) {
        this.router = router;
        this.userManagerService = userManagerService;
        this.validUsername = true;
    }
    ForgottenPasswordComponent.prototype.cancel = function () {
        this.router.navigateByUrl("");
    };
    ForgottenPasswordComponent.prototype.generateNewPassword = function () {
        var _this = this;
        this.checkValidUsername();
        if (this.validUsername)
            this.loading = true;
        this.userManagerService.generateNewPassword(this.username).subscribe(function (res) {
            _this.loading = false;
            if (res === "success") {
                _this.router.navigate(["/login/", "newpasswordsuccess"]);
            }
            else {
                _this.errorMessage = res;
            }
        });
    };
    ForgottenPasswordComponent.prototype.checkValidUsername = function () {
        this.validUsername = formvalidators_1.validateEmail(this.username);
    };
    ForgottenPasswordComponent = __decorate([
        core_1.Component({
            selector: 'forgotten-password',
            moduleId: module.id,
            templateUrl: 'forgotten-password.component.html',
            styleUrls: ['../user.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, user_manager_service_1.UserManagerService])
    ], ForgottenPasswordComponent);
    return ForgottenPasswordComponent;
}());
exports.ForgottenPasswordComponent = ForgottenPasswordComponent;
//# sourceMappingURL=forgotten-password.component.js.map
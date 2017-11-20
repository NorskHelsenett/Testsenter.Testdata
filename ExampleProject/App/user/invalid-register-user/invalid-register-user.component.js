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
var InvalidRegisterUserComponent = (function () {
    function InvalidRegisterUserComponent(userManagerService, router) {
        this.userManagerService = userManagerService;
        this.router = router;
    }
    InvalidRegisterUserComponent.prototype.onSuccess = function () {
        this.router.navigateByUrl("");
    };
    InvalidRegisterUserComponent.prototype.onCancel = function () {
        var _this = this;
        this.userManagerService.logOut().subscribe(function (res) {
            _this.userManagerService.setUser(undefined);
            _this.router.navigateByUrl("/login/");
        });
    };
    InvalidRegisterUserComponent = __decorate([
        core_1.Component({
            selector: 'invalid-register-user',
            moduleId: module.id,
            templateUrl: 'invalid-register-user.component.html',
            styleUrls: ['../user.component.css']
        }),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService, router_1.Router])
    ], InvalidRegisterUserComponent);
    return InvalidRegisterUserComponent;
}());
exports.InvalidRegisterUserComponent = InvalidRegisterUserComponent;
//# sourceMappingURL=invalid-register-user.component.js.map
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
var DataModels_1 = require("../../models/DataModels");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var CreateUserComponent = (function () {
    function CreateUserComponent(router, userManagerService) {
        this.router = router;
        this.userManagerService = userManagerService;
        this.userData = new DataModels_1.UserData;
    }
    CreateUserComponent.prototype.onRegisterSuccess = function (registerUser) {
        this.registerUser = registerUser;
        this.hasValidRegisterUser = true;
    };
    CreateUserComponent.prototype.onCancel = function () {
        var _this = this;
        this.userManagerService.logOut().subscribe(function () {
            _this.router.navigateByUrl("/login/");
        });
    };
    CreateUserComponent.prototype.onUserDetailsSuccess = function (user) {
        var _this = this;
        this.usercreateloading = true;
        user.registerPassword = this.registerUser.password;
        user.registerUserName = this.registerUser.userName;
        this.userManagerService.createUser(user).subscribe(function (res) {
            _this.usercreateloading = false;
            if (res === "success") {
                _this.router.navigate(["/createusersuccess"]);
            }
            else {
                _this.userCreateError = res;
            }
        });
    };
    CreateUserComponent.prototype.onUserDetailsCancel = function () {
        this.router.navigateByUrl("/login/");
    };
    CreateUserComponent = __decorate([
        core_1.Component({
            selector: 'create-user',
            moduleId: module.id,
            templateUrl: 'create-user.component.html',
            styleUrls: ['../user.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, user_manager_service_1.UserManagerService])
    ], CreateUserComponent);
    return CreateUserComponent;
}());
exports.CreateUserComponent = CreateUserComponent;
//# sourceMappingURL=create-user.component.js.map
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
var RegisterUserComponent = (function () {
    function RegisterUserComponent(userManagerService, router) {
        this.userManagerService = userManagerService;
        this.router = router;
        this.onSuccess = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.validUsername = true;
        this.validPassword = true;
        this.savedData = new DataModels_1.LoginSubmission();
        this.data = new DataModels_1.LoginSubmission();
    }
    RegisterUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.isNewUser) {
            this.loading = true;
            this.userManagerService.getRegisterUsername().subscribe(function (res) {
                _this.loading = false;
                _this.savedData.userName = res;
                _this.data = _this.savedData;
                _this.userManagerService.hasValidRegisterUser().subscribe(function (res) {
                    _this.loading = false;
                    _this.hasValidRegisterUser = res;
                });
            });
        }
    };
    RegisterUserComponent.prototype.checkRegisterUser = function (data) {
        var _this = this;
        if (data === void 0) { data = this.data; }
        this.checkValidUsername();
        this.checkPassword();
        if (!this.validUsername || !this.validPassword)
            return;
        this.loading = true;
        if (this.isNewUser) {
            this.userManagerService.checkRegisterUser(this.data).subscribe(function (res) {
                _this.loading = false;
                if (res) {
                    _this.hasValidRegisterUser = true;
                    _this.showRegisterContent = false;
                    _this.onSuccess.emit(_this.data);
                }
                _this.failed = !res;
            });
        }
        else {
            this.userManagerService.updateRegisterUser(this.data).subscribe(function (res) {
                _this.loading = false;
                if (res) {
                    _this.hasValidRegisterUser = true;
                    _this.showRegisterContent = false;
                    _this.savedData.userName = _this.data.userName;
                    _this.userManagerService.setRegisterUsername(_this.data.userName);
                    _this.onSuccess.emit(_this.data);
                }
                _this.failed = !res;
            });
        }
    };
    RegisterUserComponent.prototype.checkPassword = function (data) {
        if (data === void 0) { data = this.data; }
        this.validPassword = (data.password !== undefined && data.password.length > 0);
    };
    RegisterUserComponent.prototype.checkValidUsername = function () {
        this.validUsername = (this.data.userName !== undefined && this.data.userName.length > 0);
    };
    RegisterUserComponent.prototype.cancelRegisterUser = function () {
        this.showRegisterContent = false;
        this.onCancel.emit(this.savedData.userName);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RegisterUserComponent.prototype, "onSuccess", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RegisterUserComponent.prototype, "onCancel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RegisterUserComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RegisterUserComponent.prototype, "showRegisterContent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RegisterUserComponent.prototype, "isNewUser", void 0);
    RegisterUserComponent = __decorate([
        core_1.Component({
            selector: 'register-user',
            moduleId: module.id,
            templateUrl: 'register-user.component.html',
            styleUrls: ['../user.component.css']
        }),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService, router_1.Router])
    ], RegisterUserComponent);
    return RegisterUserComponent;
}());
exports.RegisterUserComponent = RegisterUserComponent;
//# sourceMappingURL=register-user.component.js.map
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
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var UpdateUserComponent = (function () {
    function UpdateUserComponent(router, userManagerService, toastr) {
        this.router = router;
        this.userManagerService = userManagerService;
        this.toastr = toastr;
    }
    UpdateUserComponent.prototype.onRegisterSuccess = function (user) {
        this.toastr.success("Din registerbruker er nå oppdatert");
        this.userManagerService.setRegisterUsername(user.userName);
    };
    UpdateUserComponent.prototype.onRegisterCancel = function () {
        this.showRegisterContent = false;
    };
    UpdateUserComponent.prototype.onUserDetailsSuccess = function (user) {
        var _this = this;
        this.userdetailloading = true;
        this.userManagerService.updateUser(user).subscribe(function (res) {
            _this.userdetailloading = false;
            if (res === "success") {
                _this.userManagerService.setUser(user);
                _this.toastr.success("Dine brukerdetaljer er nå oppdatert");
                _this.router.navigateByUrl("");
            }
            else {
                _this.errorMessage = res;
            }
        });
    };
    UpdateUserComponent.prototype.onUserDetailsCancel = function () {
        if (this.router.url === "/adduserinformation")
            this.router.navigateByUrl("/login/");
        else
            this.router.navigateByUrl("");
    };
    UpdateUserComponent = __decorate([
        core_1.Component({
            selector: 'update-user',
            moduleId: module.id,
            templateUrl: 'update-user.component.html',
            styleUrls: ['../user.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, user_manager_service_1.UserManagerService, ng2_toastr_1.ToastsManager])
    ], UpdateUserComponent);
    return UpdateUserComponent;
}());
exports.UpdateUserComponent = UpdateUserComponent;
//# sourceMappingURL=update-user.component.js.map
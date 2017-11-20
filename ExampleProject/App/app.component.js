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
var mediator_service_1 = require("./core/services/mediator.service");
var user_manager_service_1 = require("./core/services/user-manager.service");
var AppComponent = (function () {
    function AppComponent(router, mediatorService, toastr, vcRef, userManager) {
        this.router = router;
        this.mediatorService = mediatorService;
        this.toastr = toastr;
        this.vcRef = vcRef;
        this.userManager = userManager;
        this.toastr.setRootViewContainerRef(vcRef);
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            moduleId: module.id,
            templateUrl: "app.component.html",
            styleUrls: ["app.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, mediator_service_1.MediatorService,
            ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, user_manager_service_1.UserManagerService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
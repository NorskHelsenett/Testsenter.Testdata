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
var UtilityModels_1 = require("../../models/UtilityModels");
var router_1 = require("@angular/router");
var mediator_service_1 = require("../services/mediator.service");
var user_manager_service_1 = require("../services/user-manager.service");
var TitleComponent = (function () {
    function TitleComponent(router, mediatorService, userManager) {
        var _this = this;
        this.router = router;
        this.mediatorService = mediatorService;
        this.userManager = userManager;
        this.pages = [UtilityModels_1.ChildViews.Dashboard, UtilityModels_1.ChildViews.Search, UtilityModels_1.ChildViews.Surveillance];
        this.childviews = UtilityModels_1.ChildViews;
        this.activePage = UtilityModels_1.ChildViews.Dashboard;
        mediatorService.changeMainView$.subscribe(function (view) { return _this.switchView(view); });
    }
    TitleComponent.prototype.showUserStatus = function () {
        return this.router.url === "/";
    };
    TitleComponent.prototype.changePage = function (page) {
        this.activePage = page;
        this.mediatorService.changeMainView(page);
    };
    TitleComponent.prototype.switchView = function (view) {
        this.activePage = view;
    };
    TitleComponent = __decorate([
        core_1.Component({
            selector: "app-title",
            moduleId: module.id,
            templateUrl: "title.component.html",
            styleUrls: ["title.component.css"],
        }),
        __metadata("design:paramtypes", [router_1.Router, mediator_service_1.MediatorService,
            user_manager_service_1.UserManagerService])
    ], TitleComponent);
    return TitleComponent;
}());
exports.TitleComponent = TitleComponent;
//# sourceMappingURL=title.component.js.map
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
var mediator_service_1 = require("../../services/mediator.service");
var user_manager_service_1 = require("../../services/user-manager.service");
var DataModels_1 = require("../../../models/DataModels");
var projectname_pipe_1 = require("../../../shared/shared-pipes/projectname.pipe");
var UserInformationComponent = (function () {
    function UserInformationComponent(mediatorService, userManagerService, router) {
        this.mediatorService = mediatorService;
        this.userManagerService = userManagerService;
        this.router = router;
    }
    UserInformationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = new DataModels_1.UserData();
        this.mediatorService.userInfo$
            .subscribe(function (user) {
            if (user) {
                _this.user = user;
            }
        });
    };
    Object.defineProperty(UserInformationComponent.prototype, "loading", {
        get: function () {
            return this.user.name === undefined ? "active" : "";
        },
        enumerable: true,
        configurable: true
    });
    UserInformationComponent.prototype.logOut = function () {
        var _this = this;
        this.userManagerService.logOut().subscribe(function (res) {
            _this.userManagerService.setUser(undefined);
            _this.router.navigateByUrl("/login/");
        });
    };
    UserInformationComponent.prototype.navigateToUser = function () {
        this.router.navigate(['changeuser']);
    };
    UserInformationComponent = __decorate([
        core_1.Component({
            selector: 'user-information',
            moduleId: module.id,
            templateUrl: 'user-information.component.html',
            styleUrls: ['user-information.component.css'],
            providers: [projectname_pipe_1.ProjectNamePipe]
        }),
        __metadata("design:paramtypes", [mediator_service_1.MediatorService, user_manager_service_1.UserManagerService, router_1.Router])
    ], UserInformationComponent);
    return UserInformationComponent;
}());
exports.UserInformationComponent = UserInformationComponent;
//# sourceMappingURL=user-information.component.js.map
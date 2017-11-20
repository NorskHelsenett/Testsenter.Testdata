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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var user_manager_service_1 = require("./services/user-manager.service");
var api_service_1 = require("./services/api.service");
var search_manager_service_1 = require("./services/search-manager.service");
var mediator_service_1 = require("./services/mediator.service");
var filter_manager_service_1 = require("./services/filter-manager.service");
var data_manager_service_1 = require("./services/data-manager.service");
var title_component_1 = require("./title/title.component");
var user_information_component_1 = require("./title/user-information/user-information.component");
var shared_module_1 = require("../shared/shared.module");
var comments_manager_service_1 = require("./services/comments-manager.service");
var codes_manager_service_1 = require("./services/codes-manager.service");
var CoreModule = (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_module_1.SharedModule],
            declarations: [title_component_1.TitleComponent, user_information_component_1.UserInformationComponent],
            exports: [title_component_1.TitleComponent],
            providers: [user_manager_service_1.UserManagerService, api_service_1.ApiService, filter_manager_service_1.FilterManagerService, search_manager_service_1.SearchManagerService, mediator_service_1.MediatorService, data_manager_service_1.DataManagerService, comments_manager_service_1.CommentsManagerService, codes_manager_service_1.CodeManagerService]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map
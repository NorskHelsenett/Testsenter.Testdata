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
var mediator_service_1 = require("../../core/services/mediator.service");
var ApiKeyComponent = (function () {
    function ApiKeyComponent(mediator) {
        this.mediator = mediator;
    }
    ApiKeyComponent.prototype.ngOnInit = function () {
        this.key = this.mediator.userInfo$.map(function (user) { return user.searchApiKey; });
    };
    ApiKeyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "apikey",
            templateUrl: "apikey-tile.component.html",
            styleUrls: ["../dashboard.component.css"]
        }),
        __metadata("design:paramtypes", [mediator_service_1.MediatorService])
    ], ApiKeyComponent);
    return ApiKeyComponent;
}());
exports.ApiKeyComponent = ApiKeyComponent;
//# sourceMappingURL=apikey-tile.component.js.map
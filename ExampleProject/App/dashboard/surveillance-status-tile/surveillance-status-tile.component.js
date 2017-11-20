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
var data_manager_service_1 = require("../../core/services/data-manager.service");
var mediator_service_1 = require("../../core/services/mediator.service");
var SurveillanceStatusTileComponent = (function () {
    function SurveillanceStatusTileComponent(dataManagerService, mediatorService) {
        this.dataManagerService = dataManagerService;
        this.mediatorService = mediatorService;
        this.load = true;
    }
    Object.defineProperty(SurveillanceStatusTileComponent.prototype, "loading", {
        get: function () {
            return this.load ? "active" : "";
        },
        enumerable: true,
        configurable: true
    });
    SurveillanceStatusTileComponent.prototype.showSurveillences = function () {
        this.mediatorService.changeMainView(UtilityModels_1.ChildViews.Surveillance);
    };
    SurveillanceStatusTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.status = new UtilityModels_1.SurveillanceInformation;
        this.dataManagerService.surveillanceStatus$.subscribe(function (data) {
            _this.load = false;
            _this.status = data;
        });
    };
    SurveillanceStatusTileComponent = __decorate([
        core_1.Component({
            selector: "surveillance-status-tile",
            moduleId: module.id,
            templateUrl: "surveillance-status-tile.component.html",
            styleUrls: ["surveillance-status-tile.component.css"]
        }),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService, mediator_service_1.MediatorService])
    ], SurveillanceStatusTileComponent);
    return SurveillanceStatusTileComponent;
}());
exports.SurveillanceStatusTileComponent = SurveillanceStatusTileComponent;
//# sourceMappingURL=surveillance-status-tile.component.js.map
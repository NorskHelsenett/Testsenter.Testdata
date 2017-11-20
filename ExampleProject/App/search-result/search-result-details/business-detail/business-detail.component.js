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
var DataModels_1 = require("../../../models/DataModels");
var UtilityModels_1 = require("../../../models/UtilityModels");
var api_service_1 = require("../../../core/services/api.service");
var data_manager_service_1 = require("../../../core/services/data-manager.service");
var BusinessDetailComponent = (function () {
    function BusinessDetailComponent(apiService, dataManagerService) {
        this.apiService = apiService;
        this.dataManagerService = dataManagerService;
        this.currentView = UtilityModels_1.ChildViews.None;
        this.childViews = UtilityModels_1.ChildViews;
        this.newTag = new core_1.EventEmitter();
        this.removeTag = new core_1.EventEmitter();
    }
    BusinessDetailComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.checkInformation();
        this.commonid = this.business.commonIdentifier;
        console.log(this.business);
        this.dataManagerService.tags$.subscribe(function (tags) {
            _this.tags = tags;
        });
    };
    BusinessDetailComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $("#" + this.commonid + " .menu .item").tab({
            context: $("#" + this.commonid)
        });
        if (this.business.tags != undefined) {
            $("#" + this.commonid + "-dropdown").dropdown("set selected", this.getTagNames(this.business.tags));
        }
        $("#" + this.commonid + "-dropdown")
            .dropdown({
            allowAdditions: true,
            forceSelection: false,
            onAdd: function (value, text) {
                _this.newTag.emit(text);
                _this.dataManagerService.addTag(text, String(_this.commonid), _this.business, UtilityModels_1.HodorIndexes.Business);
            },
            onRemove: function (value, text) {
                _this.removeTag.emit(text);
                _this.dataManagerService.removeTag(text, String(_this.commonid), _this.business, UtilityModels_1.HodorIndexes.Business);
            }
        });
    };
    BusinessDetailComponent.prototype.getTagNames = function (tags) {
        var _this = this;
        return tags.map(function (t) { return _this.dataManagerService.getTagName(t); });
    };
    BusinessDetailComponent.prototype.showDetails = function (event) {
        switch (event.view) {
            case UtilityModels_1.ChildViews.Json:
                if (this.currentHit === event.data && this.currentView === UtilityModels_1.ChildViews.Json) {
                    this.currentView = UtilityModels_1.ChildViews.None;
                    return;
                }
                this.currentHit = event.data;
                this.currentView = UtilityModels_1.ChildViews.Json;
                break;
            default:
                break;
        }
    };
    BusinessDetailComponent.prototype.closeDetails = function (view) {
        this.currentView = view;
    };
    BusinessDetailComponent.prototype.checkInformation = function () {
        this.containsBedRegInformation = this.business.detail.bedRegJson != undefined;
        this.containsArInformation = this.business.detail.arJson != undefined;
        this.containsFlrInformation = this.business.detail.flrJson != undefined;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", DataModels_1.RegisterBusiness)
    ], BusinessDetailComponent.prototype, "business", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BusinessDetailComponent.prototype, "newTag", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BusinessDetailComponent.prototype, "removeTag", void 0);
    BusinessDetailComponent = __decorate([
        core_1.Component({
            selector: "business-detail",
            moduleId: module.id,
            templateUrl: "business-detail.component.html",
            styleUrls: ["business-detail.component.css"]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService, data_manager_service_1.DataManagerService])
    ], BusinessDetailComponent);
    return BusinessDetailComponent;
}());
exports.BusinessDetailComponent = BusinessDetailComponent;
//# sourceMappingURL=business-detail.component.js.map
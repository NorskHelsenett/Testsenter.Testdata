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
var familymodels_1 = require("../../../shared/detailedWindow/family/familymodels");
var UtilityModels_1 = require("../../../models/UtilityModels");
var api_service_1 = require("../../../core/services/api.service");
var data_manager_service_1 = require("../../../core/services/data-manager.service");
var PersonDetailComponent = (function () {
    function PersonDetailComponent(apiService, dataManagerService) {
        this.apiService = apiService;
        this.dataManagerService = dataManagerService;
        this.currentView = UtilityModels_1.ChildViews.None;
        this.childViews = UtilityModels_1.ChildViews;
        this.newTag = new core_1.EventEmitter();
        this.removeTag = new core_1.EventEmitter();
    }
    PersonDetailComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.checkInformation();
        this.commonid = this.person.commonIdentifier;
        this.dataManagerService.tags$.subscribe(function (tags) {
            _this.tags = tags;
        });
    };
    PersonDetailComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $("#" + this.commonid + " .menu .item").tab({
            context: $("#" + this.commonid)
        });
        if (this.person.tags != undefined) {
            $("#" + this.commonid + "-dropdown").dropdown("set selected", this.getTagNames(this.person.tags));
        }
        $("#" + this.commonid + "-dropdown")
            .dropdown({
            allowAdditions: true,
            forceSelection: false,
            onAdd: function (value, text) {
                _this.newTag.emit(text);
                _this.dataManagerService.addTag(text, String(_this.commonid), _this.person, UtilityModels_1.HodorIndexes.Person);
            },
            onRemove: function (value, text) {
                _this.removeTag.emit(text);
                _this.dataManagerService.removeTag(text, String(_this.commonid), _this.person, UtilityModels_1.HodorIndexes.Person);
            }
        });
    };
    PersonDetailComponent.prototype.getTagNames = function (tags) {
        var _this = this;
        return tags.map(function (t) { return _this.dataManagerService.getTagName(t); });
    };
    PersonDetailComponent.prototype.checkInformation = function () {
        this.containsPersonInformation = this.person.detail.pregJson != undefined;
        this.containsProfessionalInformation = this.person.detail.hprJson != undefined;
        this.containsDifiInformation = this.person.detail.difiInformationJson != undefined;
    };
    PersonDetailComponent.prototype.getFamily = function () {
        var _this = this;
        if (this.currentView === UtilityModels_1.ChildViews.Family) {
            this.currentView = UtilityModels_1.ChildViews.None;
            return;
        }
        this.loadingFamily = true;
        this.apiService.getFamily(this.person.commonIdentifier).subscribe(function (data) {
            _this.family = new familymodels_1.Family(data);
            _this.currentView = UtilityModels_1.ChildViews.Family;
            _this.loadingFamily = false;
        }, function (error) {
            return console.log("Somthing went wrong while getting family from the server. Error: " + error);
        });
    };
    PersonDetailComponent.prototype.showDetails = function (event) {
        switch (event.view) {
            case UtilityModels_1.ChildViews.Family:
                this.getFamily();
                break;
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
    PersonDetailComponent.prototype.closeDetails = function (view) {
        this.currentView = view;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", DataModels_1.RegisterPerson)
    ], PersonDetailComponent.prototype, "person", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PersonDetailComponent.prototype, "newTag", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PersonDetailComponent.prototype, "removeTag", void 0);
    PersonDetailComponent = __decorate([
        core_1.Component({
            selector: "person-detail",
            moduleId: module.id,
            templateUrl: "person-detail.component.html",
            styleUrls: ["person-detail.component.css"]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService, data_manager_service_1.DataManagerService])
    ], PersonDetailComponent);
    return PersonDetailComponent;
}());
exports.PersonDetailComponent = PersonDetailComponent;
//# sourceMappingURL=person-detail.component.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var of_1 = require("rxjs/observable/of");
var person_base_hit_tab_1 = require("../person-base-hit-tab");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var UtilityModels_1 = require("../../../../models/UtilityModels");
var api_service_1 = require("../../../../core/services/api.service");
var mediator_service_1 = require("../../../../core/services/mediator.service");
var user_manager_service_1 = require("../../../../core/services/user-manager.service");
var registerhelper_1 = require("../../../../helpers/registerhelper");
var PersonNotificationsComponent = (function (_super) {
    __extends(PersonNotificationsComponent, _super);
    function PersonNotificationsComponent(apiService, mediatorService, toastr, userManager) {
        var _this = _super.call(this) || this;
        _this.apiService = apiService;
        _this.mediatorService = mediatorService;
        _this.toastr = toastr;
        _this.userManager = userManager;
        _this.surveillanceStatus = UtilityModels_1.SurveillanceStatus;
        return _this;
    }
    PersonNotificationsComponent.prototype.toggleSurveillance = function (surveillance) {
        var _this = this;
        this.loading = true;
        if (surveillance.isChecked) {
            var hit = this.getLatestJsonContent(surveillance.registerName);
            if (hit === "") {
                console.log("Fant ikke hit for overvåkningsgjenstand");
                return;
            }
            this.apiService.postSurveillance(surveillance.urlToToggle, hit)
                .subscribe(function (data) {
                if (data) {
                    _this.surveillanceChanged(surveillance, true);
                    if (!_this.item.surveillancesInfo) {
                        _this.item
                            .surveillancesInfo = [
                            { key: surveillance.actionKey, registeredBy: _this.userManager.getName() }
                        ];
                    }
                    else {
                        _this.item.surveillancesInfo
                            .push({ key: surveillance.actionKey, registeredBy: _this.userManager.getName() });
                    }
                    _this.toastr.success("Ditt prosjekt overvåker nå " + surveillance.actionFriendlyName);
                    _this.mediatorService.notifyAboutAddedSurveillance(_this.item);
                }
                else {
                    _this.undoChangesToSurveillanceAndPostError(surveillance, "Server ga beskjed om at overv\u00E5kning for " + surveillance.actionFriendlyName + " ikke ble sl\u00E5tt p\u00E5");
                }
            }, function (error) { return _this.undoChangesToSurveillanceAndPostError(surveillance, error); });
        }
        else {
            this.apiService.deleteSurveillance(surveillance.urlToToggle)
                .subscribe(function (data) {
                if (data) {
                    if (_this.item.latestSurveillanceResults) {
                        var index = _this.item.latestSurveillanceResults
                            .findIndex(function (result) { return result.actionKey === surveillance.actionKey; });
                        if (index)
                            _this.item.latestSurveillanceResults.splice(index, 1);
                    }
                    surveillance.latestSurveillanceResultForMyTeam = undefined;
                    var secondIndex = _this.item.surveillancesInfo.findIndex(function (sb) { return sb.key === surveillance.actionKey; });
                    if (secondIndex)
                        _this.item.surveillancesInfo.splice(secondIndex, 1);
                    _this.mediatorService.notifyAboutDeletedSurveillance(_this.item);
                    _this.surveillanceChanged(surveillance, false);
                    _this.toastr.success("Fjernet overv\u00E5kning av " + surveillance.actionFriendlyName);
                }
                else {
                    _this.undoChangesToSurveillanceAndPostError(surveillance, "Server ga beskjed om at overv\u00E5kning for " + surveillance.actionFriendlyName + " ikke ble sl\u00E5tt p\u00E5");
                }
            }, function (error) { return _this.undoChangesToSurveillanceAndPostError(surveillance, error); });
        }
        return false;
    };
    PersonNotificationsComponent.prototype.surveillanceChanged = function (surveillance, added) {
        this.loading = false;
        var team = String(this.userManager.getProjectId());
        if (added && !this.item.teams.some(function (t) { return t === team; })) {
            this.item.teams.push(team);
        }
        else if (!added) {
            if (!this.item.detail.surveillances.some(function (sur) { return sur.isChecked; }))
                this.item.teams.splice(this.item.teams.indexOf(team), 1);
        }
        registerhelper_1.setStarStatus(this.userManager.getProjectIdAsync(), this.item);
    };
    PersonNotificationsComponent.prototype.acceptChanges = function (surveillance, event) {
        var _this = this;
        event.stopPropagation();
        var hit = this.getLatestJsonContent(surveillance.registerName);
        this.accepting = true;
        this.apiService.acceptChanges(surveillance.urlToToggle, hit).subscribe(function (res) {
            _this.accepting = false;
            if (res) {
                if (_this.item.latestSurveillanceResults) {
                    var indexes = _this.item.latestSurveillanceResults
                        .filter(function (res) { return res.actionKey === surveillance.actionKey; });
                    indexes.forEach(function (i) { return i.success = true; });
                }
                _this.item.status = UtilityModels_1.SurveillanceStatus.Synced;
                if (_this.item.latestSurveillanceResults
                    .some(function (res) { return registerhelper_1.getSurveillanceResult(res) === UtilityModels_1.SurveillanceStatus.Unsynced; }))
                    _this.item.status = UtilityModels_1.SurveillanceStatus.Unsynced;
                surveillance.latestSurveillanceResultForMyTeam = undefined;
            }
        });
    };
    PersonNotificationsComponent.prototype.shouldShowAcceptButton = function (surveillance) {
        var result = surveillance.latestSurveillanceResultForMyTeam;
        if (result && !result.success) {
            return this.userManager.getNameAsync().map(function (name) { return result.registeredBy === name; });
        }
        return of_1.of(false);
    };
    PersonNotificationsComponent.prototype.undoChangesToSurveillanceAndPostError = function (surveillance, error) {
        this.loading = false;
        surveillance.isChecked = !surveillance.isChecked;
        this.handleError(error);
    };
    PersonNotificationsComponent.prototype.handleError = function (errorMessage) {
        var _this = this;
        console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.toastr.error(errorMessage);
        setTimeout(function () {
            _this.errorMessage = "";
        }, 3000);
    };
    PersonNotificationsComponent.prototype.getJsonDetailObject = function (surveillance, currentValue) {
        if (currentValue === void 0) { currentValue = true; }
        var json = currentValue ? this.getLatestJsonContent(surveillance.registerName) : surveillance.originalContentAsJson;
        if (json === "")
            return {};
        var jsonObject = this.convertToObject(json, surveillance.registerName);
        if (jsonObject == null)
            return {};
        switch (surveillance.actionKey.toLowerCase()) {
            case "pregadressing":
                return { "Addresses": jsonObject.Addresses };
            case "pregfullname":
                return { "GivenName": jsonObject.GivenName, "MiddleName": jsonObject.MiddleName, "Sn": jsonObject.Sn };
            case "hprgodkjenninger":
                return { "Godkjenninger": jsonObject.Godkjenninger };
            default:
                return {};
        }
    };
    PersonNotificationsComponent.prototype.convertToObject = function (jsonstring, registerName) {
        switch (registerName.toLowerCase()) {
            case "preg":
                return JSON.parse(jsonstring);
            case "hpr":
                return JSON.parse(jsonstring);
            default:
                return null;
        }
    };
    PersonNotificationsComponent = __decorate([
        core_1.Component({
            selector: "person-notifications",
            moduleId: module.id,
            templateUrl: "person-notifications.component.html",
            styleUrls: ["person-notifications.component.css"]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService,
            mediator_service_1.MediatorService,
            ng2_toastr_1.ToastsManager, user_manager_service_1.UserManagerService])
    ], PersonNotificationsComponent);
    return PersonNotificationsComponent;
}(person_base_hit_tab_1.PersonBaseHitTab));
exports.PersonNotificationsComponent = PersonNotificationsComponent;
//# sourceMappingURL=person-notifications.component.js.map
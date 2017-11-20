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
var api_service_1 = require("../../core/services/api.service");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var data_manager_service_1 = require("../../core/services/data-manager.service");
var SurveillanceOverviewComponent = (function () {
    function SurveillanceOverviewComponent(apiService, userManagerService, dataManagerService) {
        this.apiService = apiService;
        this.userManagerService = userManagerService;
        this.dataManagerService = dataManagerService;
        this.childViews = UtilityModels_1.ChildViews;
        this.personalSurveillances = [];
        this.projectSurveillances = [];
        this.filter = [];
        this.isEmpty = true;
    }
    SurveillanceOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataManagerService.surveillanceResults$.subscribe(function (result) {
            if (result == undefined || result.length === 0)
                return;
            _this.personalSurveillances = [];
            _this.projectSurveillances = [];
            //sort to get unsynced on top
            _this.persons = result.filter(function (r) { return r.latestSurveillanceResults != undefined &&
                r.latestSurveillanceResults.some(function (s) { return !s.success; }); })
                .concat(result.filter(function (r) { return r.latestSurveillanceResults == undefined ||
                !r.latestSurveillanceResults.some(function (s) { return !s.success; }); }));
            _this.persons.forEach(function (p) {
                if (p.surveillancesInfo.some(function (sb) { return sb.registeredBy === _this.userManagerService.getName(); })) {
                    _this.personalSurveillances.push(p);
                }
                else {
                    _this.projectSurveillances.push(p);
                }
            });
            _this.team = _this.getTeamList(_this.projectSurveillances);
            _this.filter = _this.team.slice();
        });
    };
    SurveillanceOverviewComponent.prototype.getTeamList = function (list) {
        var t = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var person = list_1[_i];
            if (person.latestSurveillanceResults) {
                person.latestSurveillanceResults.forEach(function (p) {
                    t.push(p.registeredBy);
                });
            }
        }
        var seen = {};
        return t.filter(function (x) {
            if (seen[x])
                return;
            seen[x] = true;
            return x;
        });
    };
    SurveillanceOverviewComponent.prototype.onCheckBoxSelect = function (person, t) {
        if (t.checked) {
            this.filter.push(person);
        }
        else
            this.filter.splice(this.filter.indexOf(person), 1);
        this.projectSurveillances = this.filterList(this.filter);
    };
    SurveillanceOverviewComponent.prototype.filterList = function (team) {
        var _this = this;
        return this.persons.filter(function (f) { return f.surveillancesInfo.some(function (res) { return team.indexOf(res.registeredBy) !== -1 && !f.surveillancesInfo.some(function (res) { return res.registeredBy === _this.userManagerService.getName(); }); }); });
    };
    SurveillanceOverviewComponent = __decorate([
        core_1.Component({
            selector: "surveillance-overview",
            moduleId: module.id,
            templateUrl: "surveillance-overview.component.html",
            styleUrls: ["surveillance-overview.component.css"]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService, user_manager_service_1.UserManagerService, data_manager_service_1.DataManagerService])
    ], SurveillanceOverviewComponent);
    return SurveillanceOverviewComponent;
}());
exports.SurveillanceOverviewComponent = SurveillanceOverviewComponent;
//# sourceMappingURL=surveillance-overview.component.js.map
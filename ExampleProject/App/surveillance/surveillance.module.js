"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var surveillance_list_component_1 = require("./surveillance-list/surveillance-list.component");
var surveillance_overview_component_1 = require("./surveillance-overview/surveillance-overview.component");
var shared_module_1 = require("../shared/shared.module");
var teamsurveillance_pipe_1 = require("./teamsurveillance.pipe");
var search_result_module_1 = require("../search-result/search-result.module");
var SurveillanceModule = (function () {
    function SurveillanceModule() {
    }
    SurveillanceModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, search_result_module_1.SearchResultModule],
            declarations: [surveillance_list_component_1.SurveillanceListComponent, surveillance_overview_component_1.SurveillanceOverviewComponent, teamsurveillance_pipe_1.TeamFilterPipe],
            exports: [surveillance_overview_component_1.SurveillanceOverviewComponent],
            providers: [teamsurveillance_pipe_1.TeamFilterPipe]
        })
    ], SurveillanceModule);
    return SurveillanceModule;
}());
exports.SurveillanceModule = SurveillanceModule;
//# sourceMappingURL=surveillance.module.js.map
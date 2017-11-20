"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var search_filter_module_1 = require("../search-filter/search-filter.module");
var dashboard_module_1 = require("../dashboard/dashboard.module");
var surveillance_module_1 = require("../surveillance/surveillance.module");
var search_result_module_1 = require("../search-result/search-result.module");
var core_module_1 = require("../core/core.module");
var shared_module_1 = require("../shared/shared.module");
var index_component_1 = require("./index.component");
var IndexModule = (function () {
    function IndexModule() {
    }
    IndexModule = __decorate([
        core_1.NgModule({
            imports: [core_module_1.CoreModule, shared_module_1.SharedModule, search_filter_module_1.SearchFilterModule, dashboard_module_1.DashboardModule, surveillance_module_1.SurveillanceModule, search_result_module_1.SearchResultModule],
            declarations: [index_component_1.IndexComponent],
            exports: [index_component_1.IndexComponent],
            providers: []
        })
    ], IndexModule);
    return IndexModule;
}());
exports.IndexModule = IndexModule;
//# sourceMappingURL=index.module.js.map
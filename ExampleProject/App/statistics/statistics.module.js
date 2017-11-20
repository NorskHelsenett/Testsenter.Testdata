"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_file_upload_1 = require("ng2-file-upload");
var ngx_charts_1 = require("@swimlane/ngx-charts");
var ngx_pipes_1 = require("ngx-pipes");
var statistics_index_component_1 = require("./statistics-index.component");
var statistics_overview_component_1 = require("./overview/statistics-overview.component");
var statistics_correlation_component_1 = require("./correlation/statistics-correlation.component");
var statistics_detailed_component_1 = require("./detailed/statistics-detailed.component");
var statistics_group_component_1 = require("./groups/statistics-group.component");
var statistics_compare_component_1 = require("./compare/statistics-compare.component");
var StatisticsModule = (function () {
    function StatisticsModule() {
    }
    StatisticsModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, ngx_charts_1.NgxChartsModule, ngx_pipes_1.NgPipesModule],
            exports: [statistics_index_component_1.StatisticsIndexComponent],
            declarations: [statistics_index_component_1.StatisticsIndexComponent, statistics_overview_component_1.StatisticsOverviewComponent, statistics_correlation_component_1.StatisticsCorrelationComponent, statistics_detailed_component_1.StatisticsDetailedComponent, statistics_group_component_1.StatisticsGroupsComponent,
                statistics_compare_component_1.StatisticsCompareComponent, ng2_file_upload_1.FileSelectDirective],
            providers: [],
        })
    ], StatisticsModule);
    return StatisticsModule;
}());
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.js.map
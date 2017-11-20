"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng_semantic_1 = require("ng-semantic");
var app_component_1 = require("./app.component");
var index_module_1 = require("./index/index.module");
var user_module_1 = require("./user/user.module");
var statistics_module_1 = require("./statistics/statistics.module");
var static_data_collection_module_1 = require("./static-data-collection/static-data-collection.module");
var core_module_1 = require("./core/core.module");
var app_routes_1 = require("./app.routes");
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/of");
require("rxjs/add/operator/finally");
require("rxjs/add/operator/do");
require("rxjs/add/operator/share");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot(app_routes_1.APP_ROUTES),
                animations_1.BrowserAnimationsModule,
                core_module_1.CoreModule,
                index_module_1.IndexModule,
                statistics_module_1.StatisticsModule,
                static_data_collection_module_1.StaticDataCollectionModule,
                user_module_1.UserModule,
                forms_1.ReactiveFormsModule,
                ng_semantic_1.NgSemanticModule,
                ng2_toastr_1.ToastModule.forRoot(),
            ],
            providers: [
                app_routes_1.AppRoutingProviders
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var ngx_pipes_1 = require("ngx-pipes");
var person_data_component_1 = require("./person-data/person-data.component");
var static_data_shared_component_1 = require("./shared/static-data-shared.component");
var contact_information_component_1 = require("./contact-information/contact-information.component");
var admin_static_data_component_1 = require("./admin/admin-static-data.component");
var admin_static_table_component_1 = require("./admin/admin-static-table.component");
var business_data_component_1 = require("./business-data/business-data.component");
var StaticDataCollectionModule = (function () {
    function StaticDataCollectionModule() {
    }
    StaticDataCollectionModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, ngx_pipes_1.NgPipesModule],
            exports: [static_data_shared_component_1.StaticDataSharedComponent],
            declarations: [static_data_shared_component_1.StaticDataSharedComponent, contact_information_component_1.ContactInformationComponent, person_data_component_1.PersonDataComponent, admin_static_data_component_1.AdminStaticDataComponent, business_data_component_1.BusinessDataComponent, admin_static_table_component_1.AdminStaticTableComponent],
            providers: [],
        })
    ], StaticDataCollectionModule);
    return StaticDataCollectionModule;
}());
exports.StaticDataCollectionModule = StaticDataCollectionModule;
//# sourceMappingURL=static-data-collection.module.js.map
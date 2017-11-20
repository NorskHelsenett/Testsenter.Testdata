"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var person_professional_component_1 = require("./tabs/person/professional/person-professional.component");
var person_personal_component_1 = require("./tabs/person/personal/person-personal.component");
var person_difi_component_1 = require("./tabs/person/difi/person-difi.component");
var person_notifications_component_1 = require("./tabs/person/notifications/person-notifications.component");
var person_overview_component_1 = require("./tabs/person/overview/person-overview.component");
var information_container_component_1 = require("./tabs/information-container/information-container.component");
var search_list_component_1 = require("./search-result-list/search-list.component");
var person_search_list_component_1 = require("./search-result-list/person-search-list/person-search-list.component");
var business_search_list_component_1 = require("./search-result-list/business-search-list/business-search-list.component");
var business_bedreg_component_1 = require("./tabs/business/bedreg/business-bedreg.component");
var business_ar_component_1 = require("./tabs/business/ar/business-ar.component");
var business_overview_component_1 = require("./tabs/business/overview/business-overview.component");
var active_filters_component_1 = require("./active-filters/active-filters.component");
var person_detail_component_1 = require("./search-result-details/person-detail/person-detail.component");
var person_search_detail_component_1 = require("./search-result-details/person-search-detail/person-search-detail.component");
var business_detail_component_1 = require("./search-result-details/business-detail/business-detail.component");
var business_search_details_component_1 = require("./search-result-details/business-search-detail/business-search-details.component");
var business_flr_component_1 = require("./tabs/business/flr/business-flr.component");
var SearchResultModule = (function () {
    function SearchResultModule() {
    }
    SearchResultModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [person_detail_component_1.PersonDetailComponent, person_overview_component_1.PersonOverviewComponent, person_professional_component_1.PersonProfessionalComponent, person_personal_component_1.PersonPersonalComponent,
                person_difi_component_1.PersonDifiComponent, person_notifications_component_1.PersonNotificationsComponent, information_container_component_1.InformationContainerComponent, person_search_detail_component_1.PersonSearchDetailComponent,
                search_list_component_1.SearchListComponent, person_search_list_component_1.PersonSearchListComponent, business_search_list_component_1.BusinessSearchListComponent, business_detail_component_1.BusinessDetailComponent, business_search_details_component_1.BusinessSearchDetailComponent,
                active_filters_component_1.ActiveFiltersComponent, business_ar_component_1.BusinessArComponent, business_bedreg_component_1.BusinessBedRegComponent, business_overview_component_1.BusinessOverviewComponent, business_flr_component_1.BusinessFlrComponent],
            exports: [person_detail_component_1.PersonDetailComponent, person_search_detail_component_1.PersonSearchDetailComponent, search_list_component_1.SearchListComponent]
        })
    ], SearchResultModule);
    return SearchResultModule;
}());
exports.SearchResultModule = SearchResultModule;
//# sourceMappingURL=search-result.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var search_box_component_1 = require("./search-box/search-box.component");
var saved_search_component_1 = require("./saved-search/saved-search.component");
var filter_group_component_1 = require("./filter/filter-group.component");
var filter_container_component_1 = require("./filter/filter-container.component");
var agebox_component_1 = require("./filter/filtertypes/agebox/agebox.component");
var children_filter_component_1 = require("./filter/filtertypes/children/children-filter.component");
var parent_filter_component_1 = require("./filter/filtertypes/parent/parent-filter.component");
var tagfilter_component_1 = require("./filter/filtertypes/tagfilter/tagfilter.component");
var filtergroup_pipe_1 = require("./filter/filtergroup.pipe");
var shared_module_1 = require("../shared/shared.module");
var saved_search_pipe_1 = require("./saved-search/saved-search.pipe");
var registerfullname_pipe_1 = require("../shared/shared-pipes/registerfullname.pipe");
var SearchFilterModule = (function () {
    function SearchFilterModule() {
    }
    SearchFilterModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [search_box_component_1.SearchBoxComponent, saved_search_component_1.SavedSearchComponent, filter_group_component_1.FilterGroupComponent, filter_container_component_1.FilterContainerComponent,
                agebox_component_1.AgeBoxComponent, children_filter_component_1.ChildrenFilterComponent, parent_filter_component_1.ParentFilterComponent, tagfilter_component_1.TagFilterComponent, filtergroup_pipe_1.FilterGroupPipe,
                saved_search_pipe_1.SavedSearchPipe],
            providers: [saved_search_pipe_1.SavedSearchPipe, registerfullname_pipe_1.RegisterFilterFullNamePipe],
            exports: [search_box_component_1.SearchBoxComponent, filter_container_component_1.FilterContainerComponent]
        })
    ], SearchFilterModule);
    return SearchFilterModule;
}());
exports.SearchFilterModule = SearchFilterModule;
//# sourceMappingURL=search-filter.module.js.map
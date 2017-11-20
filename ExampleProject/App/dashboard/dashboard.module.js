"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dashboard_component_1 = require("./dashboard.component");
var saved_search_tile_component_1 = require("./saved-search-tile/saved-search-tile.component");
var tag_tile_component_1 = require("./tag-tile/tag-tile.component");
var links_tile_component_1 = require("./links-tile/links-tile.component");
var latest_checks_tile_component_1 = require("./latest-checks-tiles/latest-checks-tile.component");
var comments_tile_component_1 = require("./comments-tile/comments-tile.component");
var tag_list_tile_component_1 = require("./tag-list-tile/tag-list-tile.component");
var shared_module_1 = require("../shared/shared.module");
var apikey_tile_component_1 = require("./apikey-tile/apikey-tile.component");
var surveillance_status_tile_component_1 = require("./surveillance-status-tile/surveillance-status-tile.component");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [dashboard_component_1.DashboardComponent, saved_search_tile_component_1.SavedSearchTileComponent, tag_tile_component_1.TagTileComponent, links_tile_component_1.LinksTileComponent,
                latest_checks_tile_component_1.LatestCheckTileComponent, comments_tile_component_1.CommentsTileComponent, tag_list_tile_component_1.TagListTileComponent, apikey_tile_component_1.ApiKeyComponent, surveillance_status_tile_component_1.SurveillanceStatusTileComponent],
            exports: [dashboard_component_1.DashboardComponent],
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map
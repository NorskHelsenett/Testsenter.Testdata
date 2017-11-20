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
var data_manager_service_1 = require("../../core/services/data-manager.service");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var filter_manager_service_1 = require("../../core/services/filter-manager.service");
var app_settings_1 = require("../../resources/app-settings");
var TagListTileComponent = (function () {
    function TagListTileComponent(dataManager, userManager, filterManager) {
        this.dataManager = dataManager;
        this.userManager = userManager;
        this.filterManager = filterManager;
        this.sortArray = ["name", "registeredBy", "teamProjectInt"];
        this.asc = "sorted ascending";
        this.desc = "sorted descending";
        this.projectNames = app_settings_1.projectNames;
    }
    TagListTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataManager.tags$.subscribe(function (tags) {
            _this.taglist = tags;
        });
    };
    TagListTileComponent.prototype.ngAfterViewInit = function () {
        $('#projectDropdown').dropdown();
    };
    TagListTileComponent.prototype.sortOn = function (heading) {
        var dir = this.desc;
        if (heading === this.sortBy) {
            dir = this.sortDir ? this.desc : this.asc;
            this.sortDir = !this.sortDir;
        }
        else {
            this.sortDir = false;
        }
        this.sortBy = heading;
        this.tagClass = "";
        this.byClass = "";
        this.projectClass = "";
        switch (heading) {
            case 0:
                this.tagClass = dir;
                break;
            case 1:
                this.byClass = dir;
                break;
            case 2:
                this.projectClass = dir;
                break;
        }
    };
    TagListTileComponent.prototype.search = function (tag) {
        this.filterManager.searchWithTag(tag.name);
    };
    TagListTileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "taglist",
            templateUrl: "tag-list-tile.component.html",
            styleUrls: ["../dashboard.component.css"]
        }),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService, user_manager_service_1.UserManagerService, filter_manager_service_1.FilterManagerService])
    ], TagListTileComponent);
    return TagListTileComponent;
}());
exports.TagListTileComponent = TagListTileComponent;
//# sourceMappingURL=tag-list-tile.component.js.map
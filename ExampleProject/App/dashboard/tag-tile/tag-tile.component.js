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
var filter_manager_service_1 = require("../../core/services/filter-manager.service");
var data_manager_service_1 = require("../../core/services/data-manager.service");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var TagTileComponent = (function () {
    function TagTileComponent(filterManager, dataManager, userManager) {
        this.filterManager = filterManager;
        this.dataManager = dataManager;
        this.userManager = userManager;
        this.ownedBy = UtilityModels_1.OwnedBy;
        this.numberToShow = 15;
        this.display = 15;
    }
    TagTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataManager.tags$.subscribe(function (tags) {
            _this.userManager.getNameAsync().subscribe(function (name) {
                _this.taglist = _this.selected === UtilityModels_1.OwnedBy.All
                    ? tags.filter(function (s) { return s.registeredBy !== name; })
                    : tags.filter(function (s) { return s.registeredBy === name; });
                setTimeout(function () { return $(".deleteTag").popup({
                    on: "click"
                }); }, 1000);
            });
        });
        this.dataManager.deletedTag$.subscribe(function () {
            _this.deleting = false;
            $(".deleteTag").popup("hide");
        });
    };
    TagTileComponent.prototype.search = function (tag) {
        this.filterManager.searchWithTag(tag.name);
    };
    TagTileComponent.prototype.openPopup = function (event) {
        event.stopPropagation();
    };
    TagTileComponent.prototype.closeConfirmation = function (event) {
        event.stopPropagation();
        $(".deleteTag").popup("hide");
    };
    TagTileComponent.prototype.deleteTag = function (tag, event) {
        event.stopPropagation();
        this.deleting = true;
        this.dataManager.deleteTag(tag);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TagTileComponent.prototype, "selected", void 0);
    TagTileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "tag-tile",
            templateUrl: "tag-tile.component.html",
            styleUrls: ["../dashboard.component.css"]
        }),
        __metadata("design:paramtypes", [filter_manager_service_1.FilterManagerService, data_manager_service_1.DataManagerService, user_manager_service_1.UserManagerService])
    ], TagTileComponent);
    return TagTileComponent;
}());
exports.TagTileComponent = TagTileComponent;
//# sourceMappingURL=tag-tile.component.js.map
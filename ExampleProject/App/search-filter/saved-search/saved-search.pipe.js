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
var of_1 = require("rxjs/observable/of");
var UtilityModels_1 = require("../../models/UtilityModels");
var user_manager_service_1 = require("../../core/services/user-manager.service");
/**
 * Returnerer lagerede søk registret av {@link OwnedBy}
 */
var SavedSearchPipe = (function () {
    function SavedSearchPipe(userManager) {
        this.userManager = userManager;
    }
    SavedSearchPipe.prototype.transform = function (value, ownedBy, index) {
        if (value == undefined) {
            return of_1.of(new Array());
        }
        var list = value.filter(function (s) { return s.searchIndex === index; });
        switch (ownedBy) {
            case UtilityModels_1.OwnedBy.Me:
                return this.userManager.getUserNameAsync().map(function (name) { return list.filter(function (s) { return s.registeredBy === name; }); });
            case UtilityModels_1.OwnedBy.Project:
                return this.userManager.getProjectIdAsync().map(function (id) { return list.filter(function (s) { return s.teamProjectInt == id; }); });
            default:
                return this.userManager.getUserNameAsync().map(function (name) { return list.filter(function (s) { return s.registeredBy !== name; }); });
        }
    };
    SavedSearchPipe = __decorate([
        core_1.Pipe({ name: 'savedsearch' }),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService])
    ], SavedSearchPipe);
    return SavedSearchPipe;
}());
exports.SavedSearchPipe = SavedSearchPipe;
//# sourceMappingURL=saved-search.pipe.js.map
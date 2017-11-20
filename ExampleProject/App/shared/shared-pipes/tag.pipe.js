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
 * Tar inn en liste med {@link Tag} og returnerer de
 */
var TagPipe = (function () {
    function TagPipe(userManager) {
        this.userManager = userManager;
    }
    TagPipe.prototype.transform = function (value, ownedBy) {
        if (value == undefined) {
            return of_1.of(new Array());
        }
        if (ownedBy === UtilityModels_1.OwnedBy.All)
            return this.userManager.getNameAsync().map(function (name) { return value.filter(function (s) { return s.registeredBy !== name; }); });
        return this.userManager.getNameAsync().map(function (name) { return value.filter(function (s) { return s.registeredBy === name; }); });
    };
    TagPipe = __decorate([
        core_1.Pipe({ name: 'tag' }),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService])
    ], TagPipe);
    return TagPipe;
}());
exports.TagPipe = TagPipe;
//# sourceMappingURL=tag.pipe.js.map
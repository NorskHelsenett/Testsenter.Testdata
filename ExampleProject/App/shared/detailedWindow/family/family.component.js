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
var familymodels_1 = require("./familymodels");
var UtilityModels_1 = require("../../../models/UtilityModels");
var search_manager_service_1 = require("../../../core/services/search-manager.service");
var FamilyComponent = (function () {
    function FamilyComponent(searchManager) {
        this.searchManager = searchManager;
        this.onClose = new core_1.EventEmitter();
    }
    FamilyComponent.prototype.close = function (event) {
        event.stopPropagation();
        this.onClose.emit(UtilityModels_1.ChildViews.None);
    };
    FamilyComponent.prototype.searchForMember = function (member) {
        if (member.nin != undefined) {
            this.searchManager.searchWithNin(member.nin);
        }
    };
    FamilyComponent.prototype.searchForFamily = function () {
        var nins = [this.family.person.nin];
        if (this.family.father)
            nins.push(this.family.father.nin);
        if (this.family.mother)
            nins.push(this.family.mother.nin);
        if (this.family.children)
            this.family.children.forEach(function (p) { return nins.push(p.nin); });
        this.searchManager.searchForMultipleNins(nins);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", familymodels_1.Family)
    ], FamilyComponent.prototype, "family", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FamilyComponent.prototype, "onClose", void 0);
    FamilyComponent = __decorate([
        core_1.Component({
            selector: 'family',
            moduleId: module.id,
            templateUrl: 'family.component.html',
            styleUrls: ['family.component.css', '../detailedWindow.css']
        }),
        __metadata("design:paramtypes", [search_manager_service_1.SearchManagerService])
    ], FamilyComponent);
    return FamilyComponent;
}());
exports.FamilyComponent = FamilyComponent;
//# sourceMappingURL=family.component.js.map
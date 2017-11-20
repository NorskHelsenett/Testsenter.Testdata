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
var SurveillanceListComponent = (function () {
    function SurveillanceListComponent() {
    }
    SurveillanceListComponent.prototype.ngOnChanges = function () {
        if (!this.persons)
            return;
        this.changedSurveillances = this.persons.filter(function (p) { return p.latestSurveillanceResults != undefined && p.latestSurveillanceResults.some(function (sur) { return !sur.success; }); }).length;
        this.unchangedSurveillances = this.persons.filter(function (p) { return p.latestSurveillanceResults == undefined || p.latestSurveillanceResults.length === 0 || !p.latestSurveillanceResults.some(function (sur) { return !sur.success; }); }).length;
    };
    SurveillanceListComponent.prototype.ngAfterViewInit = function () {
        $(".ui.accordion").accordion("refresh");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SurveillanceListComponent.prototype, "persons", void 0);
    SurveillanceListComponent = __decorate([
        core_1.Component({
            selector: "surveillance-list",
            moduleId: module.id,
            templateUrl: "surveillance-list.component.html",
            styleUrls: ["surveillance-list.component.css", "../../search/search-list/search-list.component.css"]
        })
    ], SurveillanceListComponent);
    return SurveillanceListComponent;
}());
exports.SurveillanceListComponent = SurveillanceListComponent;
//# sourceMappingURL=surveillance-list.component.js.map
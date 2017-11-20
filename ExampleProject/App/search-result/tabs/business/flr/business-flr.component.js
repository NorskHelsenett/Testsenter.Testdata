"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var business_base_hit_tab_1 = require("../business-base-hit-tab");
var flrhelper_1 = require("../../../../helpers/flrhelper");
var datehelper_1 = require("../../../../helpers/datehelper");
var registerhelper_1 = require("../../../../helpers/registerhelper");
var BusinessFlrComponent = (function (_super) {
    __extends(BusinessFlrComponent, _super);
    function BusinessFlrComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BusinessFlrComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gpInformation = {
            details: []
        };
        this.statusInformation = {
            details: []
        };
        var flr = JSON.parse(this.item.detail.flrJson);
        if (flr != undefined && flr.length > 0) {
            flr.forEach(function (contract) { return _this.getContractDetails(contract); });
        }
    };
    BusinessFlrComponent.prototype.getContractDetails = function (contract) {
        if (contract.DoctorCycles == undefined)
            return;
        var fastlege = contract.DoctorCycles
            .find(function (doc) { return doc.Relationship.CodeValue === flrhelper_1.FastLegeCode &&
            datehelper_1.isValidDate(doc.Valid.From, doc.Valid.To); });
        this.addDetail("", contract.Id);
        this.addDetail("", fastlege === undefined ? "Legeløs liste" : registerhelper_1.getGPname(fastlege.GP), "", null, this.gpInformation);
        this.addDetail("", contract.Status.CodeText, "", null, this.statusInformation);
    };
    BusinessFlrComponent.prototype.showBedRegDetails = function () {
        this.showJsonDetails(this.item.detail.flrJson);
    };
    BusinessFlrComponent = __decorate([
        core_1.Component({
            selector: 'business-flr',
            moduleId: module.id,
            templateUrl: 'business-flr.component.html',
            styleUrls: ['../../tab.css']
        })
    ], BusinessFlrComponent);
    return BusinessFlrComponent;
}(business_base_hit_tab_1.BusinessBaseHitTab));
exports.BusinessFlrComponent = BusinessFlrComponent;
//# sourceMappingURL=business-flr.component.js.map
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
var UtilityModels_1 = require("../../../../models/UtilityModels");
var business_base_hit_tab_1 = require("../business-base-hit-tab");
var BusinessArComponent = (function (_super) {
    __extends(BusinessArComponent, _super);
    function BusinessArComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
        Type:
        None	        0	Ingen kommunikasjonspart
        Person	        1	Person
        Organization	2	Virksomhet/enhet fra enhetsregisteret
        Department	    8	Avdeling. Kan også være en bedrift fra bedrifts- og foretaksregisteret (BoF)
        Service	        4	Tjeneste
        All	            15	Alle. Kan være hvilken som helst av de over.
    */
    BusinessArComponent.prototype.ngOnInit = function () {
        this.ar = JSON.parse(this.item.detail.arJson);
        this.compartInformation = {
            details: []
        };
        this.setDetails();
        this.setCompartInformation();
    };
    BusinessArComponent.prototype.showArDetails = function () {
        this.showDetails(UtilityModels_1.ChildViews.Json, this.item.detail.arJson);
    };
    BusinessArComponent.prototype.setDetails = function () {
        if (this.ar.BusinessType)
            this.addDetail("Virksomhetstype: ", this.ar.BusinessType.CodeText, this.ar.BusinessType.CodeValue);
        if (this.ar.Type === 1)
            this.addDetail("Virksomhetstype: ", "Person");
        if (this.ar.Properties) {
            var prop = this.ar.Properties.find(function (property) { return property.SimpleType === "osean_status"; });
            if (prop)
                this.addDetail(prop.CodeText + ": ", prop.CodeValue == true ? "Ja" : "Nei");
        }
        if (this.ar.ElectronicAddresses) {
            var edi = this.ar.ElectronicAddresses.find(function (adr) { return adr.Type.CodeValue === "E_EDI"; });
            if (edi)
                this.addDetail("EDI-adresse: " + edi.Address);
        }
    };
    BusinessArComponent.prototype.setCompartInformation = function () {
        var _this = this;
        if (this.ar.People != undefined && this.ar.People.length > 0) {
            this.ar.People.forEach(function (person) {
                _this.addDetail("", person.Name, person.HerId, undefined, _this.compartInformation);
            });
        }
    };
    BusinessArComponent = __decorate([
        core_1.Component({
            selector: 'business-ar',
            moduleId: module.id,
            templateUrl: 'business-ar.component.html',
            styleUrls: ['../../tab.css']
        })
    ], BusinessArComponent);
    return BusinessArComponent;
}(business_base_hit_tab_1.BusinessBaseHitTab));
exports.BusinessArComponent = BusinessArComponent;
//# sourceMappingURL=business-ar.component.js.map
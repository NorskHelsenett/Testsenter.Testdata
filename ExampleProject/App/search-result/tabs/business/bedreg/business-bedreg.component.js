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
var BusinessBedRegComponent = (function (_super) {
    __extends(BusinessBedRegComponent, _super);
    function BusinessBedRegComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BusinessBedRegComponent.prototype.ngOnInit = function () {
        this.servicesInformation = {
            details: []
        };
        var bedreg = JSON.parse(this.item.detail.bedRegJson);
        if (bedreg.PhysicalAddresses && bedreg.PhysicalAddresses.length > 0) {
            console.log(bedreg.PhysicalAddresses);
            this.getAddressDetails(bedreg.PhysicalAddresses.find(function (p) { return p.Type.CodeValue === "RES"; }), "Besøksadresse: ");
            this.getAddressDetails(bedreg.PhysicalAddresses.find(function (p) { return p.Type.CodeValue === "PST"; }), "Postadresse: ");
        }
        if (bedreg.ElectronicAddresses && bedreg.ElectronicAddresses.length > 0) {
            this.addDetail("Elektroniske adresser: ", "", "", this.getEAddresses(bedreg.ElectronicAddresses));
        }
        if (bedreg.Properties) {
            var services = this.getServices(bedreg.Properties);
            var fs = bedreg.Properties.find(function (ser) { return ser.SimpleType == undefined && ser.SimpleType === "osean_status"; });
            if (fs)
                this.addDetail(fs.CodeText, "");
            if (services.length > 0)
                this.addDetail("Digital dialog: ", "", "", services);
        }
    };
    BusinessBedRegComponent.prototype.getAddressDetails = function (address, description) {
        if (address == undefined || address.StreetAddress === "" || address.StreetAddress == undefined)
            return;
        this.addDetail(description, address.StreetAddress +
            ", " +
            (address.PostalCode == undefined ? "" : address.PostalCode) +
            " " +
            address.City);
    };
    BusinessBedRegComponent.prototype.getEAddresses = function (addresses) {
        var details = [];
        var codes = ["E_EPO", "E_TLF", "E_FAX", "E_URL"];
        codes.forEach(function (code) {
            var detail = addresses.find(function (adr) { return adr.Type.CodeValue === code; });
            if (detail != undefined)
                details.push({ description: detail.Type.CodeText + ": ", value: detail.Address });
        });
        return [{ details: details }];
    };
    BusinessBedRegComponent.prototype.getServices = function (properties) {
        var _this = this;
        var details = [];
        var codes = ["dd_bestill_time", "dd_forny_resept", "dd_start_ekonsultasjon", "dd_kontakt_legekontor"];
        codes.forEach(function (code) {
            var detail = _this.getServiceDetails(properties.find(function (adr) { return adr.SimpleType === code; }));
            if (detail != undefined)
                details.push(detail);
        });
        return details.length > 0 ? [{ details: details }] : [];
    };
    BusinessBedRegComponent.prototype.getServiceDetails = function (service) {
        if (service == undefined || service.SimpleType == undefined)
            return;
        var description = service.SimpleType.replace(/dd/g, "").replace(/_/g, " ").trim();
        return { description: description.charAt(0).toUpperCase() + description.slice(1).toLowerCase() + ": ", value: service.CodeValue };
    };
    BusinessBedRegComponent.prototype.showBedRegDetails = function () {
        this.showJsonDetails(this.item.detail.bedRegJson);
    };
    BusinessBedRegComponent = __decorate([
        core_1.Component({
            selector: 'business-bedreg',
            moduleId: module.id,
            templateUrl: 'business-bedreg.component.html',
            styleUrls: ['../../tab.css']
        })
    ], BusinessBedRegComponent);
    return BusinessBedRegComponent;
}(business_base_hit_tab_1.BusinessBaseHitTab));
exports.BusinessBedRegComponent = BusinessBedRegComponent;
//# sourceMappingURL=business-bedreg.component.js.map
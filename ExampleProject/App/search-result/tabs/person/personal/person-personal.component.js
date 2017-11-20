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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var person_base_hit_tab_1 = require("../person-base-hit-tab");
var UtilityModels_1 = require("../../../../models/UtilityModels");
var app_settings_1 = require("../../../../resources/app-settings");
var pregHelper_1 = require("../../../../helpers/pregHelper");
var flrhelper_1 = require("../../../../helpers/flrhelper");
var datehelper_1 = require("../../../../helpers/datehelper");
var registerhelper_1 = require("../../../../helpers/registerhelper");
var PersonPersonalComponent = (function (_super) {
    __extends(PersonPersonalComponent, _super);
    function PersonPersonalComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonPersonalComponent.prototype.ngOnInit = function () {
        this.flrInformation = {
            details: []
        };
        this.setDetails();
    };
    PersonPersonalComponent.prototype.setDetails = function () {
        var person = JSON.parse(this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.Preg]));
        this.addDetail("Fødselsnummer: ", this.item.nin);
        this.addDetail("Navn i PREG: ", this.getPersonName(person), "", this.getGeneralInformation(person));
        if (person.RegStatus != null)
            this.addDetail("Registreringskode: ", pregHelper_1.getRegStatusDescription(person.RegStatus), "registreringskode " + person.RegStatus);
        if (person.Addresses === null)
            return;
        for (var _i = 0, _a = person.Addresses; _i < _a.length; _i++) {
            var address = _a[_i];
            if (address.PostalType != null)
                this.addDetail("Adressetype: ", pregHelper_1.getPostalType(address.PostalType), "adressekode " + address.PostalType + "", this.getAdressDetails(address));
            else
                this.addDetail("", "", "", this.getAdressDetails(address));
        }
        if (this.item.detail.fastlegePasientJson) {
            var flrInfo = JSON.parse(this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.FlrPasient]));
            this.addDetail("Avtalenummer: ", flrInfo.GPContractId, "", undefined, this.flrInformation);
            if (flrInfo.DoctorCycles.length > 0) {
                var fastlege = flrInfo.DoctorCycles
                    .find(function (doc) { return doc.Relationship.CodeValue === flrhelper_1.FastLegeCode &&
                    datehelper_1.isValidDate(doc.Valid.From, doc.Valid.To); });
                this.addDetail("Fastlege: ", fastlege === undefined ? "Legeløs liste" : registerhelper_1.getGPname(fastlege.GP), "", this.getPasientContractDetails(flrInfo.DoctorCycles), this.flrInformation);
            }
            else
                this.addDetail("Fastlege: ", "Legeløs liste", "", undefined, this.flrInformation);
            var office = flrInfo.GPContract.GPOffice;
            if (office)
                this.addDetail("Fastlegekontor: ", office.DisplayName ? office.DisplayName : office.Name, "", undefined, this.flrInformation);
        }
    };
    PersonPersonalComponent.prototype.getPersonName = function (person) {
        return person.GivenName + " " + (person.MiddleName == undefined ? "" : person.MiddleName + " ") + person.Sn;
    };
    PersonPersonalComponent.prototype.getPasientContractDetails = function (cycles) {
        var detail = [];
        for (var _i = 0, cycles_1 = cycles; _i < cycles_1.length; _i++) {
            var doctor = cycles_1[_i];
            if (doctor.Relationship.CodeValue === flrhelper_1.FastLegeCode || !datehelper_1.isValidDate(doctor.Valid.From, doctor.Valid.To))
                continue;
            detail.push({
                description: doctor.Relationship.CodeValue === flrhelper_1.DeleLegeCode ? "Delelege: " : "Vikar: ",
                value: registerhelper_1.getGPname(doctor.GP),
                extra: datehelper_1.getDateString(doctor.Valid.From, doctor.Valid.To)
            });
        }
        return [{ details: detail }];
    };
    PersonPersonalComponent.prototype.getAdressDetails = function (address) {
        var details = [];
        if (address.PostalAddress === "" || address.PostalAddress == undefined)
            return details;
        details.push({ details: [{ description: "Adresse: ", value: address.PostalAddress + ", " + (address.PostalCode == undefined ? "" : address.PostalCode) + " " + address.PostalPlace }] });
        return details;
    };
    PersonPersonalComponent.prototype.getGeneralInformation = function (person) {
        var details = [];
        var gender = +this.item.nin[8] % 2 === 0 ? "Kvinne" : "Mann";
        var d = [{ description: "Kjønn, alder: ", value: gender + ", " + (this.item.fodselsDato ? datehelper_1.getYearFromDateString(this.item.fodselsDato) : datehelper_1.getAgeFromNin(this.item.nin)) + " år" }];
        if (this.item !== undefined) {
            d.push({ description: "Barn: ", value: this.item.barn.length > 0 ? "Har barn" : "Har ikke barn" });
        }
        if (person.MaritalStatus) {
            d.push({ description: "Sivilstatus: ", value: app_settings_1.sivilStatus[person.MaritalStatus] });
        }
        if (person.SpouseNIN) {
            d.push({ description: "Ektefelle: ", value: person.SpouseNIN });
        }
        details.push({ details: d });
        return details;
    };
    PersonPersonalComponent.prototype.showFamily = function () {
        this._showDetails.emit({ view: UtilityModels_1.ChildViews.Family });
    };
    PersonPersonalComponent.prototype.showPregDetails = function () {
        this.showDetails(UtilityModels_1.ChildViews.Json, this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.Preg]));
    };
    PersonPersonalComponent.prototype.showFlrDetails = function () {
        this.showDetails(UtilityModels_1.ChildViews.Json, this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.FlrPasient]));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PersonPersonalComponent.prototype, "loadingFamily", void 0);
    PersonPersonalComponent = __decorate([
        core_1.Component({
            selector: "person-personal",
            moduleId: module.id,
            templateUrl: "person-personal.component.html",
            styleUrls: ["../../tab.css"]
        })
    ], PersonPersonalComponent);
    return PersonPersonalComponent;
}(person_base_hit_tab_1.PersonBaseHitTab));
exports.PersonPersonalComponent = PersonPersonalComponent;
//# sourceMappingURL=person-personal.component.js.map
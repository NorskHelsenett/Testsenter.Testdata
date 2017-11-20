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
var person_base_hit_tab_1 = require("../person-base-hit-tab");
var moment = require("moment/moment");
var UtilityModels_1 = require("../../../../models/UtilityModels");
var app_settings_1 = require("../../../../resources/app-settings");
var datehelper_1 = require("../../../../helpers/datehelper");
var PersonProfessionalComponent = (function (_super) {
    __extends(PersonProfessionalComponent, _super);
    function PersonProfessionalComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonProfessionalComponent.prototype.ngOnInit = function () {
        this.fadedInformation = {
            details: [],
            faded: true
        };
        this.flrInformation = {
            details: [],
        };
        this.setDetails();
    };
    PersonProfessionalComponent.prototype.setDetails = function () {
        var person = JSON.parse(this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.Hpr]));
        this.addDetail("HPR-nummer: ", this.item.hprNr);
        this.addDetail("Navn i HPR: ", this.getPersonName(person));
        for (var _i = 0, _a = person.Godkjenninger; _i < _a.length; _i++) {
            var godkjenning = _a[_i];
            var date = godkjenning.Gyldig.Til ? moment(godkjenning.Gyldig.Til) : undefined;
            this.addDetail("Kategori: ", godkjenning.Helsepersonellkategori.Beskrivelse, (date ? "Gyldig til " + date.format("DD/MM YYYY") : "Ikke oppgitt sluttdato"), this.getGodkjenningDetails(godkjenning), datehelper_1.isValidDate(godkjenning.Gyldig.Fra, godkjenning.Gyldig.Til) ? this.information : this.fadedInformation);
        }
        if (this.item.detail.fastlegeJson) {
            var flrInfo = JSON.parse(this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.FlrDoctor]));
            for (var _b = 0, _c = flrInfo.Contracts; _b < _c.length; _b++) {
                var contract = _c[_b];
                if (datehelper_1.isValidDate(contract.Valid.From, contract.Valid.To)) {
                    var status_1 = contract.GPContract.Status.CodeText;
                    this.addDetail("Avtalenummer: ", contract.GPContractId, status_1, this.getContractDetail(contract), this.flrInformation);
                }
            }
        }
    };
    PersonProfessionalComponent.prototype.getPersonName = function (person) {
        return person.Fornavn +
            (person.Mellomnavn == undefined ? " " : " " + person.Mellomnavn) +
            (" " + person.Etternavn);
    };
    PersonProfessionalComponent.prototype.getContractDetail = function (contract) {
        var detail = [];
        if (contract.Relationship) {
            detail.push({ description: "Stilling: ", value: contract.Relationship.CodeText, extra: contract.Relationship.CodeValue === "LPVI" ? datehelper_1.getDateString(contract.Valid.From, contract.Valid.To) : "" });
        }
        if (contract.GPContract.GPOffice) {
            var office = contract.GPContract.GPOffice;
            detail.push({ description: "Fastlegekontor: ", value: office.DisplayName ? office.DisplayName : office.Name });
        }
        return [{ details: detail }];
    };
    PersonProfessionalComponent.prototype.getGodkjenningDetails = function (godkjenning) {
        var detail = [];
        if (godkjenning.Rekvisisjonsretter.length > 0) {
            var rekvisjoner = godkjenning.Rekvisisjonsretter.map(function (rek) { return rek.Type.Beskrivelse; });
            detail.push({ description: "Rekvisisjonsrett: ", value: rekvisjoner.join(", ") });
        }
        if (godkjenning.Spesialiteter.length > 0) {
            var spes = godkjenning.Spesialiteter.map(function (s) { return s.Type.Beskrivelse; });
            detail.push({ description: "Spesialitet: ", value: spes.join(", ") });
        }
        if (godkjenning.Autorisasjon !== null) {
            detail.push({ description: "Autorisasjon: ", value: godkjenning.Autorisasjon.Beskrivelse });
        }
        if (godkjenning.AvsluttetStatus !== null) {
            detail.push({ description: "Avsluttet status: ", value: godkjenning.AvsluttetStatus.Beskrivelse });
        }
        return [{ details: detail }];
    };
    PersonProfessionalComponent.prototype.showHprDetails = function () {
        this.showDetails(UtilityModels_1.ChildViews.Json, this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.Hpr]));
    };
    PersonProfessionalComponent.prototype.showFlrDetails = function () {
        this.showDetails(UtilityModels_1.ChildViews.Json, this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.FlrDoctor]));
    };
    PersonProfessionalComponent = __decorate([
        core_1.Component({
            selector: "person-professional",
            moduleId: module.id,
            templateUrl: "person-professional.component.html",
            styleUrls: ["../../tab.css"]
        })
    ], PersonProfessionalComponent);
    return PersonProfessionalComponent;
}(person_base_hit_tab_1.PersonBaseHitTab));
exports.PersonProfessionalComponent = PersonProfessionalComponent;
//# sourceMappingURL=person-professional.component.js.map
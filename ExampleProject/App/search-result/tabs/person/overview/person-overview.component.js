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
var datehelper_1 = require("../../../../helpers/datehelper");
var app_settings_1 = require("../../../../resources/app-settings");
var pregHelper_1 = require("../../../../helpers/pregHelper");
var flrhelper_1 = require("../../../../helpers/flrhelper");
var registerhelper_1 = require("../../../../helpers/registerhelper");
var PersonOverviewComponent = (function (_super) {
    __extends(PersonOverviewComponent, _super);
    function PersonOverviewComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonOverviewComponent.prototype.ngOnInit = function () {
        this.setDetails();
    };
    PersonOverviewComponent.prototype.setDetails = function () {
        if (this.item.detail.pregJson != undefined) {
            var gender = +this.item.nin[8] % 2 === 0 ? "Kvinne" : "Mann";
            this.addDetail("Kjønn, alder: ", gender + ", " + (this.item.fodselsDato ? datehelper_1.getYearFromDateString(this.item.fodselsDato) : datehelper_1.getAgeFromNin(this.item.nin)) + " år", "", this.getGeneralInformation());
        }
        else {
            this.addDetail("", "Testobjektet har enten ikke registrert fødselsnummer i HPR, eller er ikke registert i PREG, så vi får ikke hentet personinformasjon fra PREG");
        }
        if (this.item.detail.hprJson != undefined) {
            var hprinfo = JSON.parse(this
                .getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.Hpr]));
            var godkjenninger = hprinfo.Godkjenninger.filter(function (godkjenning) {
                var til = godkjenning.Gyldig.Til;
                if (til) {
                    return (moment().diff(moment(til)) < 0);
                }
                return true;
            }).map(function (g) { return g.Helsepersonellkategori.Beskrivelse; });
            if (godkjenninger.length > 0)
                this.addDetail("Godkjenning: ", "Autorisert " + godkjenninger.join(", ").toLowerCase());
        }
        if (this.item.detail.fastlegeJson) {
            var fastFlrInfo = JSON.parse(this
                .getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.FlrDoctor]));
            var contracts = fastFlrInfo.Contracts.filter(function (con) { return datehelper_1.isValidDate(con.Valid.From, con.Valid.To); });
            if (contracts.length > 0) {
                var roles_1 = {};
                contracts.forEach(function (c) {
                    var roleName = c.Relationship.CodeText.toLowerCase();
                    if (roles_1.hasOwnProperty(roleName)) {
                        roles_1[roleName].push(c.GPContract.GPOffice
                            .DisplayName
                            ? c.GPContract.GPOffice.DisplayName
                            : c.GPContract.GPOffice.Name);
                    }
                    else
                        roles_1[roleName] = [
                            c.GPContract.GPOffice
                                .DisplayName
                                ? c.GPContract.GPOffice.DisplayName
                                : c.GPContract.GPOffice.Name
                        ];
                });
                this.addDetail("Yrke: ", "Jobber som " + Object.keys(roles_1).map(function (role) { return role + " (" + roles_1[role].join(", ") + ")"; }).join(", "));
            }
        }
    };
    PersonOverviewComponent.prototype.getGeneralInformation = function () {
        var pregInfo = JSON.parse(this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.Preg]));
        var details = [];
        var d = [];
        if (this.item !== undefined) {
            d.push({
                description: "Barn: ",
                value: this.item.barn.length > 0 ? "Har barn" : "Har ikke barn"
            });
        }
        if (pregInfo.Addresses.length > 0) {
            pregInfo.Addresses.forEach(function (address) {
                if (address.PostalType != null)
                    d.push({ description: "Adressetype: ", value: pregHelper_1.getPostalType(address.PostalType), extra: "adressekode " + address.PostalType });
            });
        }
        if (this.item.detail.fastlegePasientJson) {
            var flrInfo = JSON.parse(this.getLatestJsonContent(app_settings_1.RegisterNames[app_settings_1.RegisterNames.FlrPasient]));
            if (flrInfo.DoctorCycles.length > 0) {
                var fastlege = flrInfo.DoctorCycles
                    .find(function (doc) { return doc.Relationship.CodeValue === flrhelper_1.FastLegeCode &&
                    datehelper_1.isValidDate(doc.Valid.From, doc.Valid.To); });
                d.push({ description: "Fastlege: ", value: fastlege === undefined ? "Har ikke fastlege" : registerhelper_1.getGPname(fastlege.GP) });
            }
            else
                d.push({ description: "Fastlege: ", value: "Legeløs liste" });
        }
        details.push({ details: d });
        return details;
    };
    PersonOverviewComponent = __decorate([
        core_1.Component({
            selector: 'person-overview',
            moduleId: module.id,
            templateUrl: 'person-overview.component.html',
            styleUrls: ['../../tab.css']
        })
    ], PersonOverviewComponent);
    return PersonOverviewComponent;
}(person_base_hit_tab_1.PersonBaseHitTab));
exports.PersonOverviewComponent = PersonOverviewComponent;
//# sourceMappingURL=person-overview.component.js.map
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
var UtilityModels_1 = require("../../../../models/UtilityModels");
var app_settings_1 = require("../../../../resources/app-settings");
var PersonDifiComponent = (function (_super) {
    __extends(PersonDifiComponent, _super);
    function PersonDifiComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contactinfo = {
            details: [],
            faded: false
        };
        return _this;
    }
    PersonDifiComponent.prototype.ngOnInit = function () {
        var info = JSON.parse(this.item.detail.difiInformationJson);
        this.addDetail("Status: ", UtilityModels_1.DifiStatus[info.status]);
        this.addDetail("Reservert: ", info.reservasjon ? "Ja" : "Nei");
        this.addDetail("Kan motta varsling: ", UtilityModels_1.DifiVarsel[+info.varslingsstatus]);
        if (info.sikkerDigitalPostAdresse != undefined) {
            var index = Object.keys(info.sikkerDigitalPostAdresse);
            console.log(index);
            //Midlertidig kode 
            this.addDetail("Elektronisk postkasse: ", app_settings_1.DigitalMailProvider[info.sikkerDigitalPostAdresse[index[1]]], info.sikkerDigitalPostAdresse[index[1]], [{
                    details: [{
                            description: "Postkasseadresse: ",
                            value: info.sikkerDigitalPostAdresse.postkasseadresse
                        }]
                }]);
        }
        if (info.kontaktinformasjon == undefined)
            return;
        if (info.kontaktinformasjon.epostadresse != undefined && info.kontaktinformasjon.epostadresse.epost != undefined)
            this.addDetail("Epost: ", info.kontaktinformasjon.epostadresse.epost, "", this.getDates(info.kontaktinformasjon.epostadresse), this.contactinfo);
        if (info.kontaktinformasjon.mobiltelefonnummer != undefined && info.kontaktinformasjon.mobiltelefonnummer.nummer != undefined)
            this.addDetail("Mobil: ", info.kontaktinformasjon.mobiltelefonnummer.nummer, "", this.getDates(info.kontaktinformasjon.mobiltelefonnummer), this.contactinfo);
    };
    PersonDifiComponent.prototype.getDates = function (infoObject) {
        var detail = [];
        if (infoObject.sistOppdatert != undefined)
            detail.push({
                description: "Sist oppdatert: ",
                value: infoObject.sistOppdatert
            });
        if (infoObject.sistVerifisert != undefined)
            detail.push({
                description: "Sist verifisert: ",
                value: infoObject.sistVerifisert
            });
        return [{ details: detail }];
    };
    PersonDifiComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "person-difi.component.html",
            styleUrls: ['../../tab.css'],
            selector: 'person-difi'
        })
    ], PersonDifiComponent);
    return PersonDifiComponent;
}(person_base_hit_tab_1.PersonBaseHitTab));
exports.PersonDifiComponent = PersonDifiComponent;
//# sourceMappingURL=person-difi.component.js.map
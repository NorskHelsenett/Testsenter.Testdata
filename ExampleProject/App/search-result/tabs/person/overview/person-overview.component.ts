import { Component } from '@angular/core';

import {PersonBaseHitTab} from "../person-base-hit-tab";
import * as moment from "moment/moment";
import {getYearFromDateString, getAgeFromNin, isValidDate } from "../../../../helpers/datehelper";
import {RegisterNames} from "../../../../resources/app-settings";
import { HprJson, PregJson, FlrPasientJson, FLRFastLegeJson } from "../../../../models/JsonModels";
import {HitInformation, Detail } from "../../../../models/UtilityModels";
import {getPostalType} from "../../../../helpers/pregHelper";
import {FastLegeCode} from "../../../../helpers/flrhelper";
import {getGPname} from "../../../../helpers/registerhelper";

@Component({
    selector: 'person-overview',
    moduleId: module.id,
    templateUrl: 'person-overview.component.html',
    styleUrls: ['../../tab.css']
})

export class PersonOverviewComponent extends PersonBaseHitTab{
  

    ngOnInit() {
        this.setDetails();
    }

    setDetails() {
        if (this.item.detail.pregJson != undefined) {
            let gender = +this.item.nin[8] % 2 === 0 ? "Kvinne" : "Mann";
            this.addDetail("Kjønn, alder: ", gender + ", " + (this.item.fodselsDato ? getYearFromDateString(this.item.fodselsDato) : getAgeFromNin(this.item.nin) )+ " år", "", this.getGeneralInformation());
        } else {
            this.addDetail("",
                "Testobjektet har enten ikke registrert fødselsnummer i HPR, eller er ikke registert i PREG, så vi får ikke hentet personinformasjon fra PREG");
        }
      
        if (this.item.detail.hprJson != undefined) {
            let hprinfo = JSON.parse(this
                .getLatestJsonContent(RegisterNames[RegisterNames.Hpr])) as HprJson;
            let godkjenninger = hprinfo.Godkjenninger.filter(godkjenning => {
                    let til = godkjenning.Gyldig.Til;
                    if (til) {
                        return (moment().diff(moment(til)) < 0);
                    }
                    return true;
                }
            ).map(g => g.Helsepersonellkategori.Beskrivelse);
            if (godkjenninger.length > 0)
                this.addDetail("Godkjenning: ", "Autorisert " + godkjenninger.join(", ").toLowerCase());
        }
        if (this.item.detail.fastlegeJson) {
            let fastFlrInfo = JSON.parse(this
                .getLatestJsonContent(RegisterNames[RegisterNames.FlrDoctor])) as FLRFastLegeJson;
            let contracts = fastFlrInfo.Contracts.filter(con => isValidDate(con.Valid.From, con.Valid.To));
            if (contracts.length > 0) {
                let roles = {};

                contracts.forEach(c => {
                    let roleName = c.Relationship.CodeText.toLowerCase();
                    if (roles.hasOwnProperty(roleName)) {
                        roles[roleName].push(c.GPContract.GPOffice
                            .DisplayName
                            ? c.GPContract.GPOffice.DisplayName
                            : c.GPContract.GPOffice.Name);
                    } else
                        roles[roleName] = [
                            c.GPContract.GPOffice
                            .DisplayName
                            ? c.GPContract.GPOffice.DisplayName
                            : c.GPContract.GPOffice.Name
                        ];
                });


                this.addDetail("Yrke: ", "Jobber som " + Object.keys(roles).map(role => role + " (" + roles[role].join(", ") + ")").join(", "));
            }
        }  
    }

    getGeneralInformation() {
        let pregInfo = JSON.parse(this.getLatestJsonContent(RegisterNames[RegisterNames.Preg])) as PregJson;
        let details: HitInformation[] = [];
        let d:Detail[] = [];
        if (this.item !== undefined) {
            d.push(
                    <Detail>{
                        description: "Barn: ",
                        value: this.item.barn.length > 0 ? "Har barn" : "Har ikke barn"
                    }
            );
        }
        if (pregInfo.Addresses.length > 0) {
            pregInfo.Addresses.forEach(address => 
            {
                if (address.PostalType != null)
                    d.push(<Detail>{ description: "Adressetype: ", value: getPostalType(address.PostalType), extra: "adressekode " + address.PostalType });
            });
        }
       
        if (this.item.detail.fastlegePasientJson) {
            let flrInfo = JSON.parse(this.getLatestJsonContent(RegisterNames[RegisterNames.FlrPasient])) as FlrPasientJson;
            if (flrInfo.DoctorCycles.length > 0) {
                let fastlege = flrInfo.DoctorCycles
                    .find(doc => doc.Relationship.CodeValue === FastLegeCode &&
                        isValidDate(doc.Valid.From, doc.Valid.To));
                d.push(<Detail>{ description: "Fastlege: ", value: fastlege === undefined ? "Har ikke fastlege" : getGPname(fastlege.GP) });
            } else 
                d.push(<Detail>{ description: "Fastlege: ", value:"Legeløs liste" });

        }

        details.push(<HitInformation>{ details: d }); 
        return details;
    }    


}
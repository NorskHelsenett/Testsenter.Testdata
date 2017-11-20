import { Component, Input} from "@angular/core";
import { PersonBaseHitTab } from "../person-base-hit-tab";
import {HitInformation, Detail, ChildViews } from "../../../../models/UtilityModels";
import {RegisterNames, sivilStatus } from "../../../../resources/app-settings";
import {PregJson, FlrPasientJson, DoctorCycle, Address } from "../../../../models/JsonModels";
import {getRegStatusDescription, getPostalType } from "../../../../helpers/pregHelper";
import {FastLegeCode, DeleLegeCode } from "../../../../helpers/flrhelper";
import {isValidDate, getDateString, getYearFromDateString, getAgeFromNin } from "../../../../helpers/datehelper";
import {getGPname} from "../../../../helpers/registerhelper";


@Component({
    selector: "person-personal",
    moduleId: module.id,
    templateUrl: "person-personal.component.html",
    styleUrls: ["../../tab.css"]
})
export class PersonPersonalComponent extends PersonBaseHitTab {
    @Input()
    loadingFamily:boolean;
    flrInformation: HitInformation;

    ngOnInit() {
        this.flrInformation = <HitInformation>{
            details: []
        }
        this.setDetails();
    }

    private setDetails() {
        let person = JSON.parse(this.getLatestJsonContent(RegisterNames[RegisterNames.Preg])) as PregJson;
        this.addDetail("Fødselsnummer: ", this.item.nin);
        this.addDetail("Navn i PREG: ", this.getPersonName(person), "", this.getGeneralInformation(person));

        if (person.RegStatus != null)
            this.addDetail("Registreringskode: ",getRegStatusDescription(person.RegStatus), "registreringskode " + person.RegStatus );

        if (person.Addresses === null)
            return;

        for (var address of person.Addresses) {
            if (address.PostalType != null)
                this.addDetail("Adressetype: ", getPostalType(address.PostalType), "adressekode " + address.PostalType +"", this.getAdressDetails(address));
            else
                this.addDetail("", "", "", this.getAdressDetails(address));
        }
        if (this.item.detail.fastlegePasientJson) {
            let flrInfo = JSON.parse(this.getLatestJsonContent(RegisterNames[RegisterNames.FlrPasient])) as FlrPasientJson;
            this.addDetail("Avtalenummer: ", flrInfo.GPContractId, "", undefined, this.flrInformation);
            if (flrInfo.DoctorCycles.length > 0) {
                let fastlege = flrInfo.DoctorCycles
                    .find(doc => doc.Relationship.CodeValue === FastLegeCode &&
                        isValidDate(doc.Valid.From, doc.Valid.To));
                this.addDetail("Fastlege: ", fastlege === undefined ? "Legeløs liste" : getGPname(fastlege.GP), "", this.getPasientContractDetails(flrInfo.DoctorCycles), this.flrInformation );
            } else 
                this.addDetail("Fastlege: ", "Legeløs liste", "", undefined, this.flrInformation);

            let office = flrInfo.GPContract.GPOffice;
            if(office)
                this.addDetail("Fastlegekontor: ",  office.DisplayName ? office.DisplayName : office.Name, "" ,undefined, this.flrInformation);
        }

    }

    getPersonName(person:PregJson) {
        return person.GivenName + " " + (person.MiddleName == undefined ? "" : person.MiddleName + " ") + person.Sn;
    }

    getPasientContractDetails(cycles: DoctorCycle[]): HitInformation[] {
        let detail: Detail[] = [];
        for (let doctor of cycles) {
            if (doctor.Relationship.CodeValue === FastLegeCode || !isValidDate(doctor.Valid.From, doctor.Valid.To))
                continue;
            detail.push(<Detail>{
                description: doctor.Relationship.CodeValue === DeleLegeCode ? "Delelege: " : "Vikar: ",
                value: getGPname(doctor.GP),
                extra: getDateString(doctor.Valid.From, doctor.Valid.To)
            });

        }
        return [<HitInformation>{ details: detail }];

    }


    getAdressDetails(address:Address) {
        let details: HitInformation[] = [];
        if (address.PostalAddress === "" || address.PostalAddress == undefined) return details;

        details.push(<HitInformation>{ details: [<Detail>{ description: "Adresse: ", value: address.PostalAddress + ", " + (address.PostalCode == undefined ? "" : address.PostalCode) + " " + address.PostalPlace }] });
        return details;
    }

    getGeneralInformation(person:PregJson) {
        let details: HitInformation[] = [];
        let gender = +this.item.nin[8] % 2 === 0 ? "Kvinne" : "Mann";
        let d = [<Detail>{ description: "Kjønn, alder: ", value: gender + ", " + (this.item.fodselsDato ? getYearFromDateString(this.item.fodselsDato) : getAgeFromNin(this.item.nin))+ " år" }];
        if (this.item !== undefined) {
            d.push(<Detail>{ description: "Barn: ", value: this.item.barn.length > 0 ? "Har barn" : "Har ikke barn" });
        }
        if (person.MaritalStatus) {
            d.push(<Detail>{ description: "Sivilstatus: ", value: sivilStatus[person.MaritalStatus] });
        }
        if (person.SpouseNIN) {
            d.push(<Detail>{ description: "Ektefelle: ", value: person.SpouseNIN });
        }
        details.push(<HitInformation>{ details: d});
        return details;
    }    

    showFamily() {
        this._showDetails.emit({ view: ChildViews.Family });
    }

    showPregDetails() {
        this.showDetails(ChildViews.Json, this.getLatestJsonContent(RegisterNames[RegisterNames.Preg]));
    }

    showFlrDetails() {
        this.showDetails(ChildViews.Json, this.getLatestJsonContent(RegisterNames[RegisterNames.FlrPasient]));
    }
}




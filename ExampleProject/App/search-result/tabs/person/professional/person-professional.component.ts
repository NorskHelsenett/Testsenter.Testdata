import { Component } from "@angular/core";


import {PersonBaseHitTab} from "../person-base-hit-tab";
import * as moment from "moment/moment";
import {HitInformation, Detail, ChildViews } from "../../../../models/UtilityModels";
import {RegisterNames} from "../../../../resources/app-settings";
import {HprJson, FLRFastLegeJson, Contract, Godkjenninger } from "../../../../models/JsonModels";
import {isValidDate, getDateString } from "../../../../helpers/datehelper";

@Component({
    selector: "person-professional",
    moduleId: module.id,
    templateUrl: "person-professional.component.html",
    styleUrls: ["../../tab.css"]
})
export class PersonProfessionalComponent extends PersonBaseHitTab {

    fadedInformation: HitInformation;
    flrInformation: HitInformation;

    ngOnInit() {
        this.fadedInformation = <HitInformation>{
            details: [],
            faded: true
        }
        this.flrInformation = <HitInformation>{
            details: [],
        }
        this.setDetails();

    }

    setDetails() {
        let person = JSON.parse(this.getLatestJsonContent(RegisterNames[RegisterNames.Hpr])) as HprJson;

        this.addDetail("HPR-nummer: ", this.item.hprNr);
        this.addDetail("Navn i HPR: ", this.getPersonName(person));
        for (let godkjenning of person.Godkjenninger) {

            let date = godkjenning.Gyldig.Til ? moment(godkjenning.Gyldig.Til) : undefined;
            this.addDetail("Kategori: ",
                godkjenning.Helsepersonellkategori.Beskrivelse,
                (date ? "Gyldig til " + date.format("DD/MM YYYY") : "Ikke oppgitt sluttdato"),
                this.getGodkjenningDetails(godkjenning), isValidDate(godkjenning.Gyldig.Fra, godkjenning.Gyldig.Til) ? this.information : this.fadedInformation );
        }

        if (this.item.detail.fastlegeJson) {
            let flrInfo = JSON.parse(this.getLatestJsonContent(RegisterNames[RegisterNames.FlrDoctor])) as FLRFastLegeJson;
            for (let contract of flrInfo.Contracts) {
                if(isValidDate(contract.Valid.From, contract.Valid.To)){
                    let status = contract.GPContract.Status.CodeText;
                    this.addDetail("Avtalenummer: ", contract.GPContractId, status, this.getContractDetail(contract), this.flrInformation);
                }
            }
               
        }

    }

    getPersonName(person: HprJson) {
        return person.Fornavn +
            (person.Mellomnavn == undefined ? " " : ` ${person.Mellomnavn}`) +
            ` ${person.Etternavn}`;
    }
    

    getContractDetail(contract: Contract) {
        let detail: Detail[] = [];
        if (contract.Relationship) {
            detail.push(<Detail>{ description: "Stilling: ", value: contract.Relationship.CodeText, extra: contract.Relationship.CodeValue === "LPVI" ? getDateString(contract.Valid.From, contract.Valid.To) : ""});
        }
        if (contract.GPContract.GPOffice) {
            let office = contract.GPContract.GPOffice;
            detail.push(<Detail>{ description: "Fastlegekontor: ", value: office.DisplayName ? office.DisplayName : office.Name });

        }
        return [<HitInformation>{ details: detail }];
    }

    

    getGodkjenningDetails(godkjenning: Godkjenninger) {
        let detail: Detail[] = [];
        if (godkjenning.Rekvisisjonsretter.length > 0) {
            let rekvisjoner = godkjenning.Rekvisisjonsretter.map(rek => rek.Type.Beskrivelse);
            detail.push(<Detail>{ description: "Rekvisisjonsrett: ", value: rekvisjoner.join(", ") });
        }
        if (godkjenning.Spesialiteter.length > 0) {
            let spes = godkjenning.Spesialiteter.map(s => s.Type.Beskrivelse);
            detail.push(<Detail>{ description: "Spesialitet: ", value: spes.join(", ") });
        }
        if (godkjenning.Autorisasjon !== null) {
            detail.push(<Detail>{ description: "Autorisasjon: ", value: godkjenning.Autorisasjon.Beskrivelse });
        }
        if (godkjenning.AvsluttetStatus !== null) {
            detail.push(<Detail>{ description: "Avsluttet status: ", value: godkjenning.AvsluttetStatus.Beskrivelse });

        }
        return [<HitInformation>{ details: detail }];

    }

    showHprDetails() {
        this.showDetails(ChildViews.Json, this.getLatestJsonContent(RegisterNames[RegisterNames.Hpr]));
    }

    showFlrDetails() {
        this.showDetails(ChildViews.Json, this.getLatestJsonContent(RegisterNames[RegisterNames.FlrDoctor]));
    }
}
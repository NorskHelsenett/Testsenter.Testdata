import { Component } from "@angular/core";
import { Detail, HitInformation } from "../../../../models/UtilityModels";
import { BusinessBaseHitTab } from "../business-base-hit-tab";
import {FastLegeCode} from "../../../../helpers/flrhelper";
import {isValidDate} from "../../../../helpers/datehelper";
import {getGPname} from "../../../../helpers/registerhelper";

@Component({
    selector: 'business-flr',
    moduleId: module.id,
    templateUrl: 'business-flr.component.html',
    styleUrls: ['../../tab.css']
})
export class BusinessFlrComponent extends BusinessBaseHitTab {

    gpInformation: HitInformation;
    statusInformation: HitInformation;


    ngOnInit() {
        this.gpInformation = <HitInformation>{
            details: []
        }
        this.statusInformation = <HitInformation>{
            details: []
        }
        let flr = JSON.parse(this.item.detail.flrJson);
        if (flr != undefined && flr.length > 0) {
            flr.forEach((contract:any) => this.getContractDetails(contract));
        }
    }

    getContractDetails(contract: any) {
        if (contract.DoctorCycles == undefined)
            return;
        let fastlege = contract.DoctorCycles
            .find((doc:any) => doc.Relationship.CodeValue === FastLegeCode &&
                isValidDate(doc.Valid.From, doc.Valid.To));

       
        this.addDetail("", contract.Id);
        this.addDetail("", fastlege === undefined ? "Legeløs liste" : getGPname(fastlege.GP), "", null, this.gpInformation);
        this.addDetail("", contract.Status.CodeText, "", null, this.statusInformation);
    }
    showBedRegDetails() {
        this.showJsonDetails(this.item.detail.flrJson);
    }
}

import { Component } from "@angular/core";
import { ChildViews, HitInformation } from "../../../../models/UtilityModels";
import {BusinessBaseHitTab} from "../business-base-hit-tab";

@Component({
    selector: 'business-ar',
    moduleId: module.id,
    templateUrl: 'business-ar.component.html',
    styleUrls: ['../../tab.css']
})
export class BusinessArComponent extends BusinessBaseHitTab {

    ar:any;
    compartInformation:HitInformation;

    /*
        Type:
    	None	        0	Ingen kommunikasjonspart
        Person	        1	Person
        Organization	2	Virksomhet/enhet fra enhetsregisteret
        Department	    8	Avdeling. Kan også være en bedrift fra bedrifts- og foretaksregisteret (BoF)
        Service	        4	Tjeneste
        All	            15	Alle. Kan være hvilken som helst av de over.
    */

    ngOnInit() {
        this.ar = JSON.parse(this.item.detail.arJson);
        this.compartInformation = <HitInformation>{
            details: []
        };
        this.setDetails();
        this.setCompartInformation();
    }

    showArDetails() {
        this.showDetails(ChildViews.Json, this.item.detail.arJson);
    }
    setDetails(): void {
        if(this.ar.BusinessType)
            this.addDetail("Virksomhetstype: ", this.ar.BusinessType.CodeText, this.ar.BusinessType.CodeValue);
        if (this.ar.Type === 1)
            this.addDetail("Virksomhetstype: ","Person");
      
        if (this.ar.Properties) {
            let prop = this.ar.Properties.find((property: any) => property.SimpleType === "osean_status");
            if (prop)
                this.addDetail(prop.CodeText + ": ", prop.CodeValue == true ? "Ja" : "Nei");
        }
        if (this.ar.ElectronicAddresses) {
            let edi = this.ar.ElectronicAddresses.find((adr: any) => adr.Type.CodeValue === "E_EDI");
            if (edi)
                this.addDetail("EDI-adresse: " + edi.Address);
        }
    }

    setCompartInformation(): void {
        if (this.ar.People != undefined && this.ar.People.length > 0) {
            this.ar.People.forEach((person: any) => {
                this.addDetail("", person.Name, person.HerId,undefined,this.compartInformation);
            });
        }
    }

}

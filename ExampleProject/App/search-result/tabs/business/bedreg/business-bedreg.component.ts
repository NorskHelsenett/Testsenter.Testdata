import { Component } from "@angular/core";
import { Detail, HitInformation } from "../../../../models/UtilityModels";
import {BusinessBaseHitTab} from "../business-base-hit-tab";

@Component({
    selector: 'business-bedreg',
    moduleId: module.id,
    templateUrl: 'business-bedreg.component.html',
    styleUrls: ['../../tab.css']
})
export class BusinessBedRegComponent extends BusinessBaseHitTab {

    servicesInformation: HitInformation;


    ngOnInit() {
        this.servicesInformation = <HitInformation>{
            details: []
        }
        let bedreg = JSON.parse(this.item.detail.bedRegJson);
        if (bedreg.PhysicalAddresses && bedreg.PhysicalAddresses.length > 0) {
            console.log(bedreg.PhysicalAddresses);
            this.getAddressDetails(bedreg.PhysicalAddresses.find((p: any) => p.Type.CodeValue === "RES"), "Besøksadresse: ");
            this.getAddressDetails(bedreg.PhysicalAddresses.find((p: any) => p.Type.CodeValue === "PST"), "Postadresse: ");
        }
        if (bedreg.ElectronicAddresses && bedreg.ElectronicAddresses.length > 0) {
            this.addDetail("Elektroniske adresser: ", "", "", this.getEAddresses(bedreg.ElectronicAddresses));
        }
        if (bedreg.Properties) {
            let services = this.getServices(bedreg.Properties);
            let fs = bedreg.Properties.find((ser: any) => ser.SimpleType == undefined && ser.SimpleType === "osean_status");
            if (fs)
                this.addDetail(fs.CodeText, "");
            if(services.length > 0)
                this.addDetail("Digital dialog: ", "" ,"", services);
        }
    }

    getAddressDetails(address: any, description: string) {
        if (address == undefined || address.StreetAddress === "" || address.StreetAddress == undefined)
            return;
        this.addDetail(description, address.StreetAddress +
            ", " +
            (address.PostalCode == undefined ? "" : address.PostalCode) +
            " " +
            address.City);
    }

    getEAddresses(addresses: any): HitInformation[] {
        let details: Detail[] = [];
        let codes = ["E_EPO", "E_TLF", "E_FAX", "E_URL"];
        codes.forEach((code: string) => {
            let detail = addresses.find((adr: any) => adr.Type.CodeValue === code);
            if (detail != undefined)
                details.push(<Detail>{ description: detail.Type.CodeText + ": ", value: detail.Address });
        });
        return [<HitInformation>{ details: details }];
    }

  
    getServices(properties: any): HitInformation[] {
        let details: Detail[] = [];
        let codes = ["dd_bestill_time", "dd_forny_resept", "dd_start_ekonsultasjon", "dd_kontakt_legekontor"];
        codes.forEach((code: string) => {
            let detail = this.getServiceDetails(properties.find((adr: any) => adr.SimpleType === code));
            if (detail != undefined)
                details.push(detail);
        });
        return details.length > 0 ? [<HitInformation>{ details: details }] : [];
    }

    getServiceDetails(service: any) {
        if (service == undefined || service.SimpleType == undefined)
            return;
        let description = service.SimpleType.replace(/dd/g, "").replace(/_/g, " ").trim();
        return <Detail>{ description: description.charAt(0).toUpperCase() + description.slice(1).toLowerCase() + ": ", value: service.CodeValue };
    }
    showBedRegDetails() {
        this.showJsonDetails(this.item.detail.bedRegJson);
    }
}

import { Component } from '@angular/core';

import {PersonBaseHitTab} from "../person-base-hit-tab";
import {HitInformation, DifiStatus, DifiVarsel, Detail } from "../../../../models/UtilityModels";
import {DifiJson} from "../../../../models/DataModels";
import {DigitalMailProvider} from "../../../../resources/app-settings";

@Component({
    moduleId: module.id,
    templateUrl: "person-difi.component.html",
    styleUrls: ['../../tab.css'],
    selector: 'person-difi'
})
export class PersonDifiComponent extends PersonBaseHitTab {

    contactinfo: HitInformation = <HitInformation>{
        details: [],
        faded: false
    };

    ngOnInit() {
        let info = JSON.parse(this.item.detail.difiInformationJson) as DifiJson;
        this.addDetail("Status: ", DifiStatus[info.status]);
        this.addDetail("Reservert: ", info.reservasjon ? "Ja" : "Nei");
        this.addDetail("Kan motta varsling: ", DifiVarsel[+info.varslingsstatus]);
       
        if (info.sikkerDigitalPostAdresse != undefined) {
            let index = Object.keys(info.sikkerDigitalPostAdresse);
            console.log(index);
            //Midlertidig kode 
            this.addDetail("Elektronisk postkasse: ", DigitalMailProvider[info.sikkerDigitalPostAdresse[index[1]]],info.sikkerDigitalPostAdresse[index[1]],[<HitInformation>{
                details: [<Detail>{
                    description: "Postkasseadresse: ",
                    value: info.sikkerDigitalPostAdresse.postkasseadresse
                }]
            }]);  
        }
            

        if (info.kontaktinformasjon == undefined)
            return;
        if (info.kontaktinformasjon.epostadresse != undefined && info.kontaktinformasjon.epostadresse.epost != undefined)
            this.addDetail("Epost: ", info.kontaktinformasjon.epostadresse.epost,"",this.getDates(info.kontaktinformasjon.epostadresse),this.contactinfo);
        if(info.kontaktinformasjon.mobiltelefonnummer != undefined && info.kontaktinformasjon.mobiltelefonnummer.nummer != undefined)
            this.addDetail("Mobil: ", info.kontaktinformasjon.mobiltelefonnummer.nummer, "", this.getDates(info.kontaktinformasjon.mobiltelefonnummer), this.contactinfo);
    }

    getDates(infoObject: any) {
        let detail: Detail[] = [];
        if (infoObject.sistOppdatert != undefined)
            detail.push(<Detail>{
                description: "Sist oppdatert: ",
                value: infoObject.sistOppdatert
            });
        if (infoObject.sistVerifisert != undefined)
            detail.push(<Detail>{
                description: "Sist verifisert: ",
                value: infoObject.sistVerifisert
            });
        return [<HitInformation>{ details: detail }];
    }
}
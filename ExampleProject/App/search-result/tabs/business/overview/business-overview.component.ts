import { Component } from "@angular/core";
import {ChildViews } from "../../../../models/UtilityModels";
import {BusinessBaseHitTab} from "../business-base-hit-tab";

@Component({
    selector: 'business-overview',
    moduleId: module.id,
    templateUrl: 'business-overview.component.html',
    styleUrls: ['../../tab.css']
})
export class BusinessOverviewComponent extends BusinessBaseHitTab {
    
    bedreg:any;
    hasChildren:boolean;
    ngOnInit() {
        console.log(this.item);
        this.addDetail("Navn: ", this.item.name);
        this.addDetail("Organisasjonsnummer: ", this.item.organizationNumber);
        this.addDetail("HER-ID: ", this.item.herId);
        this.addDetail("Resh-ID: ", this.item.reshId);
        this.addDetail("Organisasjonsnavn: ", this.item.name);
        this.addDetail("Visningsnavn: ", this.item.displayName);
        if (this.item.detail.bedRegJson) {
            this.bedreg = JSON.parse(this.item.detail.bedRegJson);
            this.hasChildren = this.bedreg.Children != undefined;
            this.addDetail("Foreldenhet i BREG: ", this.bedreg.ParentOrganizationName, this.bedreg.ParentOrganizationNumber);
            this.addDetail("Antall underenheter i BREG: ", this.hasChildren ? this.bedreg.Children.length : undefined);
        }
       
    }

    //getChilds(bedreg:any) {
    //    if (bedreg.Children && bedreg.Children.length > 0) {
    //        let detail: Detail[] = [];
    //        bedreg.Children.forEach((child: any) => {
    //            detail.push(<Detail>{
    //                description: "Organisasjonsnavn: ",
    //                value: child.Name,
    //                extra: child.OrganizationNumber
    //            });
    //        });
    //        return [<HitInformation>{ details: detail }];
    //    }
    //}

   

    showBedregChildren() {
        this.showDetails(ChildViews.Json, JSON.stringify(this.bedreg.Children));
    }

    showHtkDetails() {
        this.showDetails(ChildViews.Json, this.item.detail.htkJson);
    }

    showReshDetails() {
        this.showDetails(ChildViews.Json, this.item.detail.reshJson);
    }

}
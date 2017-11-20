import { Component, Input } from "@angular/core";
import { RegisterBusiness, BusinessDetails } from "../../../models/DataModels";
import {DataManagerService} from "../../../core/services/data-manager.service";
import { CodeManagerService } from "../../../core/services/codes-manager.service";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
declare var $: any;

@Component({
    selector: "business-search-detail",
    moduleId: module.id,
    templateUrl: "business-search-detail.component.html",
    styleUrls: ["../search-result.css"]
})
export class BusinessSearchDetailComponent{

    @Input()
    business: RegisterBusiness;

    taglist: string[];
    ignore: boolean;
    loading: boolean;
    showDetails: boolean;
    type: Observable<string>;

    constructor(private dataManagerService: DataManagerService, private codeManager:CodeManagerService) { }

    ngOnInit() {
        this.taglist = this.business.tags.map(t => this.dataManagerService.getTagName(t));
        this.type = this.getBusinessInfo();
    }

    ngAfterViewInit() {
        $(`#${this.business.commonIdentifier}-accordion`).accordion();
    }

    getId(): string {
        if (this.business.organizationNumber != undefined)
            return this.business.organizationNumber;

        if (this.business.herId != undefined)
            return this.business.herId;

        return this.business.reshId;
    }

    getBusinessDetail(event: any) {
        //Ignore double clicks
        if (this.ignore) {
            event.stopPropagation();
            return;
        }
        this.ignore = true;
        setTimeout(() => this.ignore = false, 500);


        this.loading = true;
        this.showDetails = !this.showDetails;
        this.dataManagerService.getCachedBusinessDetails(this.business).subscribe((res: BusinessDetails) => {
            this.business.detail = res;
            this.loading = false;
        });
    }


    getTagName(id: string) {
        return this.dataManagerService.getTagName(id);
    }


    addTag(tag: string) {
        if (this.taglist.indexOf(tag) !== -1)
            this.taglist.push(tag);
    }

    removeTag(tag: string) {
        this.taglist.splice(this.taglist.findIndex(t => t === tag), 1);
    }

    getBusinessInfo() {
        let name = "";
        if (this.business.businessType) {
            let type = this.business.businessType;
            if (type === "101") {
                if (this.business.isInFlr)
                    return of("Fastlegekontor");
                else
                    return of( this.business.htkIsGovernmentCompany ? "Helseforetak" : "Privat sykehus");
            } else {
                return this.codeManager.getCodeNameOidAsync(type, 9040);
            }

        } else if (this.business.industryCodes && this.business.industryCodes.length > 0) {
            return this.codeManager.getCodeNamesAsync(this.business.industryCodes, "naringskode");
        } else if (this.business.communicationPartyType) {
            return of(this.business.communicationPartyType);
        }
            return of("Ukjent");

    }
}

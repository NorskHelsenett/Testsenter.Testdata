import { Component, Input } from "@angular/core";


import { RegisterPerson, PersonDetails } from "../../../models/DataModels";
import {getPersonColor, setStarStatus } from "../../../helpers/registerhelper";
import {DataManagerService} from "../../../core/services/data-manager.service";
import {UserManagerService} from "../../../core/services/user-manager.service";
declare var $: any;


@Component({
    selector: "person-search-detail",
    moduleId: module.id,
    templateUrl: "person-search-detail.component.html",
    styleUrls: ["person-search-detail.component.css"]
})
export class PersonSearchDetailComponent {
    @Input()
    person: RegisterPerson;

    ignore:boolean;

    detail: PersonDetails;

    loading: boolean;
    showDetails: boolean;
    taglist: string[];

    starState:number;


    constructor(private dataManagerService: DataManagerService, private userManagerService: UserManagerService) {}

    ngOnInit() {
        this.taglist = this.person.tags.map(t => this.dataManagerService.getTagName(t));
        setStarStatus(this.userManagerService.getProjectIdAsync(), this.person);

    }

    ngAfterViewInit() {
        $(`#${this.person.commonIdentifier}-accordion`).accordion();
    }

    getPersonColor() {
        return getPersonColor(this.person.status);
    }

    getPersonInfo() {
        if (this.person.info === "Utgått autorisasjon")
            return this.person.info;
        if (this.person.info == undefined) return "";
        if (this.person.fastlegestillinger && this.person.fastlegestillinger.some(f => f === "LPFL"))
            return "Fastlege";
        let array = this.person.info.split(", ");
        return array.slice(0, 2).join(", ") + (array.length > 2 ? " (..) " : "");
    }

    getPersonName() {
        let name = this.person.pregName !== null ? this.person.pregName : this.person.hprName;
        return name;
    }

    setClasses() {
        if (this.person.starState === undefined) return;
        const classes =
         {
                empty: this.person.starState === 3 || this.person.starState === 4,
                half: this.person.starState === 4,
            hodorgreen: true,
            star: this.person.starState > 1,
            icon: true,
            large: true
        };

        return classes;
    }


    getPersonDetail(event: any) {
        //Ignore double clicks
        if (this.ignore) {
            event.stopPropagation();
            return;
        }
        this.ignore = true;
        setTimeout(() => this.ignore = false, 500);


        this.loading = true;
        this.showDetails = !this.showDetails;
        this.dataManagerService.getCachedPersonDetails(this.person).subscribe((res: PersonDetails) => {
            this.person.detail = res;
            this.loading = false;

        });
    }

    getTagName(id: string) {
        return this.dataManagerService.getTagName(id);
    }

    get starstateExplantion() {
        if (this.person.starState === undefined) return "";

        switch (this.person.starState) {
            case 1:
                return "Ikke overvåket av noe prosjekt";
            case 2:
                return "Overvåket av ditt prosjekt";
            case 3:
                return "Overvåket av et annet prosjekt";
            case 4:
                return "Overvåket av ditt prosjekt og et eller flere andre prosjekter";
            default:
                return "";
        }
    }

    addTag(tag: string) {
        if(this.taglist.indexOf(tag) !== -1)
            this.taglist.push(tag);
    }

    removeTag(tag: string) {
        this.taglist.splice(this.taglist.findIndex(t => t === tag), 1);
    }
}
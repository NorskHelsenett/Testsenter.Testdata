import { Component, Input, Output, EventEmitter } from "@angular/core";
import {RegisterPerson, Tag } from "../../../models/DataModels";
import {Family} from "../../../shared/detailedWindow/family/familymodels";
import {ChildViews, HodorIndexes } from "../../../models/UtilityModels";
import {ApiService} from "../../../core/services/api.service";
import {DataManagerService} from "../../../core/services/data-manager.service";

declare var $: any;


@Component({
    selector: "person-detail",
    moduleId: module.id,
    templateUrl: "person-detail.component.html",
    styleUrls: ["person-detail.component.css"]
})
export class PersonDetailComponent {

    @Input()
    person: RegisterPerson;

    commonid:number | string;

    currentHit: any;
    family: Family;

    currentView: ChildViews = ChildViews.None;

    errorMessage: string;
    surveillanceColor: string;
    contentAsJson: string;
    jsonDiff: string;
    personColor: string;

    loadingFamily: boolean;

    containsProfessionalInformation: boolean;
    containsPersonInformation: boolean;
    containsDifiInformation: boolean;
    tags: Tag[];

    public childViews = ChildViews;

    @Output()
    newTag = new EventEmitter<string>();
    @Output()
    removeTag = new EventEmitter<string>();

    constructor(private apiService: ApiService, private dataManagerService:DataManagerService) { }


    ngOnChanges() {
        this.checkInformation();
        this.commonid = this.person.commonIdentifier;
        this.dataManagerService.tags$.subscribe((tags: Tag[]) => {
            this.tags = tags;
        });
    }

    ngAfterViewInit() {
        $(`#${this.commonid} .menu .item`).tab(
            {
                context: $(`#${this.commonid}`)
            }
        );
        if (this.person.tags != undefined) {
            $(`#${this.commonid}-dropdown`).dropdown("set selected", this.getTagNames(this.person.tags) );

        }
        $(`#${this.commonid}-dropdown`)
            .dropdown({
                allowAdditions: true,
                forceSelection: false,
                onAdd: (value: string, text: string) => {
                    this.newTag.emit(text);
                    this.dataManagerService.addTag(text, String(this.commonid), this.person, HodorIndexes.Person);
                },
                onRemove: (value: string, text: string) => {
                    this.removeTag.emit(text);
                    this.dataManagerService.removeTag(text, String(this.commonid), this.person, HodorIndexes.Person);
                }
                
            });
        

    }

    getTagNames(tags: string[]): string[]{
        return tags.map(t => this.dataManagerService.getTagName(t));
    }

    checkInformation() {
        this.containsPersonInformation = this.person.detail.pregJson != undefined;
        this.containsProfessionalInformation = this.person.detail.hprJson != undefined;
        this.containsDifiInformation = this.person.detail.difiInformationJson != undefined;
    }

    getFamily() {
        if (this.currentView === ChildViews.Family) {
            this.currentView = ChildViews.None;
            return;
        }
        this.loadingFamily = true;
        this.apiService.getFamily(this.person.commonIdentifier).subscribe((data: any) => {
                this.family = new Family(data);
                this.currentView = ChildViews.Family;
                this.loadingFamily = false;
            }, (error: string) => 
            console.log(`Somthing went wrong while getting family from the server. Error: ${error}`));
    }

    showDetails(event: any) {
        switch (event.view) {
            case ChildViews.Family:
                this.getFamily();
                break;
            case ChildViews.Json:
                if (this.currentHit === event.data && this.currentView === ChildViews.Json) {
                    this.currentView = ChildViews.None;
                    return;
                }
                this.currentHit = event.data;
                this.currentView = ChildViews.Json;
                break;
            default:
                break;
        }
    }

    closeDetails(view: ChildViews) {
        this.currentView = view;
    }

}
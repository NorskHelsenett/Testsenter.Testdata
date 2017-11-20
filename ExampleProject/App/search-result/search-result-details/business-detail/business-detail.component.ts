import { Component, Input, Output, EventEmitter } from "@angular/core";
import {RegisterBusiness, Tag } from "../../../models/DataModels";
import {ChildViews, HodorIndexes } from "../../../models/UtilityModels";
import {ApiService} from "../../../core/services/api.service";
import {DataManagerService} from "../../../core/services/data-manager.service";

declare var $: any;

@Component({
    selector: "business-detail",
    moduleId: module.id,
    templateUrl: "business-detail.component.html",
    styleUrls: ["business-detail.component.css"]
})
export class BusinessDetailComponent {

    @Input()
    business: RegisterBusiness;

    currentView: ChildViews = ChildViews.None;
    childViews = ChildViews;
    contentAsJson: string;
    tags: Tag[];
    currentHit: any;
    commonid: string;
    containsBedRegInformation: boolean;
    containsArInformation: boolean;
    containsFlrInformation: boolean;
    @Output()
    newTag = new EventEmitter<string>();
    @Output()
    removeTag = new EventEmitter<string>();

    constructor(private apiService: ApiService, private dataManagerService: DataManagerService) { }

    ngOnChanges() {
        this.checkInformation();
        this.commonid = this.business.commonIdentifier;
        console.log(this.business);
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
        if (this.business.tags != undefined) {
            $(`#${this.commonid}-dropdown`).dropdown("set selected", this.getTagNames(this.business.tags));

        }
        $(`#${this.commonid}-dropdown`)
            .dropdown({
                allowAdditions: true,
                forceSelection: false,
                onAdd: (value: string, text: string) => {
                    this.newTag.emit(text);
                    this.dataManagerService.addTag(text, String(this.commonid), this.business, HodorIndexes.Business);
                },
                onRemove: (value: string, text: string) => {
                    this.removeTag.emit(text);
                    this.dataManagerService.removeTag(text, String(this.commonid), this.business, HodorIndexes.Business);
                }

            });
    }



    getTagNames(tags: string[]): string[] {
        return tags.map(t => this.dataManagerService.getTagName(t));
    }

    showDetails(event: any) {
        switch (event.view) {
      
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

    checkInformation(): void {
        this.containsBedRegInformation = this.business.detail.bedRegJson != undefined;
        this.containsArInformation = this.business.detail.arJson != undefined;
        this.containsFlrInformation = this.business.detail.flrJson != undefined;
    }
}
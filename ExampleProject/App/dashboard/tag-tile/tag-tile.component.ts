import { Component, Input } from "@angular/core";
import {OwnedBy} from "../../models/UtilityModels";
import {Tag} from "../../models/DataModels";
import {FilterManagerService} from "../../core/services/filter-manager.service";
import {DataManagerService} from "../../core/services/data-manager.service";
import {UserManagerService} from "../../core/services/user-manager.service";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: "tag-tile",
    templateUrl: "tag-tile.component.html",
    styleUrls: ["../dashboard.component.css"]

})

export class TagTileComponent {
    @Input()
    selected: OwnedBy;
    public ownedBy = OwnedBy;

    numberToShow:number = 15;
    display: number = 15;
    taglist: Tag[];

    deleting:boolean;

    constructor(private filterManager: FilterManagerService, private dataManager: DataManagerService, private userManager: UserManagerService) {
       
    }

    ngOnInit() {
        this.dataManager.tags$.subscribe(tags => {
            this.userManager.getNameAsync().subscribe(name => {
                this.taglist = this.selected === OwnedBy.All
                    ? tags.filter(s => s.registeredBy !== name)
                    : tags.filter(s => s.registeredBy === name);
                setTimeout(() =>$(".deleteTag").popup({
                    on: "click"
                }), 1000);
            });
        });

        this.dataManager.deletedTag$.subscribe(() => {
            this.deleting = false;
            $(".deleteTag").popup("hide");
        })
    }
    search(tag: Tag) {
       this.filterManager.searchWithTag(tag.name);
    }

    openPopup(event:any) {
        event.stopPropagation();
    }

    closeConfirmation(event: any) {
        event.stopPropagation();
        $(".deleteTag").popup("hide");
    }

    deleteTag(tag: Tag, event: any) {
        event.stopPropagation();
        this.deleting = true;
        this.dataManager.deleteTag(tag);
    }


}
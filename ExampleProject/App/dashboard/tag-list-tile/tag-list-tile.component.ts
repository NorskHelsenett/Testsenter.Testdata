import { Component } from "@angular/core";
import {Tag} from "../../models/DataModels";
import {DataManagerService} from "../../core/services/data-manager.service";
import {UserManagerService} from "../../core/services/user-manager.service";
import {FilterManagerService} from "../../core/services/filter-manager.service";
import {projectNames} from "../../resources/app-settings";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: "taglist",
    templateUrl: "tag-list-tile.component.html",
    styleUrls: ["../dashboard.component.css"]
})

export class TagListTileComponent {
    taglist: Tag[];

    sortBy: number;
    sortDir: boolean;
    sortArray = ["name", "registeredBy", "teamProjectInt"];

    asc = "sorted ascending";
    desc = "sorted descending";

    tagClass: string;
    byClass: string; 
    projectClass: string;
    searchWord:string;

    projectValue: any;

    public projectNames = projectNames;

    constructor(private dataManager: DataManagerService, private userManager: UserManagerService, private filterManager: FilterManagerService){}
    ngOnInit() {
        this.dataManager.tags$.subscribe(tags => {
            this.taglist = tags;
        });
    }

    ngAfterViewInit() {
        $('#projectDropdown').dropdown();
    }

    sortOn(heading: number) {
        let dir = this.desc;
        if (heading === this.sortBy) {
            dir = this.sortDir ? this.desc : this.asc;
            this.sortDir = !this.sortDir;
        } else {
            this.sortDir = false;
        }
        this.sortBy = heading;

        this.tagClass = "";
        this.byClass = "";
        this.projectClass = "";

        switch (heading) {
            case 0:
                this.tagClass = dir;
                break;
            case 1:
                this.byClass = dir;
                break;
            case 2:
                this.projectClass = dir;
                break;
        }
    }

    search(tag:Tag) {
        this.filterManager.searchWithTag(tag.name);
    }
}
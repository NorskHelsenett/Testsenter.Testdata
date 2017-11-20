import { Component } from "@angular/core";
import {SearchQuery} from "../../models/DataModels";
import {OwnedBy, HodorIndexes } from "../../models/UtilityModels";
import {DataManagerService} from "../../core/services/data-manager.service";
import {SearchManagerService} from "../../core/services/search-manager.service";
import {MediatorService} from "../../core/services/mediator.service";


declare var $: any;

@Component({
    selector: "saved-search",
    moduleId: module.id,
    templateUrl: "saved-search.component.html",
    styleUrls: ["saved-search.component.css"]
})
export class SavedSearchComponent {

    searchList: SearchQuery[] = [];
    currentSelection: SearchQuery;
    public ownedBy = OwnedBy;
    selected = OwnedBy.Me;
    index:HodorIndexes;
    constructor(private dataManager: DataManagerService, private searchManager:SearchManagerService, private mediator:MediatorService) {
    }

    ngOnInit() {
        this.searchManager.savedSearchList$.subscribe((list: SearchQuery[]) => {
            if(this.searchList.length === list.length)
                $(".savedSearchList").dropdown("clear");
            this.searchList = list;
        });
        this.mediator.searchTerm$.subscribe(active => {
            if (this.currentSelection && this.currentSelection !== active) {
                this.restoreDropdown();
                this.currentSelection = undefined;
            }
        });
        this.mediator.indexSwitch$.subscribe((index) => this.index = index);
        this.mediator.userInfo$.subscribe(() => this.selected = OwnedBy.Me);
    }

    restoreDropdown() {
        $(".savedSearchList").dropdown("clear");
    }

    ngAfterViewInit() {
        $(".savedSearchList").dropdown({
            forceSelection: false,
            sortSelect: true,
            onChange: (value: string) => {
                let search = this.searchList.find(s => s.dbName === value);
                if (search) {
                    this.currentSelection = search;
                    this.searchManager.performeSavedSearch(search);
                }
            }
        });
    }
}
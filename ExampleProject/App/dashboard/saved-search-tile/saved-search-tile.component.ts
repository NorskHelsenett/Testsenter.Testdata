import { Component, Input } from "@angular/core";
import {SearchManagerService} from "../../core/services/search-manager.service";
import {OwnedBy} from "../../models/UtilityModels";
import {SearchQuery} from "../../models/DataModels";
import {MediatorService} from "../../core/services/mediator.service";
import {UserManagerService} from "../../core/services/user-manager.service";

declare var $: any;
@Component({
    moduleId: module.id,
    selector: "saved-search-tile",
    templateUrl: "saved-search-tile.component.html",
    styleUrls: ["../dashboard.component.css"]
})

export class SavedSearchTileComponent {
    @Input()
    selected: OwnedBy;

    public ownedBy = OwnedBy;
    searchList: SearchQuery[];
    fullList: SearchQuery[];
    numberToShow: number = 5;
    display: number = 5;
    loading:boolean;

    constructor(private searchManager: SearchManagerService, private mediatorService: MediatorService, private userManager:UserManagerService) { }

    ngOnInit() {
        this.loading = true;
        this.searchManager.savedSearchList$.subscribe((list: SearchQuery[]) => {
            this.userManager.getUserNameAsync().subscribe(name => {
                this.loading = false;
                this.searchList = this.selected === OwnedBy.All ? list.filter(s => s.registeredBy !== name) :
                    list.filter(s => s.registeredBy === name);
                setTimeout(() => $('.filteraccordion').accordion(), 1000);
            });
        });
    }

    ngAfterViewInit() {
        $('.filteraccordion').accordion();
    }

    refresh() {
        $('.filteraccordion').accordion();
    }


    search(query: SearchQuery) {
        this.searchManager.performeSavedSearch(query);
    }

    changeLength() {
        this.display = this.display === this.numberToShow ? this.searchList.length : this.numberToShow;
            setTimeout(() => this.refresh(), 1000);

    }


}
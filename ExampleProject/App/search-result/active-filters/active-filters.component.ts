import { Component} from "@angular/core";
import {FilterItem, SearchQuery } from "../../models/DataModels";
import {FilterManagerService} from "../../core/services/filter-manager.service";
import {MediatorService} from "../../core/services/mediator.service";
import {SearchManagerService} from "../../core/services/search-manager.service";
import {UserManagerService} from "../../core/services/user-manager.service";
import {getYearFromDateString} from "../../helpers/datehelper";


declare var $: any;
@Component({
    selector: "active-filters",
    moduleId: module.id,
    templateUrl: "active-filters.component.html",
    styleUrls: ["active-filters.component.css"]
})

export class ActiveFiltersComponent {

    activeFilters:FilterItem[] = [];
    private term: SearchQuery;
    error: boolean;
    deleting: boolean;
    saving: boolean;
    userName: string;

    savable = false;
    ownedByUser = false;
    activeFilterCount = 0;

    subscriptions:any[] = [];
    constructor(private filterManager: FilterManagerService,
        private mediator: MediatorService,
        private searchManager: SearchManagerService,
        private userManger: UserManagerService) {
    }

    ngOnInit() {
        this.term = new SearchQuery();
        this.subscriptions.push(this.filterManager.activeFilters$.subscribe(filters => {
            this.activeFilters = filters;
            this.isSavable();
            this.setActiveFilterCount();
        }));
        this.subscriptions.push(this.mediator.searchTerm$.subscribe((term) => {
            this.term = term;
            this.isSavable();
            this.isOwnedByUser();
            this.setActiveFilterCount();

        }));
        this.subscriptions.push(this.userManger.getUserNameAsync().subscribe((name) => {
            this.userName = name;
            this.isOwnedByUser();
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    setActiveFilterCount() {
        this.activeFilterCount = this.activeFilters.length + ((this.term.searchTerm === "" || this.term.searchTerm == undefined) ? 0 : 1);
    }

    isOwnedByUser() {
            
        this.ownedByUser = this.term.dbName && (this.term.registeredBy === this.userName);
    }

    isSavable() {
        if(!this.term.dbName && ((this.term.searchTerm !== "" && this.term.searchTerm !== undefined) || (this.activeFilters && this.activeFilters.some(i => i.selected)) )) {
            this.savable = true;
            setTimeout(() => this.initPopUp(), 100);
        } else 
            this.savable = false;
    }

    ngAfterViewInit() {
        this.initPopUp();
    }
    initPopUp() {
        $("#saveSearch").popup({
            on: "click",
            onHide: () => {
                this.error = false;
            }
        });
        $("#deleteSearch").popup({
            on: "click"
        });
    }

    save(name:string, description:string) {
        this.error = false;
        if (name.length === 0) {
            this.error = true;
            return;
        }
        this.saving = true;
        this.searchManager.saveSearch(name, description).subscribe(res => {
            this.term = res;
            this.saving = false;
            $("#saveSearch").popup("hide");
        });
    }

    searchWithEmptyFilters() {
        this.searchManager.searchWithEmptyFilters();
    }

    deleteSearch() {
        if (!this.term.dbName)
            return;
        this.deleting = true;
        this.searchManager.deleteSearch(this.term).subscribe( res => {

            this.deleting = false;
            if (res) {
                this.closeConfirmation();
                this.term.dbName = undefined;
            } else {
                // legg til feil melding
            }
        });
       
    }

    close() {
        this.error = false;
        $("#saveSearch").popup("hide");
    }

    closeConfirmation() {
        $("#deleteSearch").popup("hide");

    }
    onRemove(item: FilterItem) {
        item.selected = false;
        item.parameter = "";
        this.filterManager.filterChanged([item]);
    }

    onSearchRemove() {
        this.term.searchTerm = "";
        this.mediator.clearSearchTerm();
    }

    getParameter(item: FilterItem): string {
       if (item.name === "Minst" || item.name === "Maks") {
           return getYearFromDateString(item.parameter).toString();
        }
        return item.parameter;
    }
    
}
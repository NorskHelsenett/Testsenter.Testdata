import { Component, OnInit } from "@angular/core";
import {ChildViews} from "../models/UtilityModels";
import {SearchQuery} from "../models/DataModels";
import {FilterManagerService} from "../core/services/filter-manager.service";
import {SearchManagerService} from "../core/services/search-manager.service";
import {UserManagerService} from "../core/services/user-manager.service";
import {MediatorService} from "../core/services/mediator.service";
declare var $: any;

@Component({
    selector: "index",
    moduleId: module.id,
    templateUrl: "index.component.html",
    styleUrls: ["index.component.css"]

})

export class IndexComponent implements OnInit {

    public ChildViews = ChildViews;
    // Lists from api calls


    message: string;
    currentView: ChildViews;

    searchInProgress = false;

    active:number = 0;
    term:string = "";
    loading = false;

    constructor(private userManagerService: UserManagerService, private mediatorService: MediatorService,
            private filterManager: FilterManagerService, private searchManager:SearchManagerService) {
        this.mediatorService.searching$.subscribe((value: boolean) => this.searchInProgress = value);
        this.mediatorService.changeMainView$.subscribe((view: ChildViews) => this.switchCurrentView(view));
        this.mediatorService.searchTerm$.subscribe((term:SearchQuery) => this.term = term.searchTerm);
        this.filterManager.activeFilters$.subscribe(filter => {
            this.active = filter ? filter.length : 0;
        });
    }

    ngOnInit(): void {
        this.currentView = ChildViews.Dashboard;
        this.userManagerService.getUserDetailsFromServer().subscribe();
    }

    get activeFilters() {
        return this.active + ((this.term === "" || this.term == undefined) ? 0 : 1);
    }

    onShowSearch() {
        this.switchCurrentView(ChildViews.Search);
    }

    switchCurrentView(view: ChildViews) {
        this.currentView = view;
    }

    showSurveillances() {
        this.switchCurrentView(ChildViews.Surveillance);
    }

    showSearch() {
        this.switchCurrentView(ChildViews.Search);
    }

    searchWithEmptyFilters() {
        this.searchManager.searchWithEmptyFilters();
    }
}
import { Component } from "@angular/core";
import {RegisterPerson, RegisterBusiness, HodorSearchParameters } from "../../models/DataModels";
import {HodorIndexes} from "../../models/UtilityModels";
import {DataManagerService} from "../../core/services/data-manager.service";
import {SearchManagerService} from "../../core/services/search-manager.service";
import {MediatorService} from "../../core/services/mediator.service";

declare var $: any;


@Component({
    selector: "search-list",
    moduleId: module.id,
    templateUrl: "search-list.component.html",
    styleUrls: ["search-list.component.css"]
})
export class SearchListComponent {
    isEmpty:boolean = true;
    items: (RegisterPerson|RegisterBusiness)[];
    searchParameters:HodorSearchParameters;
    totalPages=0;
    currentIndex=HodorIndexes.Person;
    Indexes = HodorIndexes;

    constructor(private dataManagerService: DataManagerService, private searchManager:SearchManagerService, private mediator:MediatorService) {}

    ngOnInit() {
        this.mediator.indexSwitch$.subscribe(switchTo => this.currentIndex = switchTo);
        this.dataManagerService.searchResults$.subscribe(result => {
            this.items = result.documents;
            this.searchParameters = result.searchParameters;
            this.isEmpty = (result.documents == undefined || result.documents.length === 0);
            if (this.isEmpty) {
                this.totalPages = 0;
                return;
            }

            this.totalPages = Math.floor(this.searchParameters.totalCount / this.searchParameters.numberPerPage) - 1;
            if (this.totalPages * this.searchParameters.numberPerPage > 100000)
                this.totalPages = (100000 / this.searchParameters.numberPerPage)-1;
            $('.ui.accordion').accordion('refresh');
        });
    }

    changePage(page: number) {
        this.searchManager.performeSearch(undefined, page);
    }

    getPageArray() {
        let pages: number[] = [];

        let addStart: boolean, addEnd: boolean;

        let startPage: number, endPage: number;
        let currentPage = this.searchParameters.page;

        if (this.totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 0;
            endPage = this.totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 5) {
                startPage = 0;
                endPage = 9;
                addEnd = true;
            } else if (currentPage + 4 >= this.totalPages) {
                startPage = this.totalPages - 9;
                endPage = this.totalPages;
                addStart = true;

            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
                addEnd = true;
                addStart = true;
            }
           
        }


        // create an array of pages to ng-repeat in the pager control
       
        for (let pageNr = startPage; pageNr <= endPage; pageNr++) {
            pages.push(pageNr);
        }

        if (addStart)
            pages[0] = 0;
        if (addEnd)
            pages[pages.length - 1] = this.totalPages;
        return pages;
    }
}


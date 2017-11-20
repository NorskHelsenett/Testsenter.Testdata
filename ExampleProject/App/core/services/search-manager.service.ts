import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import {MediatorService} from "./mediator.service";
import {DataManagerService} from "./data-manager.service";
import {FilterManagerService} from "./filter-manager.service";
import {ApiService} from "./api.service";
import {SearchParser} from "../../helpers/searchParser";
import {SearchQuery, HodorSearchParameters, Search } from "../../models/DataModels";
import {HodorIndexes, ChildViews } from "../../models/UtilityModels";


/**
 * Håndterer alt relatert med søk
 */
@Injectable()
export class SearchManagerService {

    private searchTerm = new SearchParser("");
    private savedSearchList: SearchQuery[] = [];
    private savedSearches = new ReplaySubject(1);
    private searchParameters = new HodorSearchParameters();
    private search = new Search();
    private index = HodorIndexes.Person;

    savedSearchList$ = this.savedSearches.asObservable();
    

    constructor(private dataManager: DataManagerService, private mediator: MediatorService, private filterManager: FilterManagerService,
        private apiService: ApiService) {

        this.search.searchParameters = this.searchParameters;
        this.mediator.performeSearch$.subscribe(() => this.performeSearch());
        this.mediator.updateSavedSearches$.subscribe(() => this.getSavedSearch());
        this.mediator.indexSwitch$.subscribe((switchTo) => this.switchIndex(switchTo));
        this.mediator.clearSearchTerm$.subscribe(() => {
            this.searchTerm.term = "";
            this.performeSearch();
        });
        this.mediator.searchTerm$.subscribe((term: SearchQuery) => this.searchTerm.term = term.searchTerm);
        this.apiService.getSavedSearches().subscribe(res => {
            this.savedSearchList = res;
            this.savedSearches.next(this.savedSearchList);
        });
    }

    switchIndex(switchTo: HodorIndexes) {
        this.index = switchTo;
        this.searchTerm.term = "";
    }

    setEnvironment(env: string) {
        this.searchParameters.environment = env;
    }

    /**
     * Henter inn alle lagrede søk fra serveren
     */
    getSavedSearch():void {
        this.apiService.getSavedSearches().subscribe(res => {
            this.savedSearchList = res;
            this.savedSearches.next(this.savedSearchList);
        });
    }

    /**
     * Setter søkeordet som vil bli brukt ved søk
     * @param keyword 
     */
    setSearchTerm(keyword:string) {
        this.searchTerm.term = keyword;
    }
    /**
     * Avbryt pågående søk
     */
    cancelSearch() {
        this.dataManager.cancelSearch();
        this.filterManager.undo();
    }

    /**
     * Utfør søk uten noen søkeparameter
     */
    searchWithEmptyFilters() {
        this.searchTerm.term = "";
        this.filterManager.resetFilters();
        this.performeSearch();
    }

    /**
     * Utfør søk med kun gitt nin som søkeparamter
     * @param nin
     */
    searchWithNin(nin: string) {
        this.filterManager.resetFilters();
        this.searchTerm.term = nin;
        this.performeSearch();
    }

    /**
     * Utfør et "OR" søk med nin'ene som er gitt.
     * @param nins
     */
    searchForMultipleNins(nins: string[]) {
        this.filterManager.resetFilters();
        this.searchTerm.term = nins.join(" | ");
        this.performeSearch();
    }

    /**
     * Utfører et søk basert på et lagret søk
     * @param search
     */
    performeSavedSearch(search: SearchQuery) {
        this.mediator.switchIndex(search.searchIndex);
        this.filterManager.updateFilters(search.filters, search.selectedFilters);
        this.searchTerm.term = search.searchTerm;
        this.performeSearch(search);
    }

    /**
     * Setter søkeordet til en tom string
     */
    resetSearchTerm() {
        this.searchTerm.term = "";
    }
    /**
    * Setter sidetallet som blir bukt i søket
    */
    setPage(page: number) {
        this.searchParameters.page = page;
    }

    /**
     * Lagrer et definert søk slik at det kan bli brukt ved en senere anledning
     * @param name
     * @param description
     */
    saveSearch(name: string, description?: string) {
        let search = new SearchQuery();
        search.filters = this.filterManager.searchFilters;
        search.friendlyName = name;
        search.description = description;
        search.searchTerm = this.searchTerm.term;
        search.searchIndex = this.index;
        return this.apiService.saveSearch(search).map(res => {
            if (res) {
                this.savedSearchList.unshift(res);
                this.savedSearches.next(this.savedSearchList);

            }
            return res;
        });
    }

    deleteSearch(search: SearchQuery): Observable<boolean> {
       return this.apiService.deleteSearch(search).map(res => {
            if (res) {
                this.savedSearchList.splice(this.savedSearchList.findIndex(s => s.dbName === search.dbName), 1);
                this.savedSearches.next(this.savedSearchList);
                return true;
            } else {
                return false;
            }
        });
        
        
    }


    performeSearch(query?:SearchQuery, page?:number): void {
        if (this.searchTerm.term === "invalid")
            return;
        if (page)
            this.searchParameters.page = page;
        else
            this.searchParameters.page = 0;
        this.mediator.changeMainView(ChildViews.Search);
        let searchQuery = query;
        if (!searchQuery) {
            searchQuery = <SearchQuery>
                {
                    searchTerm: this.searchTerm.term,
                    filters: this.filterManager.searchFilters,
                    searchType: this.searchTerm.type
                }
        }
        this.mediator.searchTerm(searchQuery);
        this.search.searchQuery = searchQuery;
        this.dataManager.getSearchResult(this.search);
    }
}
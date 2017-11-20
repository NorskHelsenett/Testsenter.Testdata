import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ApiService } from "./api.service";
import {MediatorService} from "./mediator.service";
import {FilterGroup, FilterItem } from "../../models/DataModels";
import {HodorIndexes} from "../../models/UtilityModels";

/**
 * Servicen tar seg av alt relatert til filtrene
 */
@Injectable()
export class FilterManagerService {

    private filters: FilterGroup[];
    private initialPersonFilters: FilterGroup[];
    private initialBusinessFilters: FilterGroup[];

    private filtersSubject = new ReplaySubject<FilterGroup[]>(1);
    private activeFilterSubject = new ReplaySubject<FilterItem[]>(1);
    private removedFilterSubject = new Subject<FilterItem>();

    //Brukes til å publisere filterlisten som brukes 
    filters$ = this.filtersSubject.asObservable();
    //Brukes til å publisere aktive filtere
    activeFilters$ = this.activeFilterSubject.asObservable();
    //Brukes til å publisere filtere som var, men som ikke lengre er aktive
    removedFilter$ = this.removedFilterSubject.asObservable();

    private lastChange: FilterItem[] = [];
    private activeFilters: FilterItem[] = [];
    private index = HodorIndexes.Person;
    constructor(private apiService: ApiService, private mediatorService: MediatorService) {
        this.apiService.getFilters(HodorIndexes.Person).subscribe((f: FilterGroup[]) => {
            this.initialPersonFilters = JSON.parse(JSON.stringify(f));
            this.processFilters(f);
        });
        this.apiService.getFilters(HodorIndexes.Business).subscribe((f: FilterGroup[]) => {
            this.initialBusinessFilters = JSON.parse(JSON.stringify(f));
        });
        this.mediatorService.indexSwitch$.subscribe((switchTo) => this.changeFilterType(switchTo));
    }

    /**
     * Tilbakestiller siste filterendring
     */
    undo(): void {
        this.lastChange.forEach(f => f.selected = !f.selected);
        this.activeFilterSubject.next(this.activeFilters);
    }

    /**
     * Oppdaterer aktive filterlisten og pubilserer denne via {@link MediatorService}. Hvis @param item kun inneholder et element som ikke er
     * valgt vil dette filteret også bli publisert.
     * @param item Filteret/filterene som har blitt endret
     * @param performeSearch Bestemmer om et søk skal bli tatt med de nye filterne
     */
    filterChanged(item: FilterItem[], performeSearch = true): void {
        this.lastChange = item;
        for (let filter of item) {
            const i = this.activeFilters.findIndex(f => f.uniqueValue === filter.uniqueValue);
            if (i === -1 && filter.selected) this.activeFilters.push(filter);
            if (i !== -1 && !filter.selected) this.activeFilters.splice(i, 1);
        }
        if (item.length === 1 && !item[0].selected) {
            this.removedFilterSubject.next(item[0]);
        }
        this.activeFilterSubject.next(this.activeFilters);
        if(performeSearch)
            this.mediatorService.performeSearch();
    }


    private processFilters(f: FilterGroup[]): void {
        this.filters = f;
        this.filtersSubject.next(this.filters);
    }

    /**
     * Oppdaterer filtervalgene samt aktive filtere. Primært brukt med lagrede søk
     * @param filters De nye filtrene
     * @param selectedFilters Liste med filtere som er valgt.
     */
    updateFilters(filters: FilterGroup[], selectedFilters:FilterItem[]): void {
        let newFilters = JSON.parse(JSON.stringify(filters));
        this.processFilters(newFilters);
        this.activeFilters = JSON.parse(JSON.stringify(selectedFilters));
        this.activeFilterSubject.next(this.activeFilters);
    }

    /**
     * Utfører et søk med kun en tag som filter.
     * @param name Navnet på tagen som skal bli brukt i søket
     */
    searchWithTag(name: string):void {
        this.resetFilters();
        this.mediatorService.searchTerm({ searchTerm:""});
        let tagGroup = this.filters.find(g => g.name.toLowerCase() === "tags");
        let item = tagGroup.items.find(f => f.name === name);
        if (item) {
            item.selected = true;
            this.filterChanged([item]);
        }
    }

    changeFilterType(switchTo: HodorIndexes) {
        this.index = switchTo;
        this.resetFilters();
        this.processFilters(switchTo === HodorIndexes.Business ? this.initialBusinessFilters : this.initialPersonFilters);
    }

    /**
     * Tilbakestiller filtervalgene til opprinnelig verdier
     */
    resetFilters():void {
        this.filters = JSON.parse(JSON.stringify(this.index === HodorIndexes.Person ? this.initialPersonFilters : this.initialBusinessFilters));
        this.activeFilters = [];
        this.lastChange = undefined;
        this.activeFilterSubject.next(this.activeFilters);
        this.filtersSubject.next(this.filters);
    }

    get searchFilters(): FilterGroup[] {
        return this.filters;
    }
}
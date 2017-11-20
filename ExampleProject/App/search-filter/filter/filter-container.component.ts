import { Component } from "@angular/core";
import { FilterGroup, FilterBelonging } from "../../models/DataModels";
import {FilterManagerService} from "../../core/services/filter-manager.service";
declare var $: any;


@Component({
    selector: "filter-container",
    moduleId: module.id,
    templateUrl: "filter-container.component.html",
    styleUrls: ["filter-container.component.css"]
})
export class FilterContainerComponent {
  
    filters: FilterGroup[];
    belongings = [FilterBelonging.Preg, FilterBelonging.Flr, FilterBelonging.Hpr, FilterBelonging.Difi,
        FilterBelonging.BedReg, FilterBelonging.Ar, FilterBelonging.Htk, FilterBelonging.Resh];
    fb = FilterBelonging.All;

    constructor(private filterManager: FilterManagerService) { }  

    ngOnInit() {
        this.filterManager.filters$.subscribe((filters: FilterGroup[]) => {
            this.filters = filters;
        });
    }

    ngAfterViewInit() {
        $(".filteraccordion").accordion();
    }

    getFilters(beloning: FilterBelonging): FilterGroup[]  {
        return this.filters.filter(f => f.belongsTo === beloning);
    }

    belongingHasFilters(beloning: FilterBelonging): boolean {
        if (this.filters == undefined)
            return false;
        return this.filters.some(f => f.belongsTo === beloning);
    }
}
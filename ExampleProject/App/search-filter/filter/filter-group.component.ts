import { Component, Input } from "@angular/core";
import { FilterGroup, FilterItem }  from "../../models/DataModels";
import {FilterManagerService} from "../../core/services/filter-manager.service";

@Component({
    selector: "filter-group",
    moduleId: module.id,
    templateUrl: "filter-group.component.html",
    styleUrls: ["filter-group.component.css"]
})
export class FilterGroupComponent {
    @Input()
    filter: FilterGroup;
    initialPrioritizedFilters: FilterItem[];
    displayFullList: boolean = false;

    constructor(private filterManager: FilterManagerService) { }

    ngOnInit() {
        if (this.filter.items === null || this.filter.items === undefined) return;
        this.initialPrioritizedFilters = this.filter.items.slice(0, this.filter.numberToShow);
        this.filter.items.map(item => item.filterType = this.filter.type);
    }
    
    get prioritizedFilters(): FilterItem[] {
        if (this.filter.items === null || this.filter.items === undefined) return;
        return this.initialPrioritizedFilters.concat(this.filter.items
            .filter(f => f.selected && this.initialPrioritizedFilters.indexOf(f) === -1));
    }

    get hasMore(): boolean {
        if (this.filter.items === null || this.filter.items === undefined) {
            return false;
        }

        return this.filter.items.length > this.initialPrioritizedFilters.concat(this.filter.items
            .filter(f => f.selected && this.initialPrioritizedFilters.indexOf(f) === -1)).length;
    }

    onCheckBoxSelect(item: FilterItem): void {
        item.selected = !item.selected;
        this.filterManager.filterChanged([item]);
    }

    onRadioButtonSelect(item: FilterItem): void {
        if (item.selected) return;
        this.filter.items.forEach(i => i.selected = false);
        item.selected = true;
        this.filterManager.filterChanged([item]);
    }

    onInputBoxChange(item: FilterItem) {
        console.log(item);
        
        if (item.parameter == undefined || item.parameter === "") {
            item.selected = false;
        } else if (item.parameter != undefined && item.parameter !== "") {
            item.selected = true;
        }
        this.filterManager.filterChanged([item]);

    }

    showMore(): void {
        this.displayFullList = true;
    }

    showLess(): void {
        this.displayFullList = false;
    }


}
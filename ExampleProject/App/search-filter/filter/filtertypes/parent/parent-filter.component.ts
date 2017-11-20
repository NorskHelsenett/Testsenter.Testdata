import { Component, Input } from "@angular/core";
import { FilterGroup, FilterItem } from "../../../../models/DataModels";
import {FilterManagerService} from "../../../../core/services/filter-manager.service";


@Component({
    selector: "parent-filter",
    moduleId: module.id,
    templateUrl: "parent-filter.component.html",
    styleUrls: ["../filter-group.component"]
})

export class ParentFilterComponent {
    @Input()
    group: FilterGroup;

    parent: FilterItem;
    parentNegative: FilterItem;

    childItem1: FilterItem;
    childItem2: FilterItem;

    childItems:FilterItem[];

    constructor(private filterManager: FilterManagerService) {
    }

    onCheckBoxSelect(item: FilterItem) {
        if (item === this.parent && this.parent.selected) {
            this.parentNegative.selected = false;
        } else {
            this.parent.selected = false;
            this.childItem1.selected = false;
            this.childItem2.selected = false;
        }
        
        this.filterManager.filterChanged(this.getFilters());

    }

    onPregCheckBoxSelect(item: FilterItem) {
        if (item === this.childItem1)
            this.childItem2.selected = false;
        else
            this.childItem1.selected = false;
        this.filterManager.filterChanged(this.getFilters());

    }

    getFilters() {
        return this.group.items.concat(this.childItems);
    }
    ngOnInit() {
        this.filterManager.removedFilter$.subscribe((f: FilterItem) => {
            if (f.uniqueValue === this.parent.uniqueValue) {
                this.childItems.forEach(i => i.selected = false);
                this.filterManager.filterChanged(this.childItems);
            }
            if (f.uniqueValue === this.parentNegative.uniqueValue) {
                this.childItems.forEach(i => i.selected = false);
                this.filterManager.filterChanged(this.childItems);
            }
        });
        [this.parent, this.parentNegative] = this.group.items;
        this.childItems = [].concat.apply([], this.group.groups.map(g => g.items));
        [this.childItem1, this.childItem2] = this.childItems;
    }

}
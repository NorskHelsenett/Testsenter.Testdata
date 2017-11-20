import { Component, Input } from "@angular/core";

import { FilterItem, FilterGroup } from "../../../../models/DataModels";
import {FilterManagerService} from "../../../../core/services/filter-manager.service";
declare var $: any;
@Component({
    selector: "children-filter",
    moduleId: module.id,
    templateUrl: "children-filter.component.html"
})


export class ChildrenFilterComponent {
    @Input()
    group: FilterGroup;



    hasChild:FilterItem;
    hasNotChild: FilterItem;

    hasCustodyGroup: FilterGroup;
    hasNotCustodyGroup: FilterGroup;

    hasCustodySelected = false;
    hasNotCustodySelected = false;


    agevalues:string[] = [];

    lastFilter:FilterItem;

    ageSelected = "0";

    subscription: any;

    constructor(private filterManager: FilterManagerService) {
        this.subscription = this.filterManager.removedFilter$.subscribe(item => {
            if (item.parent === this.hasCustodyGroup.name) {
                this.hasCustodySelected = false;
                this.setDropdownDefault();
                this.unselectGroup(true);
            }
            if (item.parent === this.hasNotCustodyGroup.name) {
                this.hasNotCustodySelected = false;
                this.setDropdownDefault();
                this.unselectGroup(false);

            } 
            if (item.parent === this.group.name) {

                this.hasCustodySelected = false;
                this.hasNotCustodySelected = false;
                this.unselectGroup();
                this.group.items.forEach(f => f.selected = false);
                if (this.ageSelected === "0") {
                    this.setDropdownDefault();
                    if(this.lastFilter)
                        this.lastFilter.selected = false;
                    this.performeSearch();
                } else 
                this.setDropdownDefault();
               

            }
        });
    }


    ngOnInit() {
        this.hasChild = this.group.items[0];
        this.hasNotChild = this.group.items[this.group.items.length -1];
        [this.hasCustodyGroup, this.hasNotCustodyGroup] = this.group.groups;
        this.agevalues = this.hasCustodyGroup.items.map(f => f.name);
        if (this.hasCustodyGroup.items.some(i => i.selected)) {
            this.hasCustodySelected = true;
        }
        else if (this.hasNotCustodyGroup.items.some(i => i.selected)) {
            this.hasNotCustodySelected = true;
            
        }
    }

    ngAfterViewInit() {
        $('#agedropdown')
            .dropdown({
                onChange: (value: string) => {
                    this.ageSelected = value;
                    this.setFilters();
                    this.performeSearch();
                }
            });

        if (this.hasNotCustodySelected) {
            let index = this.hasNotCustodyGroup.items.findIndex(i => i.selected);
            this.lastFilter = this.hasNotCustodyGroup.items[index];
            this.ageSelected = String(index);
            if (index != 0) {
                $('#agedropdown')
                    .dropdown("set selected", String(this.ageSelected));
            }
        } else if (this.hasCustodySelected) {

            let index = this.hasCustodyGroup.items.findIndex(i => i.selected);
            this.lastFilter = this.hasCustodyGroup.items[index];
            this.ageSelected = String(index);
            if (index != 0) {
                $('#agedropdown')
                    .dropdown("set selected", String(this.ageSelected));
            }
        }
        


    }


    setDropdownDefault() {
        $("#agedropdown").dropdown("restore default value");
    }
    onSelect(isHasChild: boolean) {
        if (isHasChild) {
            this.hasNotChild.selected = false;
        } else {
            this.hasChild.selected = false;
            this.hasCustodySelected = false;
            this.hasNotCustodySelected = false;
            this.setDropdownDefault();
            this.unselectGroup();
        }
        this.performeSearch();
    }



    onCustodySelect(custody: boolean) {
        if (!custody) {
            this.hasCustodySelected = false;
        } else {
            this.hasNotCustodySelected = false;
        }
        if(!this.hasCustodySelected && !this.hasNotCustodySelected){
            this.unselectGroup();
        }

        this.setFilters();
        this.performeSearch();
    }


    performeSearch() {
        this.filterManager.filterChanged(this.getFilterItems());
    }

    getFilterItems() {
        let items =  this.group.items.concat(this.hasCustodyGroup.items)
            .concat(this.hasNotCustodyGroup.items);
        return items;
    }
    private unselectGroup(isHasCustody?: boolean) {
        if (isHasCustody === undefined) {
            this.hasCustodyGroup.items.forEach(f => f.selected = false);
            this.hasNotCustodyGroup.items.forEach(f => f.selected = false);
        } else {
            let group = isHasCustody ? this.hasCustodyGroup : this.hasNotCustodyGroup;
            group.items.forEach(f => f.selected = false); 
        }

    }

    setFilters() {
        if (this.lastFilter && this.lastFilter != this.hasChild)
            this.lastFilter.selected = false;
        let appropriateFilterGroup: FilterGroup;

        if (this.hasNotChild.selected) {
            this.unselectGroup();
            return;
        }
        if (this.hasChild.selected) {
            appropriateFilterGroup = this.group;
        }
        if (this.hasCustodySelected) {
            appropriateFilterGroup = this.hasCustodyGroup;
        }
        if (this.hasNotCustodySelected) {
            appropriateFilterGroup = this.hasNotCustodyGroup;
        }
        if (appropriateFilterGroup === undefined) {
            return;
        }
        this.lastFilter = appropriateFilterGroup.items[Number(this.ageSelected)];
        appropriateFilterGroup.items[Number(this.ageSelected)].selected = true;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
import {Component, Input} from "@angular/core";
import {FilterGroup, Tag } from "../../../../models/DataModels";
import {DataManagerService} from "../../../../core/services/data-manager.service";
import {FilterManagerService} from "../../../../core/services/filter-manager.service";
declare var $: any;

@Component({
    selector: "tagfilter",
    moduleId: module.id,
    templateUrl: "tagfilter.component.html"
})

export class TagFilterComponent {
    @Input()
    group: FilterGroup;
    taglist: Tag[];

    ignore:boolean;

    subscriptions: any[] = [];

    constructor(private dataManagerService: DataManagerService, private filterManager: FilterManagerService) {
        this.subscriptions.push(this.filterManager.activeFilters$.subscribe(items => {
            if (items.length === 0) {
                $('#tagfilter').dropdown("clear");
            }
        }));
        this.subscriptions.push(this.filterManager.removedFilter$.subscribe(item => {
            $("#tagfilter").dropdown("remove selected", item.name);
        }));
        this.subscriptions.push(this.dataManagerService.deletedTag$.subscribe((tag: Tag) => {
            console.log("Deleted tag", tag);
            $("#tagfilter").dropdown("remove selected", tag.name);
        }));
    }

    ngOnInit() {
        this.dataManagerService.tags$.subscribe((tags: Tag[]) => {
            this.taglist = tags;
        });


    }

    ngAfterViewInit() {
        $('#tagfilter').dropdown({
            forceSelection: false,
            onAdd: (value: string) => {
                if (!this.ignore) {
                    this.changeTagFilter(value, true);

                } 
            },
            onRemove: (value: string, text: string) => {
                if (!this.ignore) {
                    this.changeTagFilter(value, false);
                } 
                    
            }
        });
        if (this.group.items.some(i => i.selected)) {
            this.ignore = true;
            $('#tagfilter').dropdown("set selected", this.group.items.filter(i => i.selected).map(i => i.name));
            this.ignore = false;
        }
    }


    changeTagFilter(name: string, state:boolean) {
        if (!this.group) return;
        let item = this.group.items.find(i => i.name === name);
        if (!item) return;
        item.selected = state;
        this.filterManager.filterChanged([item]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
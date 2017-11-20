import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {DataManagerService} from "../../core/services/data-manager.service";

@Component({
    moduleId: module.id,
    selector: "latest-checks",
    templateUrl: "latest-checks-tile.component.html",
    styleUrls: ["../dashboard.component.css"]
})

export class LatestCheckTileComponent {
    syncs: Observable<Array<[string, Date]>>;
    loading:boolean;
    constructor(private dataManager:DataManagerService) { }

    ngOnInit() {
        this.loading = true;
        this.syncs = this.dataManager.getSyncTimesAsync().map(res => {
            this.loading = false;
            return res;
        });
    }
}
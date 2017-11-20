import { Component } from "@angular/core";
import {SurveillanceInformation, ChildViews } from "../../models/UtilityModels";
import {DataManagerService} from "../../core/services/data-manager.service";
import {MediatorService} from "../../core/services/mediator.service";


@Component({
    selector: "surveillance-status-tile",
    moduleId: module.id,
    templateUrl: "surveillance-status-tile.component.html",
    styleUrls: ["surveillance-status-tile.component.css"]
})
export class SurveillanceStatusTileComponent {
    status: SurveillanceInformation;
    load = true;


    constructor(private dataManagerService: DataManagerService, private mediatorService: MediatorService) {}

    get loading(): string {
        return this.load ? "active" : "";
    }

    showSurveillences() {
        this.mediatorService.changeMainView(ChildViews.Surveillance);
    }

    ngOnInit() {
        this.status = new SurveillanceInformation;
        this.dataManagerService.surveillanceStatus$.subscribe((data: SurveillanceInformation) => {
            this.load = false;
            this.status = data;
        });
    }


}
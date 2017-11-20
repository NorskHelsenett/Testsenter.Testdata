import { Component } from "@angular/core";
import {MediatorService} from "../../core/services/mediator.service";
import {UserData} from "../../models/DataModels";


@Component({
    moduleId: module.id,
    selector: "apikey",
    templateUrl: "apikey-tile.component.html",
    styleUrls: ["../dashboard.component.css"]
})

export class ApiKeyComponent {

    key: any;

    constructor(private mediator: MediatorService) {
    }

    ngOnInit() {
        this.key = this.mediator.userInfo$.map((user:UserData) => user.searchApiKey);
    }

}
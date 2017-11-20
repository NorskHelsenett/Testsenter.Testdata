import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {OwnedBy} from "../models/UtilityModels";
import {UserManagerService} from "../core/services/user-manager.service";


@Component({
    moduleId: module.id,
    selector: "dashboard",
    templateUrl: "dashboard.component.html",
    styleUrls: ["dashboard.component.css"]
})

export class DashboardComponent {
    public ownedBy = OwnedBy;

    name: Observable<string>;
    constructor(private userManager: UserManagerService) { }

    ngOnInit() {
        this.name = this.userManager.getNameAsync();
    }

}
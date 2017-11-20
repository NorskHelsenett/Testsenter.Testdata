import { Component, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { ChildViews } from "./models/UtilityModels";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import {MediatorService} from "./core/services/mediator.service";
import {UserManagerService} from "./core/services/user-manager.service";


@Component({
    selector: "my-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["app.component.css"]
})

export class AppComponent {

    constructor(private router: Router, private mediatorService: MediatorService,
        public toastr: ToastsManager, public vcRef: ViewContainerRef, private userManager:UserManagerService) {
        this.toastr.setRootViewContainerRef(vcRef);
    }
}
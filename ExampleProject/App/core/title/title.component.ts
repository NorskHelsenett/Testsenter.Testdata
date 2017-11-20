import { Component } from "@angular/core";
import {ChildViews} from "../../models/UtilityModels";
import {Router} from "@angular/router";
import {MediatorService} from "../services/mediator.service";
import {UserManagerService} from "../services/user-manager.service";
import { Observable } from "rxjs/Observable";

@Component({
    selector: "app-title",
    moduleId: module.id,
    templateUrl: "title.component.html",
    styleUrls: ["title.component.css"],
})
export class TitleComponent {

    pages = [ChildViews.Dashboard, ChildViews.Search, ChildViews.Surveillance];
    public childviews = ChildViews;
    activePage = ChildViews.Dashboard;

    constructor(private router: Router, private mediatorService: MediatorService,
        private userManager: UserManagerService) {
        mediatorService.changeMainView$.subscribe((view: ChildViews) => this.switchView(view));
    }

    showUserStatus(): boolean {
        return this.router.url === "/";
    }

    changePage(page: ChildViews) {
        this.activePage = page;
        this.mediatorService.changeMainView(page);
    }

    switchView(view: ChildViews) {
        this.activePage = view;
    }
}
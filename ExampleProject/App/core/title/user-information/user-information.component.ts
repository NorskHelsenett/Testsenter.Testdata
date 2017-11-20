import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {MediatorService} from "../../services/mediator.service";
import {UserManagerService} from "../../services/user-manager.service";
import {UserData} from "../../../models/DataModels";
import {ProjectNamePipe} from "../../../shared/shared-pipes/projectname.pipe";


@Component({
    selector: 'user-information',
    moduleId: module.id,
    templateUrl: 'user-information.component.html',
    styleUrls: ['user-information.component.css'],
    providers: [ProjectNamePipe]
})

export class UserInformationComponent {


    constructor(private mediatorService: MediatorService, private userManagerService: UserManagerService, private router: Router) { }

    user: UserData;

    ngOnInit() {
        this.user = new UserData();
        this.mediatorService.userInfo$
            .subscribe((user: UserData) => {
                if (user) {
                    this.user = user;
                }
            });
    }

    get loading(): string {
        return this.user.name === undefined ? "active" : "";
    }

    logOut() {
        this.userManagerService.logOut().subscribe(res => {
            this.userManagerService.setUser(undefined);
            this.router.navigateByUrl("/login/");
        });
    }

    navigateToUser() {
        this.router.navigate(['changeuser']);
    }
}
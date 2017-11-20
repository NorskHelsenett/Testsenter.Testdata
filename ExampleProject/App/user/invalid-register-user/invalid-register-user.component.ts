import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {UserManagerService} from "../../core/services/user-manager.service";

@Component({
    selector: 'invalid-register-user',
    moduleId: module.id,
    templateUrl: 'invalid-register-user.component.html',
    styleUrls: ['../user.component.css']
})
export class InvalidRegisterUserComponent {

    constructor(private userManagerService: UserManagerService, private router: Router) { }

    onSuccess():void {
        this.router.navigateByUrl("");
    }

    onCancel():void {
        this.userManagerService.logOut().subscribe(res => {
            this.userManagerService.setUser(undefined);
            this.router.navigateByUrl("/login/");
        });
    }
}
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserData, LoginSubmission } from "../../models/DataModels";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import {UserManagerService} from "../../core/services/user-manager.service";

declare var $: any;

@Component({
    selector: 'update-user',
    moduleId: module.id,
    templateUrl: 'update-user.component.html',
    styleUrls: ['../user.component.css']
})
export class UpdateUserComponent {
    showRegisterContent: boolean;
    userdetailloading:boolean;
    errorMessage: string;

    constructor(private router: Router, private userManagerService: UserManagerService, private toastr: ToastsManager) { }

    onRegisterSuccess(user: LoginSubmission) {
        this.toastr.success("Din registerbruker er nå oppdatert");
        this.userManagerService.setRegisterUsername(user.userName);
    }

    onRegisterCancel() {
        this.showRegisterContent = false;
    }

    onUserDetailsSuccess(user: UserData) {
        this.userdetailloading = true;
        this.userManagerService.updateUser(user).subscribe(res => {
            this.userdetailloading = false;

            if (res === "success") {
                this.userManagerService.setUser(user);
                this.toastr.success("Dine brukerdetaljer er nå oppdatert");
        this.router.navigateByUrl("");

            } else {
                this.errorMessage = res;
            }
        });

    }

    onUserDetailsCancel() {
        if (this.router.url === "/adduserinformation")
            this.router.navigateByUrl("/login/");
        else
            this.router.navigateByUrl("");
    }
}

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { validateEmail } from "../../helpers/formvalidators";
import {UserManagerService} from "../../core/services/user-manager.service";


@Component({
    selector: 'forgotten-password',
    moduleId: module.id,
    templateUrl: 'forgotten-password.component.html',
    styleUrls: ['../user.component.css']
})
export class ForgottenPasswordComponent {

    username: string;
    validUsername: boolean = true;
    errorMessage:string;
    loading: boolean;

    constructor(private router: Router, private userManagerService: UserManagerService) { }

    cancel(): void {
        this.router.navigateByUrl("");
    }

    generateNewPassword(): void {
        this.checkValidUsername();
        if (this.validUsername)
            this.loading = true;
            this.userManagerService.generateNewPassword(this.username).subscribe(res => {
                this.loading = false;
                if (res === "success") {
                    this.router.navigate(["/login/", "newpasswordsuccess"]);
                } else {
                    this.errorMessage = res;
                }
            });
        
    }

    checkValidUsername(): void {
        this.validUsername = validateEmail(this.username);
    }
}
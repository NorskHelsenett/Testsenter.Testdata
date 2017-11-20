import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserData, LoginSubmission } from "../../models/DataModels";
import {UserManagerService} from "../../core/services/user-manager.service";

declare var $: any;

@Component({
    selector: 'create-user',
    moduleId: module.id,
    templateUrl: 'create-user.component.html',
    styleUrls: ['../user.component.css']
})
export class CreateUserComponent {

    hasValidRegisterUser:boolean;
    userData: UserData = new UserData;

    userCreateError:string;

    usercreateloading: boolean;
    registerUser:LoginSubmission;

    constructor(private router: Router, private userManagerService: UserManagerService) {}

    onRegisterSuccess(registerUser: LoginSubmission): void {
        this.registerUser = registerUser;
        this.hasValidRegisterUser = true;
    }

    onCancel(): void {
        this.userManagerService.logOut().subscribe(() => {
            this.router.navigateByUrl("/login/");
        });
    }

    onUserDetailsSuccess(user: UserData): void {
        this.usercreateloading = true;
        user.registerPassword = this.registerUser.password;
        user.registerUserName = this.registerUser.userName;
        this.userManagerService.createUser(user).subscribe((res: string) => {
            this.usercreateloading = false;
            if (res === "success") {
                this.router.navigate(["/createusersuccess"]);
            } else {
                this.userCreateError = res;
            }
        });
    }

    onUserDetailsCancel(): void {
        this.router.navigateByUrl("/login/");
    }

}

import { NgModule } from '@angular/core'
import {SharedModule} from "../shared/shared.module";
import {TermsComponent} from "./terms/terms.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {ForgottenPasswordComponent} from "./forgotten-password/forgotten-password.component";
import {InvalidRegisterUserComponent} from "./invalid-register-user/invalid-register-user.component";
import {LoginComponent} from "./login/login.component";
import {RegisterUserComponent} from "./register-user/register-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {CreateUserSuccessComponent} from "./create-user/create-user-success.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [SharedModule, RouterModule ],
    declarations: [TermsComponent, ChangePasswordComponent, CreateUserComponent, CreateUserSuccessComponent, ForgottenPasswordComponent, InvalidRegisterUserComponent,
                    LoginComponent, RegisterUserComponent, UpdateUserComponent, UserDetailsComponent],
    exports: [UpdateUserComponent, CreateUserComponent, CreateUserSuccessComponent, UpdateUserComponent, LoginComponent, ForgottenPasswordComponent, InvalidRegisterUserComponent ]
})
export class UserModule { }
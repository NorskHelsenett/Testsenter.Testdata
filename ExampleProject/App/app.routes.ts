import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes } from "@angular/router";

import { RegisterGuard, ChangeRegisterUserGuard, LoggedInGuard, ValidInformationGuard } from "./routing/authguard";
import {CreateUserComponent} from "./user/create-user/create-user.component";
import {InvalidRegisterUserComponent} from "./user/invalid-register-user/invalid-register-user.component";
import {UpdateUserComponent} from "./user/update-user/update-user.component";
import {ForgottenPasswordComponent} from "./user/forgotten-password/forgotten-password.component";
import { CreateUserSuccessComponent } from "./user/create-user/create-user-success.component";
import { StatisticsIndexComponent } from "./statistics/statistics-index.component";
import { StatisticsCompareComponent } from "./statistics/compare/statistics-compare.component";
import { StaticDataSharedComponent } from './static-data-collection/shared/static-data-shared.component';
import { AdminStaticDataComponent } from "./static-data-collection/admin/admin-static-data.component";
import {LoginComponent} from "./user/login/login.component";
import {IndexComponent} from "./index/index.component";

export const APP_ROUTES: Routes = [
    { path: "", component: IndexComponent, canActivate: [LoggedInGuard, RegisterGuard, ValidInformationGuard]},
    { path: "changeuser", component: UpdateUserComponent, canActivate: [LoggedInGuard, RegisterGuard] },
    { path: "createuser", component: CreateUserComponent },
    { path: "createusersuccess", component: CreateUserSuccessComponent },
    { path: "adduserinformation", component: UpdateUserComponent, canActivate: [LoggedInGuard] },
    { path: "Login/ActivateMe", redirectTo: "", pathMatch: "prefix" },
    { path: "login/:state", component: LoginComponent },
    { path: "login", component: LoginComponent},
    { path: "forgottenpassword", component: ForgottenPasswordComponent},
    { path: "invalidregisteruser", component: InvalidRegisterUserComponent, canActivate: [LoggedInGuard, ChangeRegisterUserGuard] },
    { path: "statistics", component: StatisticsIndexComponent },
    { path: "compare", component: StatisticsCompareComponent },
    { path: "static-data", component: StaticDataSharedComponent},
    { path: "static-data-admin", component: AdminStaticDataComponent, canActivate: [LoggedInGuard]},
    { path: "**", redirectTo: ""}
];

export const AppRoutingProviders: any[] = [
    LoggedInGuard, RegisterGuard, ChangeRegisterUserGuard, ValidInformationGuard
];





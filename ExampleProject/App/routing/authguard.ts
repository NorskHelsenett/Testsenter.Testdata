import { Injectable } from "@angular/core";
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";

import { Observable } from "rxjs/Observable";
import {UserManagerService} from "../core/services/user-manager.service";


/**
 * Sjekker om en bruker har alle informasjon fyllt ut, hvis ikke blir brukeren omdirkert til endre bruker siden
 */
@Injectable()
export class ValidInformationGuard implements CanActivate {
    constructor(private userManagerService: UserManagerService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userManagerService.hasValidUserInformation().map(user => {
            if (!user) {
                this.router.navigateByUrl("/adduserinformation");
                return false;
            }
            return true;
        }, (error: any) => console.log("Got error from backend"));
    }
}

/**
 * Sjekker om en bruker er logget inn
 */
@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private userManagerService: UserManagerService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userManagerService.isLoggedIn().map((res: boolean) => {
            if (!res) {
                this.router.navigateByUrl('/login/');
                return false;
            }
            return true;
        }, (Error: any) => console.log("Got error from backend"));

    }
}


/**
 * Sjekker om bruker har gyldig registerbruker
 */
@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(private userManagerService: UserManagerService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userManagerService.hasValidRegisterUser().map((res: boolean) => {
            this.userManagerService.setValidRegisterUser(res);
            if (!res) {
                this.router.navigateByUrl("/invalidregisteruser");
                return false;
            }
            return true;
        }, (error:any) => console.log("Got error from backend"));

    }
}

/**
 * Sjekker om bruker har tilgang til endre registerbruker siden
 */
@Injectable()
export class ChangeRegisterUserGuard implements CanActivate {
    constructor(private userManagerService: UserManagerService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userManagerService.hasValidRegisterUser().map((res: boolean) => {
            if (res) {
                this.router.navigateByUrl("");
                return false;
            }
            return true;
        }, (error: any) => console.log("Got error from backend"));

    }
}

import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { ApiService } from "./api.service";
import { MediatorService } from "./mediator.service";
import {UserData, LoginSubmission } from "../../models/DataModels";
import {projectNames, roleNames } from "../../resources/app-settings";

/**
 * Servicen håndterer alt av brukerdata samt inn- og utlogging
 */
@Injectable()
export class UserManagerService {

    private userData: UserData;
    public loggedIn: boolean;
    private validRegisterUser: boolean;

    constructor(private apiService: ApiService, private mediatorService: MediatorService) {}

    checkIfLoginIsValid(username: string, password: string): Observable<string> {
        return this.apiService.logIn(<LoginSubmission>{ userName: username, password: password });
    }

    setUser(user: UserData): void {
        this.userData = user;
        if (user === undefined || user === null) return;
        this.userData.password = "";
        this.userData.oldPassword = "";
        this.mediatorService.pushUserInfo(user);
    }

    setUserApiKey(key: string) {
        if (this.userData == undefined)
            return;
        this.userData.searchApiKey = key;
    }

    getUserDetailsFromServer(): Observable<UserData>{
        return this.apiService.getUser().map((res: UserData) => {
            if (res === {}) {
                return;
            }
            this.setUser(res);
            return res;
        });
    }

    setValidRegisterUser(value: boolean): void {
        this.validRegisterUser = value;
    }

    setRegisterUsername(username: string): void {
        this.userData.registerUserName = username;
    }

    getProjects(): string[] {
        return projectNames;
    }

    getRoles(): string[] {
        return roleNames;
    }

    getProjectIdAsync(): Observable<number> {
        if (this.userData) return of(this.userData.projectValue);
        return this.getUser().map((user: UserData) => user.projectValue);
    }

    getProjectId(): number {
        if (this.userData == undefined)
            return -1;
        return this.userData.projectValue;
    }

    getUserNameAsync(): Observable<string> {
        if (this.userData) return of(this.userData.username);
        return this.getUser().map((data:UserData) => data.username);
    }

    getUserName(): string {
        return this.userData ? this.userData.username : "";
    }

    getName(): string {
        return this.userData == undefined ? "": this.userData.name;
    }

    getNameAsync(): Observable<string> {
        if (this.userData) return of(this.userData.name);
        return this.getUser().map((data: UserData) => data.name);
    }

    getApiKeyAsync(): Observable<string> {
        if (this.userData) return of(this.userData.searchApiKey);
        return this.getUser().map((data: UserData) => data.searchApiKey);

    }
    isLoggedIn(): Observable<boolean> {
        if (this.userData) return of (true);
        return this.apiService.isLoggedIn();
    }

    getRegisterUsername(): Observable<string> {
        
        return this.getUser().map((user: UserData) => {
            if (user) return user.registerUserName;
            return "";
        });
    }

    hasValidRegisterUser(): Observable<boolean> {
        return this.apiService.hasValidRegisterUser();
    }

    hasValidUserInformation(): Observable<boolean> {
        return this.apiService.validUserInformation();
    }

    updateRegisterUser(form: LoginSubmission): Observable<boolean> {
        return this.apiService.updateRegisterUser(form);
    }

    checkRegisterUser(form: LoginSubmission): Observable<boolean> {
        return this.apiService.checkRegisterUser(form);
    }

    getUser(): Observable<UserData> {
        if (this.userData !== undefined) {
             return of (this.userData);
        }
        return this.getUserDetailsFromServer();
    }

    createUser(user: UserData): Observable<string> {
        return this.apiService.createUser(user);
    }

    updateUser(user: UserData): Observable<string> {
        return this.apiService.updateUser(user);
    }

    generateNewPassword(username: string): Observable<string> {
        return this.apiService.generateNewPassword(username);
    }

    logOut():Observable<boolean> {
        return this.apiService.logOut();
    }

}
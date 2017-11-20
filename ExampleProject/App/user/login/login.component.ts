import { Component } from "@angular/core";
import { Response } from "@angular/http";
import { Router, ActivatedRoute} from "@angular/router";
import {UserManagerService} from "../../core/services/user-manager.service";
import {validateEmail} from "../../helpers/formvalidators";


declare var $: any;

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})

export class LoginComponent {
    errorMessage: string = "";
    epostMessage: string = "";
    passwordMessage: string = "";
    messages: boolean;

    createsuccess:boolean;
    newpasswordsuccess:boolean;

    loading: boolean; 

    epost: string = "";
    password: string = "";

    validEpost: boolean = true;
    validPassword: boolean = true;

    private sub: any;

    constructor(private router: Router, private userManager: UserManagerService, private route:ActivatedRoute) { }

    form:any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.createsuccess = params["state"] === "createsuccess";
            this.newpasswordsuccess = params["state"] === "newpasswordsuccess";
        });
    }

    newUser() {
        this.router.navigate(["createuser"]);
    }


    onSubmit() {
        if (this.checkInput()) {
            this.loading = true;
            this.login();
        }
    }

    login() {
        this.userManager.checkIfLoginIsValid(this.epost, this.password).subscribe((res: string) => {
            if (res === "success")
                this.router.navigate([""]);
            else {
                this.loading = false;
                this.errorMessage = res;
                this.updateMessages();
            }
        });
        
    }

    checkInput() {
        this.errorMessage = "";
        this.updateMessages();
        return this.checkEpost() && this.checkPassword();
    }

    checkEpost() {
        this.validEpost = validateEmail(this.epost); 
        this.epostMessage = this.validEpost ? "" : "Vennligst skriv inn en gylid epostadresse";
        this.updateMessages();
        return this.validEpost;
    }

    checkPassword() {
        this.validPassword = this.password.length > 0;
        this.passwordMessage = this.validPassword ? "":"Vennligst fyll inn et passord";
        this.updateMessages();
        return this.validPassword;
    }



    updateMessages() {
        this.messages = this.errorMessage.length > 0 || this.epostMessage.length > 0 || this.passwordMessage.length > 0;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
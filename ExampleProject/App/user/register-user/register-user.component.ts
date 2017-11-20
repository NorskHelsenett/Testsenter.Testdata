import { Component, EventEmitter, Output, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LoginSubmission } from "../../models/DataModels";
import {UserManagerService} from "../../core/services/user-manager.service";
declare var $: any;

@Component({
    selector: 'register-user',
    moduleId: module.id,
    templateUrl: 'register-user.component.html',
    styleUrls: ['../user.component.css']
})
export class RegisterUserComponent {

    @Output()
    onSuccess = new EventEmitter<LoginSubmission>();

    @Output()
    onCancel = new EventEmitter<string>();

    @Input()
    disabled: boolean;

    @Input()
    showRegisterContent: boolean;

    @Input()
    isNewUser:boolean;

    hasValidRegisterUser: boolean;
    loading: boolean;
    failed:boolean;

    validUsername = true;
    validPassword = true;

    savedData: LoginSubmission = new LoginSubmission();
    data: LoginSubmission = new LoginSubmission();

    

    constructor(private userManagerService: UserManagerService, private router:Router) { }

    ngOnInit() {
        if (!this.isNewUser){
            this.loading = true;
            this.userManagerService.getRegisterUsername().subscribe((res: string) => {
                this.loading = false;
                this.savedData.userName = res;
                this.data = this.savedData;
                this.userManagerService.hasValidRegisterUser().subscribe((res: boolean) => {
                    this.loading = false;
                    this.hasValidRegisterUser = res;
                });
        });
        }
    }

    checkRegisterUser(data = this.data) {
        this.checkValidUsername();
        this.checkPassword();
        if (!this.validUsername || !this.validPassword) return;
        this.loading = true;
        if (this.isNewUser) {
            this.userManagerService.checkRegisterUser(this.data).subscribe((res: boolean) => {
                this.loading = false;
                if (res) {
                    this.hasValidRegisterUser = true;
                    this.showRegisterContent = false;
                    this.onSuccess.emit(this.data);
                }
                this.failed = !res;
            });
        } else {
            this.userManagerService.updateRegisterUser(this.data).subscribe((res: boolean) => {
                this.loading = false;
                if (res) {
                    this.hasValidRegisterUser = true;
                    this.showRegisterContent = false;
                    this.savedData.userName = this.data.userName;
                    this.userManagerService.setRegisterUsername(this.data.userName);
                    this.onSuccess.emit(this.data);
                }
                this.failed = !res;
            });
        }
    
    }

    checkPassword(data = this.data) {
        this.validPassword = (data.password !== undefined && data.password.length > 0);
    }

    checkValidUsername() {
        this.validUsername = (this.data.userName !== undefined && this.data.userName.length > 0);
    }

    cancelRegisterUser() {
        this.showRegisterContent = false;
        this.onCancel.emit(this.savedData.userName);
    }

    
}
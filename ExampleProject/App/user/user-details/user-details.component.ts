import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Router } from "@angular/router";
import {UserData} from "../../models/DataModels";
import { projectNames, roleNames } from "../../resources/app-settings";
import {UserManagerService} from "../../core/services/user-manager.service";
declare var $: any;


@Component({
    selector: 'user-details',
    moduleId: module.id,
    templateUrl: 'user-details.component.html',
    styleUrls: ['../user.component.css']
})
export class UserDetailsComponent {

    @Input()
    isNewUser: boolean;

    @Input()
    showTestDataForm:boolean;

    @Input()
    disabled:boolean;

    @Input()
    loading = false;

    @Input()
    errorMessage: string;

    @Output()
    onSuccess = new EventEmitter<UserData>();

    @Output()
    onCancel = new EventEmitter();

    showPasswordPanel:boolean;
    termsAlreadyAccepted: boolean;
    missing:boolean;
    user: UserData;

    projects = projectNames;
    roles = roleNames;

    constructor(private userManagerService: UserManagerService, private router: Router) { }



    ngOnInit() {
        this.user = new UserData();
        if (!this.isNewUser) {
            if (this.router.url === "/adduserinformation") {
                this.missing = true;
                this.showTestDataForm = true;
            }
              
            this.loading = true;
            this.userManagerService.getUser().subscribe(user => {
                this.loading = false;
                this.termsAlreadyAccepted = true;
                user.hasAcceptedTerms = true;
                this.user = JSON.parse(JSON.stringify(user));
            });
        } else {
            this.user.hasAcceptedTerms = false;
            this.showTestDataForm = true;
            this.showPasswordPanel = true;
        }

        
    }


    ngAfterViewInit() {
        $('.ui.checkbox')
            .checkbox();
        this.setValidationRules();
    }

    termsCheckBoxToggle() {
        this.user.hasAcceptedTerms = !this.user.hasAcceptedTerms;
    }

    projectChecked(value: number) {
        this.user.projectValue = value;
    }

    roleChecked(value: number) {
        this.user.roleValue = value;
    }

    showTestData() {
        this.showTestDataForm = true;
        this.setValidationRules();
    }

    setValidationRules(): void {
        let self = this;
        $('#userForm')
            .form({
                fields: {
                    name: {
                        rules: [
                            {
                                type: 'regExp[.{2} .{2}]',
                                prompt: '{name} må inneholde minst to ord på minst 2 bokstaver'
                            }
                        ]
                    },
                    username: {
                        rules: [
                            {
                                type: 'email',
                                prompt: '{name} må være en gyldig e-post adresse'
                            }
                        ]
                    },
                    oldpassword:
                    {
                        optional: true,
                        rules: [
                            {
                                type: 'regExp',
                                value: '[A-Z]+',
                                prompt: 'Passord må inneholde minst én stor bokstav'
                            },
                            {
                                type: 'regExp',
                                value: '[a-z]+',
                                prompt: 'Passord må inneholde minst én liten bokstav'
                            },
                            {
                                type: 'regExp',
                                value: '[0-9]+',
                                prompt: 'Passord må inneholde minst ett tall'
                            },
                            {
                                type: 'minLength[8]',
                                prompt: 'Passord må være minst {ruleValue} tegn langt'
                            },
                        ]
                    },
                    password:
                    {
                        optional: !this.isNewUser,
                        rules: [
                            {
                                type: 'regExp',
                                value: '[A-Z]+',
                                prompt: 'Passord må inneholde minst én stor bokstav'
                            },
                            {
                                type: 'regExp',
                                value: '[a-z]+',
                                prompt: 'Passord må inneholde minst én liten bokstav'
                            },
                            {
                                type: 'regExp',
                                value: '[0-9]+',
                                prompt: 'Passord må inneholde minst ett tall'
                            },
                            {
                                type: 'minLength[8]',
                                prompt: 'Passord må være minst {ruleValue} tegn langt'
                            },
                        ]
                    },
                    passwordrepeat:
                    {
                        optional: !this.isNewUser,
                        rules: [
                            {
                                type: 'match[password]',
                                depends: 'password',
                                prompt: 'Passord må gjentas likt i feltet under'
                            }
                        ]
                    },
                    hasAcceptedTerms: {
                        optional: !this.isNewUser,
                        rules: [
                            {
                                type: 'checked',
                                prompt: '"{name}" må være krysset av'
                            }
                        ]
                    },
                    role: {
                        identifier: "role",
                        rules: [
                            {
                                type: 'checked',
                                prompt: 'Rolle må være valgt'
                            }
                        ]
                    },
                    project: {
                        identifier: "project",
                        rules: [
                            {
                                type: 'checked',
                                prompt: 'Område må være valgt'
                            }
                        ]
                    }
                },
                onSuccess() {
                    self.submitForm();
                    return false; // false is required if you do don't want to let it submit
                },
            });
    }

    submitForm() {
        this.onSuccess.emit(this.user);
    }

    cancel() {
        this.onCancel.emit();
    }
}
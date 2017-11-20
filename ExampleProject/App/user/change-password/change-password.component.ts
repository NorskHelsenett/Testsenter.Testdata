import { Component, Input } from "@angular/core";
declare var $: any;

@Component({
    selector: 'change-password',
    moduleId: module.id,
    templateUrl: 'change-password.component.html',
    styleUrls: ['../user.component.css']
})
export class ChangePasswordComponent {

    @Input()
    isNewUser: boolean;

    oldPassword: string;
    newPassword: string;


    ngAfterViewInit() {
        $('#passordForm')
            .form({
                fields: {
                    oldPassword: {
                        optional: !this.isNewUser,
                        rules: [
                            {
                                type: 'oldPassordCorrect',
                                prompt: 'Det gamle passordet du oppgav er ikke gyldig'
                            }
                        ]
                    },
                    newPassword: {
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
                            }
                        ]
                    },
                    newPasswordConfirmed: {
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
                            }
                        ]
                    }
                }
            });
    }

}
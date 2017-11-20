import { Component, Input, Output, EventEmitter } from '@angular/core';
import {StaticDataStep, ContactInformation } from "../../models/UtilityModels";
declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'contact-information',
    styleUrls: ["../static-data.css"],
    templateUrl: 'contact-information.component.html'
})

export class ContactInformationComponent {

    @Input()
    state: StaticDataStep;
    @Input()
    contactInformation: ContactInformation;
    @Output()
    stateChange = new EventEmitter<StaticDataStep>();
    ngOnInit() { }

    ngAfterViewInit(){
        let self = this;
        $('#contactForm').form({
            fields: {
                firstname: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Fornavn må være utfylt'
                        }
                    ]
                },
                lastname: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Etternavn må være utfylt'
                        }
                    ]
                },
                email: {
                    rules: [
                        {
                            type: 'email',
                            prompt: 'E-postadressen må være gyldig'
                        }
                    ]
                },
                business: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Virksomhet må være utfylt'
                        }
                    ]
                }
            },
            onSuccess(event:any, field:any) {
                self.print(field);
                return false;
            }
        });
    }
    
    print(field: any) {
        this.contactInformation.firstName = field.firstname;
        this.contactInformation.lastName = field.lastname;
        this.contactInformation.email = field.email;
        this.contactInformation.business = field.business;
        this.contactInformation.comments = field.comments;
        this.stateChange.emit(StaticDataStep.ContactInformation);
    }
}
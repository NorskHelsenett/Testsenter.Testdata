import { Component } from '@angular/core';
import {StaticPerson, StaticDataStep, StaticDataRegistration, ContactInformation, StaticBusiness } from "../../models/UtilityModels";
import {ApiService} from "../../core/services/api.service";

@Component({
    moduleId: module.id,
    selector: 'static-data-shared',
    templateUrl: 'static-data-shared.component.html',
    styleUrls: ["../static-data.css"]
})

export class StaticDataSharedComponent {


    constructor(private apiService: ApiService) {
        
    }
    validIds: boolean;
    persons: StaticPerson[] = [];
    businesses: StaticBusiness[] = [];
    contactInformation: ContactInformation = new ContactInformation();

    state: StaticDataStep = StaticDataStep.AddedData;
    registration: StaticDataRegistration;

    personData = true;
    ngOnInit() {}


    setState(state: StaticDataStep) {
        this.state = state;
        if (this.state === StaticDataStep.ContactInformation) {
            this.registration = new StaticDataRegistration();
            this.registration.staticPersons = this.persons;
            this.registration.staticBusinesses = this.businesses;
            this.registration.contactInformation = this.contactInformation;
            this.registerData();
        }
    }

    registerData(): void {
        var p = this.registration;
        this.apiService.simplePostRequest<boolean>("api/StaticData/Save", this.registration).subscribe((res: boolean) =>
        {
            if (res)
                this.setState(StaticDataStep.Register);
            else
                this.setState(StaticDataStep.Failed);
        });

    }
}
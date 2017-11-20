import { Component, Output, EventEmitter, Input } from '@angular/core';
import {StaticPerson, StaticDataStep } from "../../models/UtilityModels";
import {isNumberKey} from "../../helpers/formvalidators";
import { DiffPipe } from "ngx-pipes/src/app/pipes/array/diff";
import {ApiService} from "../../core/services/api.service";

@Component({
    moduleId: module.id,
    selector: 'person-data',
    styleUrls: ["../static-data.css"],
    templateUrl: 'person-data.component.html',
    providers: [DiffPipe]
})
export class PersonDataComponent {
    @Output()
    stateChange = new EventEmitter<StaticDataStep>();
    @Input()
    persons: StaticPerson[];
    @Input()
    state:StaticDataStep;

    registers:boolean[];
    loading:boolean;

    constructor(private apiService: ApiService, private diffPipe:DiffPipe) {}

    rawIds: string;
    errorMessage: string = "";

    valueChange(event: any): void {
        this.rawIds = event.target.value;
    }

    checkIds(): void {
        this.errorMessage = "";
        if (this.rawIds === "" || this.rawIds === undefined)
            return;
        let ids = this.rawIds.replace(/ /g, "").replace(/(?:\r\n|\r|\n)/g, "").split(",");
        this.validateIds(ids);

    }

    validateIds(ids: string[]): void {
        ids = ids.filter((e, i) => ids.indexOf(e) === i);
        let validIds = ids.filter(this.isNinOrHprNumber);
        if (validIds.length === 0) {
            this.errorMessage += `Følgende fødselsnummer/HPR-nummer har ugyldig format: ${ids.join(", ")}\n`;
            return;
        }
        this.loading = true;
        this.apiService.simplePostRequest<string[]>("api/StaticData/Check/Person", validIds).subscribe(res => {
            let diff = this.diffPipe.transform(validIds, res);
            validIds = res;
            validIds.forEach(id => this.persons.push(new StaticPerson(id, true)));
            if (diff.length > 0)
                this.errorMessage += `Vi får ikke treff på følgende fødselsnummer/HPR-nummer i registrene: ${diff.join(", ")}`;
            if (validIds.length > 0)
                this.stateChange.emit(StaticDataStep.Verified);
            this.loading = false;
            this.registers = new Array(validIds.length).fill(false);

        });
    }

    isNinOrHprNumber(element: string): boolean {
        return !isNaN(+element) && (element.length <= 11 && element.length > 6);
    }

    addRow(): void {
        this.persons.push(new StaticPerson("", false));
        this.registers.push(false);
    }

    isNumberKey(event: any) : boolean {
        return isNumberKey(event);
    }

    async checkArguments() {
         this.errorMessage = "";
         this.persons = this.persons.filter((p, i) => this.persons.findIndex(r => r.id === p.id) === i);
         let unchecked = this.persons.filter((p, i) => !p.checked);
            
         let validUnchecked = unchecked.filter(p => this.isNinOrHprNumber(p.id));
        if (validUnchecked && validUnchecked.length > 0) {
            await this.apiService.asyncPostRequest<string[]>("api/StaticData/Check", validUnchecked.map(p => p.id))
                .subscribe(res => 
                   {
                        res.forEach(r => this.persons.find(p => p.id === r).checked = true);

                    });


        }
        if (this.persons.filter(p => !p.checked).length > 0) {
            this.errorMessage = `Vi får ikke treff på følgende fødselsnummer/HPR-nummer i registrene: ${this.persons.filter(p => !p.checked).map(p => p.id).join(", ")}\n`;
        }
        let invalid = this.persons.filter(p => !p.isValid() && p.checked).map(p => p.id);
        if (invalid.length > 0)
            this.errorMessage = `Følgende fødselsnummer/HPR-nummer mangler tilknyttet argumentasjon: ${invalid.join(", ")}`;

        if (this.persons.every(p => p.isValid() && p.checked)) {
            this.stateChange.emit(StaticDataStep.Argument);
        }
    }

    removePerson(index: number): void {
        this.persons.splice(index, 1);
        this.registers.splice(index, 1);
    }


}
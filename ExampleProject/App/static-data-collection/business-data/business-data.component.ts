import { Component, Output, EventEmitter, Input } from '@angular/core';
import { StaticDataStep, StaticBusiness } from "../../models/UtilityModels";
import { isNumberKey } from "../../helpers/formvalidators";
import { DiffPipe } from "ngx-pipes/src/app/pipes/array/diff";
import {ApiService} from "../../core/services/api.service";

@Component({
    moduleId: module.id,
    selector: 'business-data',
    styleUrls: ["../static-data.css"],
    templateUrl: 'business-data.component.html',
    providers: [DiffPipe]
})
export class BusinessDataComponent {
    @Output()
    stateChange = new EventEmitter<StaticDataStep>();
    @Input()
    businesses: StaticBusiness[];
    @Input()
    state: StaticDataStep;
    registers: boolean[];

    loading: boolean;

    constructor(private apiService: ApiService, private diffPipe: DiffPipe) { }

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
        let validIds = ids.filter(this.isOrgNumber);
        if (validIds.length === 0) {
            this.errorMessage += `Følgende organisasjonsnummer/HER-ider har ugyldig format: ${ids.join(", ")}\n`;
            return;
        }
        this.loading = true;
        this.apiService.simplePostRequest<string[]>("api/StaticData/Check/Business", validIds).subscribe(res => {
            let diff = this.diffPipe.transform(validIds, res);
            validIds = res;
            validIds.forEach(id => this.businesses.push(new StaticBusiness(id, true)));
            if (diff.length > 0)
                this.errorMessage += `Vi får ikke treff på følgende organisasjonsnummer/HER-ider i registrene: ${diff.join(", ")}`;
            if (validIds.length > 0)
                this.stateChange.emit(StaticDataStep.Verified);
            this.loading = false;
            this.registers = new Array(validIds.length).fill(false);

        });
    }

    isOrgNumber(element: string): boolean {
        return !isNaN(+element);
    }

    addRow(): void {
        this.businesses.push(new StaticBusiness("", false));
        this.registers.push(false);

    }

    isNumberKey(event: any): boolean {
        return isNumberKey(event);
    }

    async checkArguments() {
        this.errorMessage = "";
        this.businesses = this.businesses.filter((p, i) => this.businesses.findIndex(r => r.id === p.id) === i);
        let unchecked = this.businesses.filter((p, i) => !p.checked);

        let validUnchecked = unchecked.filter(p => this.isOrgNumber(p.id));
        if (validUnchecked && validUnchecked.length > 0) {
            await this.apiService.asyncPostRequest<string[]>("api/StaticData/Check/Business", validUnchecked.map(p => p.id)).subscribe(res =>
                {
                 res.forEach(r => this.businesses.find(p => p.id === r).checked = true);

                });


        }
        if (this.businesses.filter(p => !p.checked).length > 0) {
            this.errorMessage = `Vi får ikke treff på følgende organisasjonsnummer/HER-ider i registrene: ${this.businesses.filter(p => !p.checked).map(p => p.id).join(", ")}\n`;
        }
        let invalid = this.businesses.filter(p => !p.isValid() && p.checked).map(p => p.id);
        if (invalid.length > 0)
            this.errorMessage = `Følgende organisasjonsnummer/HER-ider mangler tilknyttet argumentasjon: ${invalid.join(", ")}`;

        if (this.businesses.every(p => p.isValid() && p.checked)) {
            this.stateChange.emit(StaticDataStep.Argument);
        }
    }

    removeBusiness(index: number): void {
        this.businesses.splice(index, 1);
        this.registers.splice(index, 1);
    }


}
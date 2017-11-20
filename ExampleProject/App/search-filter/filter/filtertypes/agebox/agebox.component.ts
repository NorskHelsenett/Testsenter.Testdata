import { Component, Input } from "@angular/core";
import * as moment from "moment/moment";
import {FilterItem} from "../../../../models/DataModels";
import {FilterManagerService} from "../../../../core/services/filter-manager.service";

@Component({
    selector: "agebox",
    moduleId: module.id,
    templateUrl: "agebox.component.html",
    styleUrls: ["agebox.component.css"]
})
export class AgeBoxComponent {
    @Input()
    filters: FilterItem[];
    min: FilterItem;
    max: FilterItem;

    valueMax: string;
    valueMin: string;


    constructor(private filterManager: FilterManagerService) {}

    ngOnInit() {
        [this.min, this.max] = this.filters;
        if (this.min.parameter !== "") {
            this.valueMin = String(this.getYears(this.min.parameter));
        }
        if (this.max.parameter !== "") {
            this.valueMax = String(this.getYears(this.max.parameter));
        }
        this.filterManager.removedFilter$.subscribe((change:FilterItem) => {
            if (change.name === this.min.name && this.min.parameter === "") {
                this.valueMin = "";
            } else if (change.name === this.max.name && this.max.parameter === "") {
                this.valueMax = "";
            }
        });
    }

    onInput(isMin: boolean) {
        this.checkIfInputIsValid(isMin);
        this.setSelectedValue();
        this.performeSearch();
    }

    performeSearch() {
        this.filterManager.filterChanged([this.min, this.max]);
    }

    checkIfInputIsValid(isMin: boolean): void {
        let value = isMin ? this.valueMin : this.valueMax;
        if (value === "" || value === null) {
            this.setParameterValue("", isMin);
            return;
        }
        if (+value < 0) value = "0";
        if (isMin && this.valueMax !== "" && +value >= +this.valueMax) {
            value = this.valueMax;
            this.valueMin = this.valueMax;
        } else if (!isMin && this.valueMin !== "" && +value <= +this.valueMin) {
            value = this.valueMax;
            this.valueMax = this.valueMin;
        }
        this.setParameterValue(value, isMin);
    }

    getYears(parameter: string) {
        return parameter === "" ? "" : moment().diff(parameter, "years");
    }

    setParameterValue(value: string, isMin: boolean) {
        if (value === "") {
            if (isMin) this.min.parameter = this.valueMin;
            else this.max.parameter = this.valueMax;
        } else {
            const date = moment().subtract(+value, "y");
            if (isMin) this.min.parameter = date.toISOString();
            else {
                date.subtract(1, "y").add(1, "d");
                this.max.parameter = date.toISOString();
            }
        }
    }

    setSelectedValue() {
        this.min.selected = this.min.parameter !== "";
        this.max.selected = this.max.parameter !== "";
    }


    onBlur(isMin: boolean) {
        this.checkIfInputIsValid(isMin);
        this.setSelectedValue();
    }


}
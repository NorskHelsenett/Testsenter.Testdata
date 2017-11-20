import { Component, Input} from "@angular/core";
import {HitInformation} from "../../../models/UtilityModels";

@Component({
    selector: "information-container",
    moduleId: module.id,
    templateUrl: "information-container.component.html",
    styleUrls: ["../tab.css"]
})
export class InformationContainerComponent {
    @Input()
    information: HitInformation;
    @Input()
    title:string;

}


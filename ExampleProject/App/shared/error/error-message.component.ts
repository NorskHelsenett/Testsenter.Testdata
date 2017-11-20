import { Component } from "@angular/core";
import {ErrorMessage} from "../../models/UtilityModels";
import {MediatorService} from "../../core/services/mediator.service";

@Component({
    moduleId: module.id,
    selector: "error-message",
    templateUrl: "error-message.component.html"
})

export class ErrorMessageComponent {

    error: ErrorMessage;

    constructor(private mediatorService: MediatorService) {
        this.mediatorService.errorMessage$.subscribe((message) => {
            this.error = message;
            if (this.error.time)
                setTimeout(() => this.error = undefined, this.error.time );
        });
    }


}
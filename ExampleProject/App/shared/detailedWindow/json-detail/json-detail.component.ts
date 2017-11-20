import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { ChildViews } from "../../../models/UtilityModels";
declare var $: any;

@Component({
    selector: "json-detail",
    moduleId: module.id,
    templateUrl: "json-detail.component.html",
    styleUrls: ["../detailedWindow.css"]
})


export class JsonDetailComponent {

    @Input()
    content: string;

    @Output()
    onClose = new EventEmitter();  

    contentAsJson: string;
    title: string;

    jsonContent:any;

    ngOnChanges() {
        this.createJSONFormatter();
    }

    close(event: any) {
        event.stopPropagation();
        this.onClose.emit(ChildViews.None);
    }

    private createJSONFormatter() {
        this.jsonContent = JSON.parse(this.content);
    }
}

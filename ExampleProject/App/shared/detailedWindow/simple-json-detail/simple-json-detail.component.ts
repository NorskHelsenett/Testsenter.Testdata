import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { ChildViews } from "../../../models/UtilityModels";

declare var JSONFormatter: any;
declare var $: any;


@Component({
    selector: "simple-json-detail",
    moduleId: module.id,
    template: '<div class="horizontalscroll" #simpleJsonContainer></div>',
    styleUrls: ["../detailedWindow.css"]
})

export class SimpleJsonDetailComponent {
    @ViewChild("simpleJsonContainer") simpleJsonContainer:ElementRef;
    @Input()
    jsonObject:any;
    contentAsJson: any;
    content:any;
    ngOnInit() {
        this.content = this.jsonObject;
        this.renderJson();
    }

    ngOnChanges() {
        if (JSON.stringify(this.content) !== JSON.stringify(this.jsonObject) && this.content !== undefined) {
            this.content = this.jsonObject;
            this.renderJson();
        }
    }
    renderJson() {
        const formatter = new JSONFormatter(this.jsonObject, 2, {
            hoverPreviewEnabled: false,
            hoverPreviewArrayCount: 100,
            hoverPreviewFieldCount: 5,
            theme: '',
            animateOpen: false,
            animateClose: false
        });

        this.contentAsJson = formatter.render();
        $(this.simpleJsonContainer.nativeElement).empty().append(this.contentAsJson);
    }
    

}
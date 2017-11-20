import { Component, Input } from "@angular/core";


declare var jsondiffpatch: any;
declare var $: any;
@Component({
    selector: "simple-json-diff",
    moduleId: module.id,
    template: '<div class="horizontalscroll" [innerHtml]="jsonDiffContent"></div>',
    styleUrls: ["../detailedwindow.css"]
})

export class SimpleJsonDiffComponent {
    @Input()
    before: any;
    @Input()
    after: any;

    jsonDiffContent: any;


    ngOnInit() {
        let delta = jsondiffpatch.diff(this.before, this.after);
        jsondiffpatch.formatters.html.hideUnchanged();
        this.jsonDiffContent = jsondiffpatch.formatters.html.format(delta, this.before);
    }
}
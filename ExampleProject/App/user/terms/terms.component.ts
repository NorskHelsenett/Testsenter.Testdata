import { Component } from '@angular/core';

declare var $: any;

@Component({
    selector: "termsofuse",
    moduleId: module.id,
    templateUrl: "terms.component.html"
})

export class TermsComponent {
    showTerms() {
        $('.ui.modal')
            .modal('show');
    }
}
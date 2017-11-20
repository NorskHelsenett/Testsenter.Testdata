import { Component, Input } from "@angular/core";
import {DataManagerService} from "../../core/services/data-manager.service";

@Component({
    moduleId: module.id,
    selector: "create-comment",
    templateUrl: "create-comment.component.html"
})

export class CreateCommentComponent {

    @Input()
    commonIdentifier: string;

    content:string;
    showBox: boolean;

    saving:boolean;

    constructor(private dataManager: DataManagerService){}

    save(): void {
        if (this.content === undefined && this.content === "")
            return;
        this.saving = true;
        this.dataManager.addCommentToPerson(this.content, this.commonIdentifier).subscribe((res:boolean) => {
            this.saving = false;
            if (res) {
                this.showBox = false;
                this.content = "";
            }
        });
    }
}
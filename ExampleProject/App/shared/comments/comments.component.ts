import { Component, Input } from "@angular/core";
import { Comment } from "../../models/DataModels";
import {MediatorService} from "../../core/services/mediator.service";
import {DataManagerService} from "../../core/services/data-manager.service";
import {SearchManagerService} from "../../core/services/search-manager.service";

@Component({
    selector: "comments",
    moduleId: module.id,
    templateUrl: "comments.component.html",
    styleUrls: ["comments.component.css"]
})

export class CommentsComponent {

    @Input()
    comments: Comment[];
    @Input()
    details:boolean;

    userName: string;

    constructor(private mediator: MediatorService, private dataManager:DataManagerService, private searchManager:SearchManagerService) {
        this.mediator.userInfo$.subscribe(user => {
            if (user)
                this.userName = user.username;
        });
    }

    remove(comment: Comment):void  {
        this.dataManager.removeComment(comment);   
    }

    searchWithNin(comment: Comment): void {
        this.searchManager.searchWithNin(comment.commonIdentifier);
    }

}
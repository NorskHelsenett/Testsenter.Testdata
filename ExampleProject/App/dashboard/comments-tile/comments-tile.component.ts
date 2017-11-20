import { Component } from "@angular/core";
import {ApiService} from "../../core/services/api.service";
import { Comment } from "../../models/DataModels";
declare var $: any;

@Component({
    moduleId: module.id,
    selector: "comments-tile",
    templateUrl: "comments-tile.component.html",
    styleUrls: ["../dashboard.component.css"]
})

export class CommentsTileComponent {

    commentList: Comment[];
    loading:boolean;
    constructor(private apiService: ApiService) { }   

    ngOnInit() {
        this.loading = true;
        this.apiService.getAllComments().subscribe((res:Comment[]) => {
            this.commentList = res;
            this.loading = false;
            $('.ui.accordion').accordion('refresh');
        });
    }

    ngAfterViewInit() {
        $('.ui.accordion').accordion();
    }
}
import { Injectable } from "@angular/core";
import {ApiService} from "./api.service";
import {Comment} from "../../models/DataModels";
import {DataManagerService} from "./data-manager.service";

@Injectable()
export class CommentsManagerService {
    //Brukes ikke, men tanken er å simplifisere DataManagerService ved å trekke ut kommentarloggiken ut fra tjenesten
    constructor(private apiService: ApiService, private dataManager:DataManagerService){}

    addComment(content: string, ci: string) {
        let comment = <Comment>{
            commonIdentifier: ci,
            content: content
        }
        //this.dataManager.addComment(comment);
        //let obs = this.apiService.addComment(comment);
        //return obs.subscribe((res: Response) => { return res.json(); }, err => {
        //    this.dataManager.removeComment(comment);
        //    return false;
        //});


    }

    removeComment(comment: Comment) {

        //this.dataManager.addComment(comment);
        //let obs = this.apiService.removeComment(comment);
        //return obs.subscribe(res  => { }
        //    , err => this.dataManager.addComment(comment)
        //);
    }
}
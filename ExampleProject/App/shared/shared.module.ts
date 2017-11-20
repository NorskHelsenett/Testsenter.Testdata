import { NgModule } from '@angular/core'
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {SimpleDatePipe} from "./shared-pipes/simpledate.pipe";
import {ProjectNamePipe} from "./shared-pipes/projectname.pipe";
import {RegisterFilterFullNamePipe} from "./shared-pipes/registerfullname.pipe";
import { NgPipesModule } from "ngx-pipes";
import {CommentsComponent} from "./comments/comments.component";
import {JsonDetailComponent} from "./detailedWindow/json-detail/json-detail.component";
import {SimpleJsonDetailComponent} from "./detailedWindow/simple-json-detail/simple-json-detail.component";
import {SimpleJsonDiffComponent} from "./detailedWindow/simple-json-diff/simple-json-diff.component";
import {FamilyComponent} from "./detailedWindow/family/family.component";
import {CreateCommentComponent} from "./comments/create-comment.component";
import {ErrorMessageComponent} from "./error/error-message.component";


@NgModule({
        
    imports: [CommonModule, FormsModule, NgPipesModule],
    declarations: [SimpleDatePipe, ProjectNamePipe, RegisterFilterFullNamePipe, CommentsComponent, JsonDetailComponent,
        SimpleJsonDetailComponent, SimpleJsonDiffComponent, FamilyComponent, CreateCommentComponent, ErrorMessageComponent],
    exports: [CommonModule, FormsModule, NgPipesModule, SimpleDatePipe, ProjectNamePipe, ErrorMessageComponent,
        RegisterFilterFullNamePipe, CommentsComponent, JsonDetailComponent, FamilyComponent, SimpleJsonDiffComponent,
        SimpleJsonDetailComponent, CreateCommentComponent]
})
export class SharedModule { }
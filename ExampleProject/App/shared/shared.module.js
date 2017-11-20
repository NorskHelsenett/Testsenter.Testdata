"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var simpledate_pipe_1 = require("./shared-pipes/simpledate.pipe");
var projectname_pipe_1 = require("./shared-pipes/projectname.pipe");
var registerfullname_pipe_1 = require("./shared-pipes/registerfullname.pipe");
var ngx_pipes_1 = require("ngx-pipes");
var comments_component_1 = require("./comments/comments.component");
var json_detail_component_1 = require("./detailedWindow/json-detail/json-detail.component");
var simple_json_detail_component_1 = require("./detailedWindow/simple-json-detail/simple-json-detail.component");
var simple_json_diff_component_1 = require("./detailedWindow/simple-json-diff/simple-json-diff.component");
var family_component_1 = require("./detailedWindow/family/family.component");
var create_comment_component_1 = require("./comments/create-comment.component");
var error_message_component_1 = require("./error/error-message.component");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, ngx_pipes_1.NgPipesModule],
            declarations: [simpledate_pipe_1.SimpleDatePipe, projectname_pipe_1.ProjectNamePipe, registerfullname_pipe_1.RegisterFilterFullNamePipe, comments_component_1.CommentsComponent, json_detail_component_1.JsonDetailComponent,
                simple_json_detail_component_1.SimpleJsonDetailComponent, simple_json_diff_component_1.SimpleJsonDiffComponent, family_component_1.FamilyComponent, create_comment_component_1.CreateCommentComponent, error_message_component_1.ErrorMessageComponent],
            exports: [common_1.CommonModule, forms_1.FormsModule, ngx_pipes_1.NgPipesModule, simpledate_pipe_1.SimpleDatePipe, projectname_pipe_1.ProjectNamePipe, error_message_component_1.ErrorMessageComponent,
                registerfullname_pipe_1.RegisterFilterFullNamePipe, comments_component_1.CommentsComponent, json_detail_component_1.JsonDetailComponent, family_component_1.FamilyComponent, simple_json_diff_component_1.SimpleJsonDiffComponent,
                simple_json_detail_component_1.SimpleJsonDetailComponent, create_comment_component_1.CreateCommentComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map
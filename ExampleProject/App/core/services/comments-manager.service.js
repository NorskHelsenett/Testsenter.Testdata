"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("./api.service");
var data_manager_service_1 = require("./data-manager.service");
var CommentsManagerService = (function () {
    //Brukes ikke, men tanken er å simplifisere DataManagerService ved å trekke ut kommentarloggiken ut fra tjenesten
    function CommentsManagerService(apiService, dataManager) {
        this.apiService = apiService;
        this.dataManager = dataManager;
    }
    CommentsManagerService.prototype.addComment = function (content, ci) {
        var comment = {
            commonIdentifier: ci,
            content: content
        };
        //this.dataManager.addComment(comment);
        //let obs = this.apiService.addComment(comment);
        //return obs.subscribe((res: Response) => { return res.json(); }, err => {
        //    this.dataManager.removeComment(comment);
        //    return false;
        //});
    };
    CommentsManagerService.prototype.removeComment = function (comment) {
        //this.dataManager.addComment(comment);
        //let obs = this.apiService.removeComment(comment);
        //return obs.subscribe(res  => { }
        //    , err => this.dataManager.addComment(comment)
        //);
    };
    CommentsManagerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService, data_manager_service_1.DataManagerService])
    ], CommentsManagerService);
    return CommentsManagerService;
}());
exports.CommentsManagerService = CommentsManagerService;
//# sourceMappingURL=comments-manager.service.js.map
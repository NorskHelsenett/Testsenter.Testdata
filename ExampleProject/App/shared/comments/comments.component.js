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
var mediator_service_1 = require("../../core/services/mediator.service");
var data_manager_service_1 = require("../../core/services/data-manager.service");
var search_manager_service_1 = require("../../core/services/search-manager.service");
var CommentsComponent = (function () {
    function CommentsComponent(mediator, dataManager, searchManager) {
        var _this = this;
        this.mediator = mediator;
        this.dataManager = dataManager;
        this.searchManager = searchManager;
        this.mediator.userInfo$.subscribe(function (user) {
            if (user)
                _this.userName = user.username;
        });
    }
    CommentsComponent.prototype.remove = function (comment) {
        this.dataManager.removeComment(comment);
    };
    CommentsComponent.prototype.searchWithNin = function (comment) {
        this.searchManager.searchWithNin(comment.commonIdentifier);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommentsComponent.prototype, "comments", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CommentsComponent.prototype, "details", void 0);
    CommentsComponent = __decorate([
        core_1.Component({
            selector: "comments",
            moduleId: module.id,
            templateUrl: "comments.component.html",
            styleUrls: ["comments.component.css"]
        }),
        __metadata("design:paramtypes", [mediator_service_1.MediatorService, data_manager_service_1.DataManagerService, search_manager_service_1.SearchManagerService])
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;
//# sourceMappingURL=comments.component.js.map
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
var data_manager_service_1 = require("../../core/services/data-manager.service");
var CreateCommentComponent = (function () {
    function CreateCommentComponent(dataManager) {
        this.dataManager = dataManager;
    }
    CreateCommentComponent.prototype.save = function () {
        var _this = this;
        if (this.content === undefined && this.content === "")
            return;
        this.saving = true;
        this.dataManager.addCommentToPerson(this.content, this.commonIdentifier).subscribe(function (res) {
            _this.saving = false;
            if (res) {
                _this.showBox = false;
                _this.content = "";
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CreateCommentComponent.prototype, "commonIdentifier", void 0);
    CreateCommentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "create-comment",
            templateUrl: "create-comment.component.html"
        }),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService])
    ], CreateCommentComponent);
    return CreateCommentComponent;
}());
exports.CreateCommentComponent = CreateCommentComponent;
//# sourceMappingURL=create-comment.component.js.map
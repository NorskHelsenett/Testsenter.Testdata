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
var UtilityModels_1 = require("../../../models/UtilityModels");
var JsonDetailComponent = (function () {
    function JsonDetailComponent() {
        this.onClose = new core_1.EventEmitter();
    }
    JsonDetailComponent.prototype.ngOnChanges = function () {
        this.createJSONFormatter();
    };
    JsonDetailComponent.prototype.close = function (event) {
        event.stopPropagation();
        this.onClose.emit(UtilityModels_1.ChildViews.None);
    };
    JsonDetailComponent.prototype.createJSONFormatter = function () {
        this.jsonContent = JSON.parse(this.content);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], JsonDetailComponent.prototype, "content", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], JsonDetailComponent.prototype, "onClose", void 0);
    JsonDetailComponent = __decorate([
        core_1.Component({
            selector: "json-detail",
            moduleId: module.id,
            templateUrl: "json-detail.component.html",
            styleUrls: ["../detailedWindow.css"]
        })
    ], JsonDetailComponent);
    return JsonDetailComponent;
}());
exports.JsonDetailComponent = JsonDetailComponent;
//# sourceMappingURL=json-detail.component.js.map
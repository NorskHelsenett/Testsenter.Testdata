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
var ErrorMessageComponent = (function () {
    function ErrorMessageComponent(mediatorService) {
        var _this = this;
        this.mediatorService = mediatorService;
        this.mediatorService.errorMessage$.subscribe(function (message) {
            _this.error = message;
            if (_this.error.time)
                setTimeout(function () { return _this.error = undefined; }, _this.error.time);
        });
    }
    ErrorMessageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "error-message",
            templateUrl: "error-message.component.html"
        }),
        __metadata("design:paramtypes", [mediator_service_1.MediatorService])
    ], ErrorMessageComponent);
    return ErrorMessageComponent;
}());
exports.ErrorMessageComponent = ErrorMessageComponent;
//# sourceMappingURL=error-message.component.js.map
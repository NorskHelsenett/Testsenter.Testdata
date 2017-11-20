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
var SimpleJsonDetailComponent = (function () {
    function SimpleJsonDetailComponent() {
    }
    SimpleJsonDetailComponent.prototype.ngOnInit = function () {
        this.content = this.jsonObject;
        this.renderJson();
    };
    SimpleJsonDetailComponent.prototype.ngOnChanges = function () {
        if (JSON.stringify(this.content) !== JSON.stringify(this.jsonObject) && this.content !== undefined) {
            this.content = this.jsonObject;
            this.renderJson();
        }
    };
    SimpleJsonDetailComponent.prototype.renderJson = function () {
        var formatter = new JSONFormatter(this.jsonObject, 2, {
            hoverPreviewEnabled: false,
            hoverPreviewArrayCount: 100,
            hoverPreviewFieldCount: 5,
            theme: '',
            animateOpen: false,
            animateClose: false
        });
        this.contentAsJson = formatter.render();
        $(this.simpleJsonContainer.nativeElement).empty().append(this.contentAsJson);
    };
    __decorate([
        core_1.ViewChild("simpleJsonContainer"),
        __metadata("design:type", core_1.ElementRef)
    ], SimpleJsonDetailComponent.prototype, "simpleJsonContainer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SimpleJsonDetailComponent.prototype, "jsonObject", void 0);
    SimpleJsonDetailComponent = __decorate([
        core_1.Component({
            selector: "simple-json-detail",
            moduleId: module.id,
            template: '<div class="horizontalscroll" #simpleJsonContainer></div>',
            styleUrls: ["../detailedWindow.css"]
        })
    ], SimpleJsonDetailComponent);
    return SimpleJsonDetailComponent;
}());
exports.SimpleJsonDetailComponent = SimpleJsonDetailComponent;
//# sourceMappingURL=simple-json-detail.component.js.map
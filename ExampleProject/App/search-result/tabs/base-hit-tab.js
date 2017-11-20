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
var UtilityModels_1 = require("../../models/UtilityModels");
var BaseHitTab = (function () {
    function BaseHitTab() {
        this._showDetails = new core_1.EventEmitter();
        this.information = {
            details: [],
            faded: false
        };
        this.childviews = UtilityModels_1.ChildViews;
    }
    BaseHitTab.prototype.showDetails = function (view, data) {
        this._showDetails.emit({ view: view, data: data });
    };
    BaseHitTab.prototype.showJsonDetails = function (data) {
        this._showDetails.emit({ view: UtilityModels_1.ChildViews.Json, data: data });
    };
    BaseHitTab.prototype.addDetail = function (description, value, extra, children, info) {
        if (info === void 0) { info = this.information; }
        if (value == undefined)
            return;
        info.details.push({
            description: description,
            value: value,
            extra: extra,
            children: children
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BaseHitTab.prototype, "item", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BaseHitTab.prototype, "_showDetails", void 0);
    return BaseHitTab;
}());
exports.BaseHitTab = BaseHitTab;
//# sourceMappingURL=base-hit-tab.js.map
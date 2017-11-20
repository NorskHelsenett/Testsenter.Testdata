"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_hit_tab_1 = require("../base-hit-tab");
var app_settings_1 = require("../../../resources/app-settings");
var PersonBaseHitTab = (function (_super) {
    __extends(PersonBaseHitTab, _super);
    function PersonBaseHitTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonBaseHitTab.prototype.getLatestJsonContent = function (register) {
        switch (register) {
            case app_settings_1.RegisterNames[app_settings_1.RegisterNames.Preg]:
                return this.item.detail.pregJson;
            case app_settings_1.RegisterNames[app_settings_1.RegisterNames.Hpr]:
                return this.item.detail.hprJson;
            case app_settings_1.RegisterNames[app_settings_1.RegisterNames.FlrDoctor]:
                return this.item.detail.fastlegeJson;
            case app_settings_1.RegisterNames[app_settings_1.RegisterNames.FlrPasient]:
                return this.item.detail.fastlegePasientJson;
            default:
                return "";
        }
    };
    return PersonBaseHitTab;
}(base_hit_tab_1.BaseHitTab));
exports.PersonBaseHitTab = PersonBaseHitTab;
//# sourceMappingURL=person-base-hit-tab.js.map
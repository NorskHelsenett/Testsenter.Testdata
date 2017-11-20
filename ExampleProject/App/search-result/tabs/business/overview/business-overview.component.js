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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UtilityModels_1 = require("../../../../models/UtilityModels");
var business_base_hit_tab_1 = require("../business-base-hit-tab");
var BusinessOverviewComponent = (function (_super) {
    __extends(BusinessOverviewComponent, _super);
    function BusinessOverviewComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BusinessOverviewComponent.prototype.ngOnInit = function () {
        console.log(this.item);
        this.addDetail("Navn: ", this.item.name);
        this.addDetail("Organisasjonsnummer: ", this.item.organizationNumber);
        this.addDetail("HER-ID: ", this.item.herId);
        this.addDetail("Resh-ID: ", this.item.reshId);
        this.addDetail("Organisasjonsnavn: ", this.item.name);
        this.addDetail("Visningsnavn: ", this.item.displayName);
        if (this.item.detail.bedRegJson) {
            this.bedreg = JSON.parse(this.item.detail.bedRegJson);
            this.hasChildren = this.bedreg.Children != undefined;
            this.addDetail("Foreldenhet i BREG: ", this.bedreg.ParentOrganizationName, this.bedreg.ParentOrganizationNumber);
            this.addDetail("Antall underenheter i BREG: ", this.hasChildren ? this.bedreg.Children.length : undefined);
        }
    };
    //getChilds(bedreg:any) {
    //    if (bedreg.Children && bedreg.Children.length > 0) {
    //        let detail: Detail[] = [];
    //        bedreg.Children.forEach((child: any) => {
    //            detail.push(<Detail>{
    //                description: "Organisasjonsnavn: ",
    //                value: child.Name,
    //                extra: child.OrganizationNumber
    //            });
    //        });
    //        return [<HitInformation>{ details: detail }];
    //    }
    //}
    BusinessOverviewComponent.prototype.showBedregChildren = function () {
        this.showDetails(UtilityModels_1.ChildViews.Json, JSON.stringify(this.bedreg.Children));
    };
    BusinessOverviewComponent.prototype.showHtkDetails = function () {
        this.showDetails(UtilityModels_1.ChildViews.Json, this.item.detail.htkJson);
    };
    BusinessOverviewComponent.prototype.showReshDetails = function () {
        this.showDetails(UtilityModels_1.ChildViews.Json, this.item.detail.reshJson);
    };
    BusinessOverviewComponent = __decorate([
        core_1.Component({
            selector: 'business-overview',
            moduleId: module.id,
            templateUrl: 'business-overview.component.html',
            styleUrls: ['../../tab.css']
        })
    ], BusinessOverviewComponent);
    return BusinessOverviewComponent;
}(business_base_hit_tab_1.BusinessBaseHitTab));
exports.BusinessOverviewComponent = BusinessOverviewComponent;
//# sourceMappingURL=business-overview.component.js.map
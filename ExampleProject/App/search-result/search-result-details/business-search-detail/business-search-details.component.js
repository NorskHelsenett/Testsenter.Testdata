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
var DataModels_1 = require("../../../models/DataModels");
var data_manager_service_1 = require("../../../core/services/data-manager.service");
var codes_manager_service_1 = require("../../../core/services/codes-manager.service");
var of_1 = require("rxjs/observable/of");
var BusinessSearchDetailComponent = (function () {
    function BusinessSearchDetailComponent(dataManagerService, codeManager) {
        this.dataManagerService = dataManagerService;
        this.codeManager = codeManager;
    }
    BusinessSearchDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.taglist = this.business.tags.map(function (t) { return _this.dataManagerService.getTagName(t); });
        this.type = this.getBusinessInfo();
    };
    BusinessSearchDetailComponent.prototype.ngAfterViewInit = function () {
        $("#" + this.business.commonIdentifier + "-accordion").accordion();
    };
    BusinessSearchDetailComponent.prototype.getId = function () {
        if (this.business.organizationNumber != undefined)
            return this.business.organizationNumber;
        if (this.business.herId != undefined)
            return this.business.herId;
        return this.business.reshId;
    };
    BusinessSearchDetailComponent.prototype.getBusinessDetail = function (event) {
        var _this = this;
        //Ignore double clicks
        if (this.ignore) {
            event.stopPropagation();
            return;
        }
        this.ignore = true;
        setTimeout(function () { return _this.ignore = false; }, 500);
        this.loading = true;
        this.showDetails = !this.showDetails;
        this.dataManagerService.getCachedBusinessDetails(this.business).subscribe(function (res) {
            _this.business.detail = res;
            _this.loading = false;
        });
    };
    BusinessSearchDetailComponent.prototype.getTagName = function (id) {
        return this.dataManagerService.getTagName(id);
    };
    BusinessSearchDetailComponent.prototype.addTag = function (tag) {
        if (this.taglist.indexOf(tag) !== -1)
            this.taglist.push(tag);
    };
    BusinessSearchDetailComponent.prototype.removeTag = function (tag) {
        this.taglist.splice(this.taglist.findIndex(function (t) { return t === tag; }), 1);
    };
    BusinessSearchDetailComponent.prototype.getBusinessInfo = function () {
        var name = "";
        if (this.business.businessType) {
            var type = this.business.businessType;
            if (type === "101") {
                if (this.business.isInFlr)
                    return of_1.of("Fastlegekontor");
                else
                    return of_1.of(this.business.htkIsGovernmentCompany ? "Helseforetak" : "Privat sykehus");
            }
            else {
                return this.codeManager.getCodeNameOidAsync(type, 9040);
            }
        }
        else if (this.business.industryCodes && this.business.industryCodes.length > 0) {
            return this.codeManager.getCodeNamesAsync(this.business.industryCodes, "naringskode");
        }
        else if (this.business.communicationPartyType) {
            return of_1.of(this.business.communicationPartyType);
        }
        return of_1.of("Ukjent");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", DataModels_1.RegisterBusiness)
    ], BusinessSearchDetailComponent.prototype, "business", void 0);
    BusinessSearchDetailComponent = __decorate([
        core_1.Component({
            selector: "business-search-detail",
            moduleId: module.id,
            templateUrl: "business-search-detail.component.html",
            styleUrls: ["../search-result.css"]
        }),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService, codes_manager_service_1.CodeManagerService])
    ], BusinessSearchDetailComponent);
    return BusinessSearchDetailComponent;
}());
exports.BusinessSearchDetailComponent = BusinessSearchDetailComponent;
//# sourceMappingURL=business-search-details.component.js.map
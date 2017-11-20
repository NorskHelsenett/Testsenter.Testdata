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
var registerhelper_1 = require("../../../helpers/registerhelper");
var data_manager_service_1 = require("../../../core/services/data-manager.service");
var user_manager_service_1 = require("../../../core/services/user-manager.service");
var PersonSearchDetailComponent = (function () {
    function PersonSearchDetailComponent(dataManagerService, userManagerService) {
        this.dataManagerService = dataManagerService;
        this.userManagerService = userManagerService;
    }
    PersonSearchDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.taglist = this.person.tags.map(function (t) { return _this.dataManagerService.getTagName(t); });
        registerhelper_1.setStarStatus(this.userManagerService.getProjectIdAsync(), this.person);
    };
    PersonSearchDetailComponent.prototype.ngAfterViewInit = function () {
        $("#" + this.person.commonIdentifier + "-accordion").accordion();
    };
    PersonSearchDetailComponent.prototype.getPersonColor = function () {
        return registerhelper_1.getPersonColor(this.person.status);
    };
    PersonSearchDetailComponent.prototype.getPersonInfo = function () {
        if (this.person.info === "Utgått autorisasjon")
            return this.person.info;
        if (this.person.info == undefined)
            return "";
        if (this.person.fastlegestillinger && this.person.fastlegestillinger.some(function (f) { return f === "LPFL"; }))
            return "Fastlege";
        var array = this.person.info.split(", ");
        return array.slice(0, 2).join(", ") + (array.length > 2 ? " (..) " : "");
    };
    PersonSearchDetailComponent.prototype.getPersonName = function () {
        var name = this.person.pregName !== null ? this.person.pregName : this.person.hprName;
        return name;
    };
    PersonSearchDetailComponent.prototype.setClasses = function () {
        if (this.person.starState === undefined)
            return;
        var classes = {
            empty: this.person.starState === 3 || this.person.starState === 4,
            half: this.person.starState === 4,
            hodorgreen: true,
            star: this.person.starState > 1,
            icon: true,
            large: true
        };
        return classes;
    };
    PersonSearchDetailComponent.prototype.getPersonDetail = function (event) {
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
        this.dataManagerService.getCachedPersonDetails(this.person).subscribe(function (res) {
            _this.person.detail = res;
            _this.loading = false;
        });
    };
    PersonSearchDetailComponent.prototype.getTagName = function (id) {
        return this.dataManagerService.getTagName(id);
    };
    Object.defineProperty(PersonSearchDetailComponent.prototype, "starstateExplantion", {
        get: function () {
            if (this.person.starState === undefined)
                return "";
            switch (this.person.starState) {
                case 1:
                    return "Ikke overvåket av noe prosjekt";
                case 2:
                    return "Overvåket av ditt prosjekt";
                case 3:
                    return "Overvåket av et annet prosjekt";
                case 4:
                    return "Overvåket av ditt prosjekt og et eller flere andre prosjekter";
                default:
                    return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    PersonSearchDetailComponent.prototype.addTag = function (tag) {
        if (this.taglist.indexOf(tag) !== -1)
            this.taglist.push(tag);
    };
    PersonSearchDetailComponent.prototype.removeTag = function (tag) {
        this.taglist.splice(this.taglist.findIndex(function (t) { return t === tag; }), 1);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", DataModels_1.RegisterPerson)
    ], PersonSearchDetailComponent.prototype, "person", void 0);
    PersonSearchDetailComponent = __decorate([
        core_1.Component({
            selector: "person-search-detail",
            moduleId: module.id,
            templateUrl: "person-search-detail.component.html",
            styleUrls: ["person-search-detail.component.css"]
        }),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService, user_manager_service_1.UserManagerService])
    ], PersonSearchDetailComponent);
    return PersonSearchDetailComponent;
}());
exports.PersonSearchDetailComponent = PersonSearchDetailComponent;
//# sourceMappingURL=person-search-detail.component.js.map
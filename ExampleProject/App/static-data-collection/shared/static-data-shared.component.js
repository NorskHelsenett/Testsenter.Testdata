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
var api_service_1 = require("../../core/services/api.service");
var StaticDataSharedComponent = (function () {
    function StaticDataSharedComponent(apiService) {
        this.apiService = apiService;
        this.persons = [];
        this.businesses = [];
        this.contactInformation = new UtilityModels_1.ContactInformation();
        this.state = UtilityModels_1.StaticDataStep.AddedData;
        this.personData = true;
    }
    StaticDataSharedComponent.prototype.ngOnInit = function () { };
    StaticDataSharedComponent.prototype.setState = function (state) {
        this.state = state;
        if (this.state === UtilityModels_1.StaticDataStep.ContactInformation) {
            this.registration = new UtilityModels_1.StaticDataRegistration();
            this.registration.staticPersons = this.persons;
            this.registration.staticBusinesses = this.businesses;
            this.registration.contactInformation = this.contactInformation;
            this.registerData();
        }
    };
    StaticDataSharedComponent.prototype.registerData = function () {
        var _this = this;
        var p = this.registration;
        this.apiService.simplePostRequest("api/StaticData/Save", this.registration).subscribe(function (res) {
            if (res)
                _this.setState(UtilityModels_1.StaticDataStep.Register);
            else
                _this.setState(UtilityModels_1.StaticDataStep.Failed);
        });
    };
    StaticDataSharedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'static-data-shared',
            templateUrl: 'static-data-shared.component.html',
            styleUrls: ["../static-data.css"]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], StaticDataSharedComponent);
    return StaticDataSharedComponent;
}());
exports.StaticDataSharedComponent = StaticDataSharedComponent;
//# sourceMappingURL=static-data-shared.component.js.map
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
var ContactInformationComponent = (function () {
    function ContactInformationComponent() {
        this.stateChange = new core_1.EventEmitter();
    }
    ContactInformationComponent.prototype.ngOnInit = function () { };
    ContactInformationComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        $('#contactForm').form({
            fields: {
                firstname: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Fornavn må være utfylt'
                        }
                    ]
                },
                lastname: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Etternavn må være utfylt'
                        }
                    ]
                },
                email: {
                    rules: [
                        {
                            type: 'email',
                            prompt: 'E-postadressen må være gyldig'
                        }
                    ]
                },
                business: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Virksomhet må være utfylt'
                        }
                    ]
                }
            },
            onSuccess: function (event, field) {
                self.print(field);
                return false;
            }
        });
    };
    ContactInformationComponent.prototype.print = function (field) {
        this.contactInformation.firstName = field.firstname;
        this.contactInformation.lastName = field.lastname;
        this.contactInformation.email = field.email;
        this.contactInformation.business = field.business;
        this.contactInformation.comments = field.comments;
        this.stateChange.emit(UtilityModels_1.StaticDataStep.ContactInformation);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ContactInformationComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", UtilityModels_1.ContactInformation)
    ], ContactInformationComponent.prototype, "contactInformation", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ContactInformationComponent.prototype, "stateChange", void 0);
    ContactInformationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'contact-information',
            styleUrls: ["../static-data.css"],
            templateUrl: 'contact-information.component.html'
        })
    ], ContactInformationComponent);
    return ContactInformationComponent;
}());
exports.ContactInformationComponent = ContactInformationComponent;
//# sourceMappingURL=contact-information.component.js.map
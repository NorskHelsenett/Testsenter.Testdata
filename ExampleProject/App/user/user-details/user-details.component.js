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
var router_1 = require("@angular/router");
var DataModels_1 = require("../../models/DataModels");
var app_settings_1 = require("../../resources/app-settings");
var user_manager_service_1 = require("../../core/services/user-manager.service");
var UserDetailsComponent = (function () {
    function UserDetailsComponent(userManagerService, router) {
        this.userManagerService = userManagerService;
        this.router = router;
        this.loading = false;
        this.onSuccess = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.projects = app_settings_1.projectNames;
        this.roles = app_settings_1.roleNames;
    }
    UserDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = new DataModels_1.UserData();
        if (!this.isNewUser) {
            if (this.router.url === "/adduserinformation") {
                this.missing = true;
                this.showTestDataForm = true;
            }
            this.loading = true;
            this.userManagerService.getUser().subscribe(function (user) {
                _this.loading = false;
                _this.termsAlreadyAccepted = true;
                user.hasAcceptedTerms = true;
                _this.user = JSON.parse(JSON.stringify(user));
            });
        }
        else {
            this.user.hasAcceptedTerms = false;
            this.showTestDataForm = true;
            this.showPasswordPanel = true;
        }
    };
    UserDetailsComponent.prototype.ngAfterViewInit = function () {
        $('.ui.checkbox')
            .checkbox();
        this.setValidationRules();
    };
    UserDetailsComponent.prototype.termsCheckBoxToggle = function () {
        this.user.hasAcceptedTerms = !this.user.hasAcceptedTerms;
    };
    UserDetailsComponent.prototype.projectChecked = function (value) {
        this.user.projectValue = value;
    };
    UserDetailsComponent.prototype.roleChecked = function (value) {
        this.user.roleValue = value;
    };
    UserDetailsComponent.prototype.showTestData = function () {
        this.showTestDataForm = true;
        this.setValidationRules();
    };
    UserDetailsComponent.prototype.setValidationRules = function () {
        var self = this;
        $('#userForm')
            .form({
            fields: {
                name: {
                    rules: [
                        {
                            type: 'regExp[.{2} .{2}]',
                            prompt: '{name} må inneholde minst to ord på minst 2 bokstaver'
                        }
                    ]
                },
                username: {
                    rules: [
                        {
                            type: 'email',
                            prompt: '{name} må være en gyldig e-post adresse'
                        }
                    ]
                },
                oldpassword: {
                    optional: true,
                    rules: [
                        {
                            type: 'regExp',
                            value: '[A-Z]+',
                            prompt: 'Passord må inneholde minst én stor bokstav'
                        },
                        {
                            type: 'regExp',
                            value: '[a-z]+',
                            prompt: 'Passord må inneholde minst én liten bokstav'
                        },
                        {
                            type: 'regExp',
                            value: '[0-9]+',
                            prompt: 'Passord må inneholde minst ett tall'
                        },
                        {
                            type: 'minLength[8]',
                            prompt: 'Passord må være minst {ruleValue} tegn langt'
                        },
                    ]
                },
                password: {
                    optional: !this.isNewUser,
                    rules: [
                        {
                            type: 'regExp',
                            value: '[A-Z]+',
                            prompt: 'Passord må inneholde minst én stor bokstav'
                        },
                        {
                            type: 'regExp',
                            value: '[a-z]+',
                            prompt: 'Passord må inneholde minst én liten bokstav'
                        },
                        {
                            type: 'regExp',
                            value: '[0-9]+',
                            prompt: 'Passord må inneholde minst ett tall'
                        },
                        {
                            type: 'minLength[8]',
                            prompt: 'Passord må være minst {ruleValue} tegn langt'
                        },
                    ]
                },
                passwordrepeat: {
                    optional: !this.isNewUser,
                    rules: [
                        {
                            type: 'match[password]',
                            depends: 'password',
                            prompt: 'Passord må gjentas likt i feltet under'
                        }
                    ]
                },
                hasAcceptedTerms: {
                    optional: !this.isNewUser,
                    rules: [
                        {
                            type: 'checked',
                            prompt: '"{name}" må være krysset av'
                        }
                    ]
                },
                role: {
                    identifier: "role",
                    rules: [
                        {
                            type: 'checked',
                            prompt: 'Rolle må være valgt'
                        }
                    ]
                },
                project: {
                    identifier: "project",
                    rules: [
                        {
                            type: 'checked',
                            prompt: 'Område må være valgt'
                        }
                    ]
                }
            },
            onSuccess: function () {
                self.submitForm();
                return false; // false is required if you do don't want to let it submit
            },
        });
    };
    UserDetailsComponent.prototype.submitForm = function () {
        this.onSuccess.emit(this.user);
    };
    UserDetailsComponent.prototype.cancel = function () {
        this.onCancel.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UserDetailsComponent.prototype, "isNewUser", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UserDetailsComponent.prototype, "showTestDataForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UserDetailsComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], UserDetailsComponent.prototype, "loading", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UserDetailsComponent.prototype, "errorMessage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], UserDetailsComponent.prototype, "onSuccess", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], UserDetailsComponent.prototype, "onCancel", void 0);
    UserDetailsComponent = __decorate([
        core_1.Component({
            selector: 'user-details',
            moduleId: module.id,
            templateUrl: 'user-details.component.html',
            styleUrls: ['../user.component.css']
        }),
        __metadata("design:paramtypes", [user_manager_service_1.UserManagerService, router_1.Router])
    ], UserDetailsComponent);
    return UserDetailsComponent;
}());
exports.UserDetailsComponent = UserDetailsComponent;
//# sourceMappingURL=user-details.component.js.map
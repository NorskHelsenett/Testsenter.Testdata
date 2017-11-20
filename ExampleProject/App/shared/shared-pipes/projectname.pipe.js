"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_settings_1 = require("../../resources/app-settings");
/**
 * Returnerer prosjektnavn for prosjekt i posisjon @param value i projectNames listen som ligger i /resources/app-settings.ts
 */
var ProjectNamePipe = (function () {
    function ProjectNamePipe() {
    }
    ProjectNamePipe.prototype.transform = function (value) {
        return value < app_settings_1.projectNames.length && value >= 0 ? app_settings_1.projectNames[value] : "Ukjent";
    };
    ProjectNamePipe = __decorate([
        core_1.Pipe({ name: 'projectname' })
    ], ProjectNamePipe);
    return ProjectNamePipe;
}());
exports.ProjectNamePipe = ProjectNamePipe;
//# sourceMappingURL=projectname.pipe.js.map
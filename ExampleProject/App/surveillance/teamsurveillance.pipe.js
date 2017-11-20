"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Tar inn en liste med personer med oppsatt varslinger samt en liste med prosjektmedlemmer. Retunerer de personene som har minst en varsling oppstatt
 * av en av medlemene i listen.
 */
var TeamFilterPipe = (function () {
    function TeamFilterPipe() {
    }
    TeamFilterPipe.prototype.transform = function (value, team) {
        if (value == undefined) {
            return new Array();
        }
        return value.filter(function (f) { return f.latestSurveillanceResults.some(function (res) { return team.indexOf(res.registeredBy) !== -1; }); });
    };
    TeamFilterPipe = __decorate([
        core_1.Pipe({ name: 'teamfilter' })
    ], TeamFilterPipe);
    return TeamFilterPipe;
}());
exports.TeamFilterPipe = TeamFilterPipe;
//# sourceMappingURL=teamsurveillance.pipe.js.map
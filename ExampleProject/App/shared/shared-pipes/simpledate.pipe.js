"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var moment = require("moment/moment");
/**
 * Tar inn et enten et {Date} objekt eller en {String} med gyldig format {@link http://momentjs.com/docs/#/parsing/object/ Moment og returnerer en string med format "DD/MM kl. HH:mm"
 */
var SimpleDatePipe = (function () {
    function SimpleDatePipe() {
    }
    SimpleDatePipe.prototype.transform = function (value) {
        if (!value || value === undefined)
            return "";
        var date = moment(value).format("DD/MM [kl.] HH:mm");
        return date === "Invalid date" ? "" : date;
    };
    SimpleDatePipe = __decorate([
        core_1.Pipe({
            name: 'simpledate'
        })
    ], SimpleDatePipe);
    return SimpleDatePipe;
}());
exports.SimpleDatePipe = SimpleDatePipe;
//# sourceMappingURL=simpledate.pipe.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataModels_1 = require("../../models/DataModels");
var RegisterFilterFullNamePipe = (function () {
    function RegisterFilterFullNamePipe() {
    }
    RegisterFilterFullNamePipe.prototype.transform = function (value) {
        switch (value) {
            case DataModels_1.FilterBelonging.Hpr:
                return "Helsepersonellfilter";
            case DataModels_1.FilterBelonging.Preg:
                return "Personfilter";
            case DataModels_1.FilterBelonging.Flr:
                return "Fastlegefilter";
            case DataModels_1.FilterBelonging.BedReg:
                return "Basis";
            case DataModels_1.FilterBelonging.All:
                return "";
            default:
                return DataModels_1.FilterBelonging[value];
        }
    };
    RegisterFilterFullNamePipe = __decorate([
        core_1.Pipe({ name: 'registerfilterfullname' })
    ], RegisterFilterFullNamePipe);
    return RegisterFilterFullNamePipe;
}());
exports.RegisterFilterFullNamePipe = RegisterFilterFullNamePipe;
//# sourceMappingURL=registerfullname.pipe.js.map
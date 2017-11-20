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
var api_service_1 = require("./api.service");
var Dictonary_1 = require("../../helpers/Dictonary");
var api_routes_1 = require("../../resources/api-routes");
var of_1 = require("rxjs/observable/of");
var CodeManagerService = (function () {
    function CodeManagerService(apiService) {
        var _this = this;
        this.apiService = apiService;
        this.codes = new Dictonary_1.Dictonary();
        this.uncompletedObservables = new Dictonary_1.Dictonary();
        this.getCodeGroup("naringskode").subscribe(function (res) { return _this.codes.add("naringskode", res); });
        this.getCodesAsync(9040).subscribe(function (res) { return _this.codes.add("9040", res); });
    }
    CodeManagerService.prototype.getCode = function (codeValue, oid) {
        if (this.codes.containsKey(oid)) {
            var codes = this.codes.item(oid);
            return codes.find(function (p) { return p.codeValue === codeValue; });
        }
    };
    CodeManagerService.prototype.getCodeNameAsync = function (codeValue, groupName) {
        var _this = this;
        console.log(codeValue, groupName);
        if (!this.codes.containsKey(groupName)) {
            if (!this.uncompletedObservables.containsKey(groupName)) {
                this.uncompletedObservables.add(groupName, this.getCodeGroup(groupName).map(function (res) {
                    _this.codes.add(groupName, res);
                }).share());
            }
            return this.uncompletedObservables.item(groupName).map(function (res) {
                return _this.getCodeName(codeValue, groupName);
            });
        }
        return of_1.of(this.getCodeName(codeValue, groupName));
    };
    CodeManagerService.prototype.getCodeNamesAsync = function (codeValues, groupName) {
        var _this = this;
        if (!this.codes.containsKey(groupName)) {
            if (!this.uncompletedObservables.containsKey(groupName)) {
                this.uncompletedObservables.add(groupName, this.getCodeGroup(groupName).map(function (res) {
                    _this.codes.add(name, res);
                }).share());
            }
            return this.uncompletedObservables.item(groupName).map(function (res) { return codeValues.map(function (val) { return _this.getCodeName(val, groupName); }).join(", "); });
        }
        return of_1.of(codeValues.map(function (val) { return _this.getCodeName(val, groupName); }).join(", "));
    };
    CodeManagerService.prototype.getCodeName = function (codeValue, groupName) {
        var codeList = this.codes.item(groupName);
        var code = codeList.find(function (p) { return p.codeValue === codeValue; });
        return code == undefined ? "" : code.codeText;
    };
    CodeManagerService.prototype.getCodeNameOid = function (codeValue, oid) {
        return this.getCodeName(codeValue, String(oid));
    };
    CodeManagerService.prototype.getCodeNameOidAsync = function (codeValue, oid) {
        var _this = this;
        var oidstring = String(oid);
        if (!this.codes.containsKey(oidstring)) {
            if (!this.uncompletedObservables.containsKey(oidstring)) {
                this.uncompletedObservables.add(oidstring, this.getCodesAsync(oid).map(function (res) {
                    _this.codes.add(oidstring, res);
                }).share());
            }
            return this.uncompletedObservables.item(oidstring).map(function (res) {
                return _this.getCodeName(codeValue, String(oid));
            });
        }
        return of_1.of(this.getCodeName(codeValue, String(oid)));
    };
    CodeManagerService.prototype.getCodesAsync = function (oid) {
        return this.apiService.simpleGetRequest(api_routes_1.apiGetCodesForOid + oid);
    };
    CodeManagerService.prototype.getCodeGroup = function (name) {
        return this.apiService.simpleGetRequest(api_routes_1.apiGetCodeGroupByName + name);
    };
    CodeManagerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], CodeManagerService);
    return CodeManagerService;
}());
exports.CodeManagerService = CodeManagerService;
//# sourceMappingURL=codes-manager.service.js.map
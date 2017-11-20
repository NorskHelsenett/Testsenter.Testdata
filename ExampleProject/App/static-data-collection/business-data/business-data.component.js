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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UtilityModels_1 = require("../../models/UtilityModels");
var formvalidators_1 = require("../../helpers/formvalidators");
var diff_1 = require("ngx-pipes/src/app/pipes/array/diff");
var api_service_1 = require("../../core/services/api.service");
var BusinessDataComponent = (function () {
    function BusinessDataComponent(apiService, diffPipe) {
        this.apiService = apiService;
        this.diffPipe = diffPipe;
        this.stateChange = new core_1.EventEmitter();
        this.errorMessage = "";
    }
    BusinessDataComponent.prototype.valueChange = function (event) {
        this.rawIds = event.target.value;
    };
    BusinessDataComponent.prototype.checkIds = function () {
        this.errorMessage = "";
        if (this.rawIds === "" || this.rawIds === undefined)
            return;
        var ids = this.rawIds.replace(/ /g, "").replace(/(?:\r\n|\r|\n)/g, "").split(",");
        this.validateIds(ids);
    };
    BusinessDataComponent.prototype.validateIds = function (ids) {
        var _this = this;
        ids = ids.filter(function (e, i) { return ids.indexOf(e) === i; });
        var validIds = ids.filter(this.isOrgNumber);
        if (validIds.length === 0) {
            this.errorMessage += "F\u00F8lgende organisasjonsnummer/HER-ider har ugyldig format: " + ids.join(", ") + "\n";
            return;
        }
        this.loading = true;
        this.apiService.simplePostRequest("api/StaticData/Check/Business", validIds).subscribe(function (res) {
            var diff = _this.diffPipe.transform(validIds, res);
            validIds = res;
            validIds.forEach(function (id) { return _this.businesses.push(new UtilityModels_1.StaticBusiness(id, true)); });
            if (diff.length > 0)
                _this.errorMessage += "Vi f\u00E5r ikke treff p\u00E5 f\u00F8lgende organisasjonsnummer/HER-ider i registrene: " + diff.join(", ");
            if (validIds.length > 0)
                _this.stateChange.emit(UtilityModels_1.StaticDataStep.Verified);
            _this.loading = false;
            _this.registers = new Array(validIds.length).fill(false);
        });
    };
    BusinessDataComponent.prototype.isOrgNumber = function (element) {
        return !isNaN(+element);
    };
    BusinessDataComponent.prototype.addRow = function () {
        this.businesses.push(new UtilityModels_1.StaticBusiness("", false));
        this.registers.push(false);
    };
    BusinessDataComponent.prototype.isNumberKey = function (event) {
        return formvalidators_1.isNumberKey(event);
    };
    BusinessDataComponent.prototype.checkArguments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var unchecked, validUnchecked, invalid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.errorMessage = "";
                        this.businesses = this.businesses.filter(function (p, i) { return _this.businesses.findIndex(function (r) { return r.id === p.id; }) === i; });
                        unchecked = this.businesses.filter(function (p, i) { return !p.checked; });
                        validUnchecked = unchecked.filter(function (p) { return _this.isOrgNumber(p.id); });
                        if (!(validUnchecked && validUnchecked.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.apiService.asyncPostRequest("api/StaticData/Check/Business", validUnchecked.map(function (p) { return p.id; })).subscribe(function (res) {
                                res.forEach(function (r) { return _this.businesses.find(function (p) { return p.id === r; }).checked = true; });
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.businesses.filter(function (p) { return !p.checked; }).length > 0) {
                            this.errorMessage = "Vi f\u00E5r ikke treff p\u00E5 f\u00F8lgende organisasjonsnummer/HER-ider i registrene: " + this.businesses.filter(function (p) { return !p.checked; }).map(function (p) { return p.id; }).join(", ") + "\n";
                        }
                        invalid = this.businesses.filter(function (p) { return !p.isValid() && p.checked; }).map(function (p) { return p.id; });
                        if (invalid.length > 0)
                            this.errorMessage = "F\u00F8lgende organisasjonsnummer/HER-ider mangler tilknyttet argumentasjon: " + invalid.join(", ");
                        if (this.businesses.every(function (p) { return p.isValid() && p.checked; })) {
                            this.stateChange.emit(UtilityModels_1.StaticDataStep.Argument);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessDataComponent.prototype.removeBusiness = function (index) {
        this.businesses.splice(index, 1);
        this.registers.splice(index, 1);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BusinessDataComponent.prototype, "stateChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], BusinessDataComponent.prototype, "businesses", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BusinessDataComponent.prototype, "state", void 0);
    BusinessDataComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'business-data',
            styleUrls: ["../static-data.css"],
            templateUrl: 'business-data.component.html',
            providers: [diff_1.DiffPipe]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService, diff_1.DiffPipe])
    ], BusinessDataComponent);
    return BusinessDataComponent;
}());
exports.BusinessDataComponent = BusinessDataComponent;
//# sourceMappingURL=business-data.component.js.map
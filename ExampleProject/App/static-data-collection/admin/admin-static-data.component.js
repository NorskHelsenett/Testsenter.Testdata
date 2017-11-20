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
var order_by_1 = require("ngx-pipes/src/app/pipes/array/order-by");
var api_service_1 = require("../../core/services/api.service");
var platform_browser_1 = require("@angular/platform-browser");
var AdminStaticDataComponent = (function () {
    function AdminStaticDataComponent(apiService, orderBy, sanitizer) {
        this.apiService = apiService;
        this.orderBy = orderBy;
        this.sanitizer = sanitizer;
        this.prows = [];
        this.brows = [];
        this.approveList = [];
    }
    AdminStaticDataComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.simpleGetRequest("api/StaticData/All").subscribe(function (res) {
            _this.registrations = res;
            _this.generateRowData();
            _this.makeLink();
        });
    };
    AdminStaticDataComponent.prototype.makeLink = function () {
        var _this = this;
        this.plink = this.sanitize("data:text/csv;charset=utf-8," +
            encodeURIComponent(this.convert(this.prows.map(function (s) { return _this.cleanvalues(s); }))));
        this.blink = this.sanitize("data:text/csv;charset=utf-8," + encodeURIComponent(this.convert(this.brows.map(function (s) { return _this.cleanvalues(s); }))));
    };
    AdminStaticDataComponent.prototype.sanitize = function (url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    AdminStaticDataComponent.prototype.cleanvalues = function (s) {
        var comment;
        var personcomment;
        var hodorcomment;
        var registers;
        if (s.comment != undefined)
            comment = s.comment.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
        if (s.personcomment != undefined)
            personcomment = s.personcomment.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
        if (s.hodorcomment != undefined)
            hodorcomment = s.hodorcomment.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
        if (s.registers != undefined)
            registers = s.registers.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
        return {
            "index": s.index,
            "business": s.business,
            "name": s.name,
            "email": s.email,
            "comment": comment,
            "date": s.date,
            "id": s.id,
            "buypass": s.buypass,
            "commfides": s.commfides,
            "personcomment": personcomment,
            "approved": s.approved,
            "hodorcomment": hodorcomment,
            "registers": registers
        };
    };
    AdminStaticDataComponent.prototype.convert = function (data) {
        console.log(data);
        var tabText = '';
        var keys = Object.keys(data[0]);
        var headers = keys;
        headers.forEach(function (h) {
            tabText += '"' + h + '",';
        });
        if (tabText.length > 0) {
            tabText = tabText.slice(0, -1);
            tabText += '\r\n';
        }
        data.forEach(function (d) {
            keys.forEach(function (k) {
                if (d.hasOwnProperty(k) && d[k] != null) {
                    tabText += '"' + d[k] + '",';
                }
                else {
                    tabText += '"",';
                }
            });
            tabText = tabText.slice(0, -1);
            tabText += '\r\n';
        });
        return tabText;
    };
    AdminStaticDataComponent.prototype.generateRowData = function () {
        var _this = this;
        if (this.registrations === null)
            return;
        this.prows = [];
        var i = 0;
        this.registrations.forEach(function (reg) {
            i++;
            if (reg.staticPersons)
                reg.staticPersons.forEach(function (person) {
                    _this.prows.push({
                        "index": i,
                        "business": reg.contactInformation.business,
                        "name": reg.contactInformation.firstName +
                            " " +
                            reg.contactInformation.lastName,
                        "email": reg.contactInformation.email,
                        "comment": reg.contactInformation.comments,
                        "date": reg.date,
                        "id": person.id,
                        "buypass": person.buypass,
                        "commfides": person.commfides,
                        "personcomment": person.comment,
                        "approved": person.approved,
                        "key": reg.key,
                        "hodorcomment": person.hodorComment,
                        "registers": person.registers
                    });
                });
            if (reg.staticBusinesses)
                reg.staticBusinesses.forEach(function (person) {
                    _this.brows.push({
                        "index": i,
                        "business": reg.contactInformation.business,
                        "name": reg.contactInformation.firstName +
                            " " +
                            reg.contactInformation.lastName,
                        "email": reg.contactInformation.email,
                        "comment": reg.contactInformation.comments,
                        "date": reg.date,
                        "id": person.id,
                        "personcomment": person.comment,
                        "approved": person.approved,
                        "key": reg.key,
                        "hodorcomment": person.hodorComment,
                        "registers": person.registers
                    });
                });
        });
    };
    AdminStaticDataComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-static-data',
            templateUrl: 'admin-static-data.component.html',
            providers: [order_by_1.OrderByPipe]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService, order_by_1.OrderByPipe, platform_browser_1.DomSanitizer])
    ], AdminStaticDataComponent);
    return AdminStaticDataComponent;
}());
exports.AdminStaticDataComponent = AdminStaticDataComponent;
//# sourceMappingURL=admin-static-data.component.js.map
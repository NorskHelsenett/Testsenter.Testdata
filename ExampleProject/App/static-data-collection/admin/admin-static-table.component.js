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
var AdminStaticTableComponent = (function () {
    function AdminStaticTableComponent(apiService, orderBy) {
        this.apiService = apiService;
        this.orderBy = orderBy;
        this.approveList = [];
    }
    Object.defineProperty(AdminStaticTableComponent.prototype, "typeUrl", {
        get: function () { return this.isPerson ? "person" : "business"; },
        enumerable: true,
        configurable: true
    });
    AdminStaticTableComponent.prototype.sort = function (prop) {
        var _this = this;
        this.lastSelectedIndex = -1;
        this.sortdir = !this.sortdir;
        this.sortProp = prop;
        if (this.sortProp === "hodorcomment" || this.sortProp === "personcomment") {
            this.rows = this.rows.sort(function (a, b) {
                var p1;
                var p2;
                if (_this.sortProp === "hodorcomment") {
                    p1 = a.hodorcomment;
                    p2 = b.hodorcomment;
                }
                else if (_this.sortProp === "registers") {
                    p1 = a.registers;
                    p2 = b.registers;
                }
                else {
                    p1 = a.personcomment;
                    p2 = b.personcomment;
                }
                if (p1 == undefined && p2 == undefined)
                    return 0;
                if (p1 == undefined)
                    return 1;
                if (p2 == undefined)
                    return -1;
                return p1.toLowerCase().localeCompare(p2.toLowerCase());
            });
            if (this.sortdir)
                this.rows.reverse();
        }
        if (this.sortProp === "date") {
            this.rows.sort(function (a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            if (this.sortdir)
                this.rows.reverse();
        }
        else
            this.rows = this.orderBy.transform(this.rows, ((this.sortdir ? '' : '-') + this.sortProp));
    };
    AdminStaticTableComponent.prototype.isSelected = function (key, id) {
        return this.approveList.findIndex(function (p) { return p.key === key && p.id === id; }) > -1;
    };
    AdminStaticTableComponent.prototype.addToList = function (key, id, event, index) {
        var _this = this;
        if (event.ctrlKey && this.lastSelectedIndex > -1 && this.lastSelectedIndex !== index) {
            var start = this.lastSelectedIndex < index ? this.lastSelectedIndex : index;
            var stop_1 = this.lastSelectedIndex > index ? this.lastSelectedIndex : index;
            this.rows.slice(start, stop_1 + 1).forEach(function (row) {
                if (!_this.isSelected(row.key, row.id))
                    _this.approveList.push({ "key": row.key, "id": row.id });
            });
        }
        else {
            this.isSelected(key, id)
                ? this.approveList.splice(this.approveList.findIndex(function (p) { return p.key === key && p.id === id; }), 1)
                : this.approveList.push({ "key": key, "id": id });
        }
        this.lastSelectedIndex = index;
    };
    AdminStaticTableComponent.prototype.approve = function () {
        var _this = this;
        this.loading = true;
        this.apiService.simplePostRequest("api/StaticData/Approve/" + this.typeUrl, this.approveList).subscribe(function (res) {
            _this.loading = false;
            if (!res)
                return;
            _this.approveList.forEach(function (a) { return _this.rows.find(function (p) { return p.key === a.key && p.id === a.id; }).approved = !_this.rows.find(function (p) { return p.key === a.key && p.id === a.id; }).approved; });
            _this.approveList = [];
        });
    };
    AdminStaticTableComponent.prototype.saveComment = function (person) {
        var _this = this;
        this.saving = true;
        this.apiService.simplePostRequest("api/StaticData/Comment/" + this.typeUrl, { "partition": person.business, "key": person.key, "id": person.id, "comment": person.hodorcomment }).subscribe(function (res) {
            _this.saving = false;
            if (!res)
                return;
            _this.activeComment = -1;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AdminStaticTableComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AdminStaticTableComponent.prototype, "isPerson", void 0);
    AdminStaticTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-static-table',
            templateUrl: 'admin-static-table.component.html',
            providers: [order_by_1.OrderByPipe]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService, order_by_1.OrderByPipe])
    ], AdminStaticTableComponent);
    return AdminStaticTableComponent;
}());
exports.AdminStaticTableComponent = AdminStaticTableComponent;
//# sourceMappingURL=admin-static-table.component.js.map
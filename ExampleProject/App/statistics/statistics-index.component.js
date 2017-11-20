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
var ng2_file_upload_1 = require("ng2-file-upload");
var api_service_1 = require("../core/services/api.service");
var StatisticsIndexComponent = (function () {
    function StatisticsIndexComponent(apiService) {
        this.apiService = apiService;
        this.selectedBlob = null;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: "api/Statistics/Upload" });
    }
    StatisticsIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.simpleGetRequest("api/Statistics/All").subscribe(function (res) {
            _this.blobs = res;
        });
    };
    StatisticsIndexComponent.prototype.getFile = function () {
        var _this = this;
        console.log("Blob", this.selectedBlob);
        if (this.selectedBlob == null || this.selectedBlob == undefined)
            return;
        this.loading = true;
        this.apiService.simpleGetRequest("api/Statistics/Get/".concat(this.selectedBlob)).subscribe(function (res) {
            console.log(res);
            _this.stats = JSON.parse(res);
            _this.loading = false;
        });
    };
    StatisticsIndexComponent.prototype.setFile = function (event) {
        this.loading = true;
        this.uploader.uploadAll();
        this.loading = false;
    };
    StatisticsIndexComponent.prototype.ngAfterViewInit = function () {
        $('.menu .item').tab();
    };
    StatisticsIndexComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "statistics-index",
            templateUrl: "statistics-index.component.html",
            styleUrls: ["statistics.css"]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], StatisticsIndexComponent);
    return StatisticsIndexComponent;
}());
exports.StatisticsIndexComponent = StatisticsIndexComponent;
//# sourceMappingURL=statistics-index.component.js.map
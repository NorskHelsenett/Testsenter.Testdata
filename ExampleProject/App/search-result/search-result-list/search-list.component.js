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
var UtilityModels_1 = require("../../models/UtilityModels");
var data_manager_service_1 = require("../../core/services/data-manager.service");
var search_manager_service_1 = require("../../core/services/search-manager.service");
var mediator_service_1 = require("../../core/services/mediator.service");
var SearchListComponent = (function () {
    function SearchListComponent(dataManagerService, searchManager, mediator) {
        this.dataManagerService = dataManagerService;
        this.searchManager = searchManager;
        this.mediator = mediator;
        this.isEmpty = true;
        this.totalPages = 0;
        this.currentIndex = UtilityModels_1.HodorIndexes.Person;
        this.Indexes = UtilityModels_1.HodorIndexes;
    }
    SearchListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mediator.indexSwitch$.subscribe(function (switchTo) { return _this.currentIndex = switchTo; });
        this.dataManagerService.searchResults$.subscribe(function (result) {
            _this.items = result.documents;
            _this.searchParameters = result.searchParameters;
            _this.isEmpty = (result.documents == undefined || result.documents.length === 0);
            if (_this.isEmpty) {
                _this.totalPages = 0;
                return;
            }
            _this.totalPages = Math.floor(_this.searchParameters.totalCount / _this.searchParameters.numberPerPage) - 1;
            if (_this.totalPages * _this.searchParameters.numberPerPage > 100000)
                _this.totalPages = (100000 / _this.searchParameters.numberPerPage) - 1;
            $('.ui.accordion').accordion('refresh');
        });
    };
    SearchListComponent.prototype.changePage = function (page) {
        this.searchManager.performeSearch(undefined, page);
    };
    SearchListComponent.prototype.getPageArray = function () {
        var pages = [];
        var addStart, addEnd;
        var startPage, endPage;
        var currentPage = this.searchParameters.page;
        if (this.totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 0;
            endPage = this.totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 5) {
                startPage = 0;
                endPage = 9;
                addEnd = true;
            }
            else if (currentPage + 4 >= this.totalPages) {
                startPage = this.totalPages - 9;
                endPage = this.totalPages;
                addStart = true;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
                addEnd = true;
                addStart = true;
            }
        }
        // create an array of pages to ng-repeat in the pager control
        for (var pageNr = startPage; pageNr <= endPage; pageNr++) {
            pages.push(pageNr);
        }
        if (addStart)
            pages[0] = 0;
        if (addEnd)
            pages[pages.length - 1] = this.totalPages;
        return pages;
    };
    SearchListComponent = __decorate([
        core_1.Component({
            selector: "search-list",
            moduleId: module.id,
            templateUrl: "search-list.component.html",
            styleUrls: ["search-list.component.css"]
        }),
        __metadata("design:paramtypes", [data_manager_service_1.DataManagerService, search_manager_service_1.SearchManagerService, mediator_service_1.MediatorService])
    ], SearchListComponent);
    return SearchListComponent;
}());
exports.SearchListComponent = SearchListComponent;
//# sourceMappingURL=search-list.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UtilityModels_1 = require("../models/UtilityModels");
var SearchParser = (function () {
    function SearchParser(term) {
        this._term = term;
        this.type = this.getSearchType(term);
    }
    Object.defineProperty(SearchParser.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (searchTerm) {
            this._term = searchTerm;
            this.type = this.getSearchType(searchTerm);
        },
        enumerable: true,
        configurable: true
    });
    SearchParser.prototype.getSearchType = function (term) {
        if (term === "" || term === undefined)
            return UtilityModels_1.SearchType.Empty;
        if (isNaN(+term))
            return UtilityModels_1.SearchType.Name;
        if (term.length >= 7 && term.length <= 9)
            return UtilityModels_1.SearchType.Number;
        if (term.length === 11)
            return UtilityModels_1.SearchType.NIN;
        return UtilityModels_1.SearchType.Query;
    };
    return SearchParser;
}());
exports.SearchParser = SearchParser;
//# sourceMappingURL=searchParser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UtilityModels_1 = require("./UtilityModels");
//Surveillance
var SurveillanceResult = (function () {
    function SurveillanceResult() {
    }
    return SurveillanceResult;
}());
exports.SurveillanceResult = SurveillanceResult;
var SurveilledItem = (function () {
    function SurveilledItem() {
    }
    return SurveilledItem;
}());
exports.SurveilledItem = SurveilledItem;
var Surveillance = (function () {
    function Surveillance() {
    }
    return Surveillance;
}());
exports.Surveillance = Surveillance;
//Filters
var FilterGroup = (function () {
    function FilterGroup() {
    }
    return FilterGroup;
}());
exports.FilterGroup = FilterGroup;
var FilterItem = (function () {
    function FilterItem() {
    }
    return FilterItem;
}());
exports.FilterItem = FilterItem;
var FilterBelonging;
(function (FilterBelonging) {
    FilterBelonging[FilterBelonging["Hpr"] = 1] = "Hpr";
    FilterBelonging[FilterBelonging["Preg"] = 2] = "Preg";
    FilterBelonging[FilterBelonging["All"] = 3] = "All";
    FilterBelonging[FilterBelonging["Flr"] = 4] = "Flr";
    FilterBelonging[FilterBelonging["Difi"] = 5] = "Difi";
    FilterBelonging[FilterBelonging["Ar"] = 7] = "Ar";
    FilterBelonging[FilterBelonging["BedReg"] = 6] = "BedReg";
    FilterBelonging[FilterBelonging["Htk"] = 8] = "Htk";
    FilterBelonging[FilterBelonging["Resh"] = 9] = "Resh";
})(FilterBelonging = exports.FilterBelonging || (exports.FilterBelonging = {}));
//Index
var RegisterPerson = (function () {
    function RegisterPerson() {
        this.latestSurveillanceResults = [];
        this.status = UtilityModels_1.SurveillanceStatus.Synced;
    }
    return RegisterPerson;
}());
exports.RegisterPerson = RegisterPerson;
var RegisterBusiness = (function () {
    function RegisterBusiness() {
    }
    return RegisterBusiness;
}());
exports.RegisterBusiness = RegisterBusiness;
var UserData = (function () {
    function UserData(username, password) {
        if (username === void 0) { username = ""; }
        if (password === void 0) { password = ""; }
        this.username = username;
        this.password = password;
    }
    return UserData;
}());
exports.UserData = UserData;
var LoginSubmission = (function () {
    function LoginSubmission() {
    }
    return LoginSubmission;
}());
exports.LoginSubmission = LoginSubmission;
var Tag = (function () {
    function Tag() {
    }
    return Tag;
}());
exports.Tag = Tag;
var PersonDetails = (function () {
    function PersonDetails() {
    }
    return PersonDetails;
}());
exports.PersonDetails = PersonDetails;
var BusinessDetails = (function () {
    function BusinessDetails() {
    }
    return BusinessDetails;
}());
exports.BusinessDetails = BusinessDetails;
var Comment = (function () {
    function Comment() {
    }
    return Comment;
}());
exports.Comment = Comment;
var SearchQuery = (function () {
    function SearchQuery() {
    }
    return SearchQuery;
}());
exports.SearchQuery = SearchQuery;
var HodorSearchParameters = (function () {
    function HodorSearchParameters() {
    }
    return HodorSearchParameters;
}());
exports.HodorSearchParameters = HodorSearchParameters;
var SearchResult = (function () {
    function SearchResult() {
    }
    return SearchResult;
}());
exports.SearchResult = SearchResult;
var Search = (function () {
    function Search() {
    }
    return Search;
}());
exports.Search = Search;
var SynteticModel = (function () {
    function SynteticModel() {
    }
    return SynteticModel;
}());
exports.SynteticModel = SynteticModel;
var PersonStatistics = (function () {
    function PersonStatistics() {
    }
    return PersonStatistics;
}());
exports.PersonStatistics = PersonStatistics;
var CorrelationMatrix = (function () {
    function CorrelationMatrix() {
    }
    return CorrelationMatrix;
}());
exports.CorrelationMatrix = CorrelationMatrix;
var MatrixElement = (function () {
    function MatrixElement() {
    }
    return MatrixElement;
}());
exports.MatrixElement = MatrixElement;
//Difi 
var DifiJson = (function () {
    function DifiJson() {
    }
    return DifiJson;
}());
exports.DifiJson = DifiJson;
var KontaktInformasjon = (function () {
    function KontaktInformasjon() {
    }
    return KontaktInformasjon;
}());
exports.KontaktInformasjon = KontaktInformasjon;
var Mobiltelefonnummer = (function () {
    function Mobiltelefonnummer() {
    }
    return Mobiltelefonnummer;
}());
exports.Mobiltelefonnummer = Mobiltelefonnummer;
var EpostAdresse = (function () {
    function EpostAdresse() {
    }
    return EpostAdresse;
}());
exports.EpostAdresse = EpostAdresse;
var DigitalPostAdresse = (function () {
    function DigitalPostAdresse() {
    }
    return DigitalPostAdresse;
}());
exports.DigitalPostAdresse = DigitalPostAdresse;
// Statestikk
var StatisticsComparison = (function () {
    function StatisticsComparison() {
    }
    return StatisticsComparison;
}());
exports.StatisticsComparison = StatisticsComparison;
//# sourceMappingURL=DataModels.js.map
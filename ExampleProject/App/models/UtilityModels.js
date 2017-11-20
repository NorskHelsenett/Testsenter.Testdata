"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurveillanceStatus;
(function (SurveillanceStatus) {
    SurveillanceStatus[SurveillanceStatus["Synced"] = 1] = "Synced";
    SurveillanceStatus[SurveillanceStatus["Unsynced"] = 2] = "Unsynced";
    SurveillanceStatus[SurveillanceStatus["Unknown"] = 3] = "Unknown";
})(SurveillanceStatus = exports.SurveillanceStatus || (exports.SurveillanceStatus = {}));
var OwnedBy;
(function (OwnedBy) {
    OwnedBy[OwnedBy["Me"] = 1] = "Me";
    OwnedBy[OwnedBy["Project"] = 2] = "Project";
    OwnedBy[OwnedBy["All"] = 3] = "All";
})(OwnedBy = exports.OwnedBy || (exports.OwnedBy = {}));
var ChildViews;
(function (ChildViews) {
    ChildViews[ChildViews["Search"] = 0] = "Search";
    ChildViews[ChildViews["Surveillance"] = 1] = "Surveillance";
    ChildViews[ChildViews["Dashboard"] = 2] = "Dashboard";
    ChildViews[ChildViews["Json"] = 3] = "Json";
    ChildViews[ChildViews["Diff"] = 4] = "Diff";
    ChildViews[ChildViews["None"] = 5] = "None";
    ChildViews[ChildViews["Family"] = 6] = "Family";
})(ChildViews = exports.ChildViews || (exports.ChildViews = {}));
var SearchType;
(function (SearchType) {
    SearchType[SearchType["NIN"] = 1] = "NIN";
    SearchType[SearchType["Number"] = 2] = "Number";
    SearchType[SearchType["Name"] = 3] = "Name";
    SearchType[SearchType["Empty"] = 4] = "Empty";
    SearchType[SearchType["Query"] = 5] = "Query";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
var StaticDataStep;
(function (StaticDataStep) {
    StaticDataStep[StaticDataStep["AddedData"] = 0] = "AddedData";
    StaticDataStep[StaticDataStep["Verified"] = 1] = "Verified";
    StaticDataStep[StaticDataStep["Argument"] = 2] = "Argument";
    StaticDataStep[StaticDataStep["ContactInformation"] = 3] = "ContactInformation";
    StaticDataStep[StaticDataStep["Register"] = 4] = "Register";
    StaticDataStep[StaticDataStep["Failed"] = 5] = "Failed";
})(StaticDataStep = exports.StaticDataStep || (exports.StaticDataStep = {}));
var Environment;
(function (Environment) {
    Environment[Environment["Utvikling"] = 0] = "Utvikling";
    Environment[Environment["Test01"] = 1] = "Test01";
    Environment[Environment["AT"] = 2] = "AT";
})(Environment = exports.Environment || (exports.Environment = {}));
var HodorIndexes;
(function (HodorIndexes) {
    HodorIndexes[HodorIndexes["Person"] = 1] = "Person";
    HodorIndexes[HodorIndexes["Business"] = 2] = "Business";
    HodorIndexes[HodorIndexes["Ugyldig"] = 1000] = "Ugyldig";
})(HodorIndexes = exports.HodorIndexes || (exports.HodorIndexes = {}));
exports.DifiStatus = ["Aktiv", "Slettet", "Ikke aktiv"];
exports.DifiVarsel = ["Nei", "Ja"];
var Code = (function () {
    function Code() {
    }
    return Code;
}());
exports.Code = Code;
var HitInformation = (function () {
    function HitInformation() {
    }
    return HitInformation;
}());
exports.HitInformation = HitInformation;
var Detail = (function () {
    function Detail() {
    }
    return Detail;
}());
exports.Detail = Detail;
var SurveillanceItemInformation = (function () {
    function SurveillanceItemInformation() {
    }
    return SurveillanceItemInformation;
}());
exports.SurveillanceItemInformation = SurveillanceItemInformation;
var SurveillanceInformation = (function () {
    function SurveillanceInformation() {
    }
    return SurveillanceInformation;
}());
exports.SurveillanceInformation = SurveillanceInformation;
var ErrorMessage = (function () {
    function ErrorMessage(message) {
        this.message = message;
    }
    return ErrorMessage;
}());
exports.ErrorMessage = ErrorMessage;
var StaticPerson = (function () {
    function StaticPerson(id, checked) {
        this.id = id;
        this.checked = checked;
    }
    StaticPerson.prototype.isValid = function () {
        return this.buypass || this.commfides || (this.comment != null && this.comment.length > 0);
    };
    return StaticPerson;
}());
exports.StaticPerson = StaticPerson;
var StaticBusiness = (function () {
    function StaticBusiness(id, checked) {
        this.id = id;
        this.checked = checked;
    }
    StaticBusiness.prototype.isValid = function () {
        return (this.comment != null && this.comment.length > 0);
    };
    return StaticBusiness;
}());
exports.StaticBusiness = StaticBusiness;
var ContactInformation = (function () {
    function ContactInformation() {
    }
    return ContactInformation;
}());
exports.ContactInformation = ContactInformation;
var StaticDataRegistration = (function () {
    function StaticDataRegistration() {
    }
    return StaticDataRegistration;
}());
exports.StaticDataRegistration = StaticDataRegistration;
//# sourceMappingURL=UtilityModels.js.map
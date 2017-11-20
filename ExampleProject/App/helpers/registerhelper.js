"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_settings_1 = require("../resources/app-settings");
var UtilityModels_1 = require("../models/UtilityModels");
function getFullRegisterName(name) {
    switch (name.toLowerCase()) {
        case "childItems":
            return "Personregisteret";
        case "hpr":
            return "Helsepersonellregisteret";
        case "flr":
            return "Fastlegeregisteret";
        default:
            return name;
    }
}
exports.getFullRegisterName = getFullRegisterName;
//Ikke optimalt;
function setStarStatus(team, person) {
    team.subscribe(function (res) {
        if (person.teams.length === 0)
            person.starState = 1;
        else {
            if (person.teams.some(function (t) { return t === String(res); })) {
                person.starState = person.teams.length === 1 ? 2 : 4;
            }
            else
                person.starState = 3;
        }
    });
}
exports.setStarStatus = setStarStatus;
function getSurveillanceColor(status) {
    if (status === UtilityModels_1.SurveillanceStatus.Unsynced)
        return app_settings_1.colorUnsynced;
    else if (status === UtilityModels_1.SurveillanceStatus.Synced)
        return app_settings_1.colorSynced;
    return app_settings_1.colorUndefined;
}
exports.getSurveillanceColor = getSurveillanceColor;
function getSurveillanceStatus(surveillance) {
    if (surveillance.isChecked) {
        if (surveillance.latestSurveillanceResultForMyTeam === null) {
            return UtilityModels_1.SurveillanceStatus.Unknown;
        }
        if (surveillance.latestSurveillanceResultForMyTeam.success)
            return UtilityModels_1.SurveillanceStatus.Synced;
        return surveillance.latestSurveillanceResultForMyTeam.errorText.indexOf("Fant ikke person") === -1 ?
            UtilityModels_1.SurveillanceStatus.Unsynced
            : UtilityModels_1.SurveillanceStatus.Unknown;
    }
    return UtilityModels_1.SurveillanceStatus.Unknown;
}
exports.getSurveillanceStatus = getSurveillanceStatus;
function getSurveillanceResult(res) {
    if (res.success === null)
        return UtilityModels_1.SurveillanceStatus.Unknown;
    if (res.success)
        return UtilityModels_1.SurveillanceStatus.Synced;
    //Ikke optimalt
    return res.errorText.indexOf("Fant ikke person") === -1 ?
        UtilityModels_1.SurveillanceStatus.Unsynced
        : UtilityModels_1.SurveillanceStatus.Unknown;
}
exports.getSurveillanceResult = getSurveillanceResult;
function getPersonColor(status) {
    if (status === UtilityModels_1.SurveillanceStatus.Unsynced)
        return "redleftborder";
    return status === UtilityModels_1.SurveillanceStatus.Synced ? "tealleftborder" : "";
}
exports.getPersonColor = getPersonColor;
function getPersonStatus(person) {
    if (person.surveillances.some(function (sur) { return sur.surveillanceState === UtilityModels_1.SurveillanceStatus.Unsynced; }))
        return UtilityModels_1.SurveillanceStatus.Unsynced;
    if (person.surveillances.some(function (sur) { return sur.surveillanceState === UtilityModels_1.SurveillanceStatus.Synced; }))
        return UtilityModels_1.SurveillanceStatus.Synced;
    return UtilityModels_1.SurveillanceStatus.Unknown;
}
exports.getPersonStatus = getPersonStatus;
function getGPname(gp) {
    return gp.FirstName + (gp.MiddleName == undefined ? "" : " " + gp.MiddleName) + " " + gp.LastName;
}
exports.getGPname = getGPname;
//# sourceMappingURL=registerhelper.js.map
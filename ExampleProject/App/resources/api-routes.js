"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UtilityModels_1 = require("../models/UtilityModels");
exports.apiProjectSurveillance = "api/Surveillance/All";
exports.apiNextCheck = "api/Surveillance/Next";
exports.apiPreviousCheck = "api/Surveillance/Previous";
exports.apiIndexedProjectSurveillance = "api/Search/ProjectSurveillances/";
// Search
function apiGetFilters(index) { return "api/Filter/" + UtilityModels_1.HodorIndexes[index]; }
exports.apiGetFilters = apiGetFilters;
function apiPersonSearch(environment) { return "api/" + environment + "/PersonSearch/"; }
exports.apiPersonSearch = apiPersonSearch;
function apiBusinessSearch(environment) { return "api/" + environment + "/BusinessSearch/"; }
exports.apiBusinessSearch = apiBusinessSearch;
exports.apiSavedSearches = "api/Filter/Saved";
// User
exports.apiLogIn = "api/User/Login";
exports.apiLogOut = "api/User/Logout";
exports.apiGetUser = "api/User/GetUser";
exports.apiIsLoggedIn = "api/User/IsLoggedIn";
exports.apiUpdateRegisterUser = "api/User/UpdateRegisterUser";
exports.apiHasValidRegisterUser = "api/user/HasValidRegisterUser";
exports.apiCheckRegisterUser = "api/User/CheckRegisterUser";
exports.apiCreateUser = "api/User/CreateUser";
exports.apiUpdateUser = "api/User/UpdateUserDetails";
exports.apiUpdatePassword = "api/User/UpdatePassword";
exports.apiGenerateNewPassword = "api/User/GenerateNewPassword/";
exports.apiValidUserInformation = "api/User/ValidUserInformation";
// Paths
exports.login = "/login/";
exports.user = "/createuser/";
exports.main = "";
exports.registerUser = "/registeruser";
// Misc
exports.apiPersonDetail = "api/test01/Details/Person";
exports.apiBusinessDetail = "api/test01/Details/Business";
exports.apiGetFamily = "api/Search/Family?nin=";
exports.apiGetCodesForOid = "api/Search/GetCodesForOid?oid=";
exports.apiGetCodeGroupByName = "api/Search/GetCodeGroupByName?name=";
exports.apiGetTags = "api/Tag/all";
exports.apiUpdateTag = "api/Tag";
exports.apiDeleteTag = "api/Tag/Delete";
exports.apiComments = "api/Details/Comment";
exports.apiLastestSync = "api/Surveillance/synchronized/";
exports.apiStatistics = "api/Statistics";
//# sourceMappingURL=api-routes.js.map
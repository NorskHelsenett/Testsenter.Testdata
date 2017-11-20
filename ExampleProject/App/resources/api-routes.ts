import {HodorIndexes} from "../models/UtilityModels";

export const apiProjectSurveillance = "api/Surveillance/All";
export const apiNextCheck = "api/Surveillance/Next";
export const apiPreviousCheck = "api/Surveillance/Previous";
export const apiIndexedProjectSurveillance = "api/Search/ProjectSurveillances/";

// Search
export function apiGetFilters(index: HodorIndexes) { return `api/Filter/${HodorIndexes[index]}`; }
export function apiPersonSearch(environment: string) { return `api/${environment}/PersonSearch/`; }
export function apiBusinessSearch(environment: string) { return `api/${environment}/BusinessSearch/`; }
export const apiSavedSearches = "api/Filter/Saved";

// User
export const apiLogIn = "api/User/Login";
export const apiLogOut = "api/User/Logout";
export const apiGetUser = "api/User/GetUser";
export const apiIsLoggedIn = "api/User/IsLoggedIn";
export const apiUpdateRegisterUser = "api/User/UpdateRegisterUser";
export const apiHasValidRegisterUser = "api/user/HasValidRegisterUser";
export const apiCheckRegisterUser = "api/User/CheckRegisterUser";
export const apiCreateUser = "api/User/CreateUser";
export const apiUpdateUser = "api/User/UpdateUserDetails";
export const apiUpdatePassword = "api/User/UpdatePassword";
export const apiGenerateNewPassword = "api/User/GenerateNewPassword/";
export const apiValidUserInformation = "api/User/ValidUserInformation";
// Paths
export const login = "/login/";
export const user = "/createuser/";
export const main = "";
export const registerUser = "/registeruser";

// Misc
export const apiPersonDetail = "api/test01/Details/Person";
export const apiBusinessDetail = "api/test01/Details/Business";
export const apiGetFamily = "api/Search/Family?nin=";
export const apiGetCodesForOid = "api/Search/GetCodesForOid?oid=";
export const apiGetCodeGroupByName = "api/Search/GetCodeGroupByName?name=";
export const apiGetTags = "api/Tag/all";
export const apiUpdateTag = "api/Tag";
export const apiDeleteTag = "api/Tag/Delete";
export const apiComments = "api/Details/Comment";
export const apiLastestSync = "api/Surveillance/synchronized/";
export const apiStatistics = "api/Statistics";
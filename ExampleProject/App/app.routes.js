"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authguard_1 = require("./routing/authguard");
var create_user_component_1 = require("./user/create-user/create-user.component");
var invalid_register_user_component_1 = require("./user/invalid-register-user/invalid-register-user.component");
var update_user_component_1 = require("./user/update-user/update-user.component");
var forgotten_password_component_1 = require("./user/forgotten-password/forgotten-password.component");
var create_user_success_component_1 = require("./user/create-user/create-user-success.component");
var statistics_index_component_1 = require("./statistics/statistics-index.component");
var statistics_compare_component_1 = require("./statistics/compare/statistics-compare.component");
var static_data_shared_component_1 = require("./static-data-collection/shared/static-data-shared.component");
var admin_static_data_component_1 = require("./static-data-collection/admin/admin-static-data.component");
var login_component_1 = require("./user/login/login.component");
var index_component_1 = require("./index/index.component");
exports.APP_ROUTES = [
    { path: "", component: index_component_1.IndexComponent, canActivate: [authguard_1.LoggedInGuard, authguard_1.RegisterGuard, authguard_1.ValidInformationGuard] },
    { path: "changeuser", component: update_user_component_1.UpdateUserComponent, canActivate: [authguard_1.LoggedInGuard, authguard_1.RegisterGuard] },
    { path: "createuser", component: create_user_component_1.CreateUserComponent },
    { path: "createusersuccess", component: create_user_success_component_1.CreateUserSuccessComponent },
    { path: "adduserinformation", component: update_user_component_1.UpdateUserComponent, canActivate: [authguard_1.LoggedInGuard] },
    { path: "Login/ActivateMe", redirectTo: "", pathMatch: "prefix" },
    { path: "login/:state", component: login_component_1.LoginComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "forgottenpassword", component: forgotten_password_component_1.ForgottenPasswordComponent },
    { path: "invalidregisteruser", component: invalid_register_user_component_1.InvalidRegisterUserComponent, canActivate: [authguard_1.LoggedInGuard, authguard_1.ChangeRegisterUserGuard] },
    { path: "statistics", component: statistics_index_component_1.StatisticsIndexComponent },
    { path: "compare", component: statistics_compare_component_1.StatisticsCompareComponent },
    { path: "static-data", component: static_data_shared_component_1.StaticDataSharedComponent },
    { path: "static-data-admin", component: admin_static_data_component_1.AdminStaticDataComponent, canActivate: [authguard_1.LoggedInGuard] },
    { path: "**", redirectTo: "" }
];
exports.AppRoutingProviders = [
    authguard_1.LoggedInGuard, authguard_1.RegisterGuard, authguard_1.ChangeRegisterUserGuard, authguard_1.ValidInformationGuard
];
//# sourceMappingURL=app.routes.js.map
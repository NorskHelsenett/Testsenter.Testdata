"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var static_data_shared_component_1 = require("./shared/static-data-shared.component");
var routes = [
    { path: '', component: static_data_shared_component_1.StaticDataSharedComponent },
    { path: "**", redirectTo: "" }
];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=static-data-collection.routing.js.map
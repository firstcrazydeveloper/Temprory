"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var login_component_1 = require("./components/login/login.component");
var appRoutes = [
    { path: '', component: login_component_1.LoginComponent }
];
exports.AppRounting = router_1.RouterModule.forRoot(appRoutes, { useHash: false });
//# sourceMappingURL=app.routing.js.map
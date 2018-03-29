"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var role_detail_component_1 = require("./role-detail/role-detail.component");
var manage_role_component_1 = require("./manage-role/manage-role.component");
var router_1 = require("@angular/router");
var routes = [
    { path: '', component: manage_role_component_1.ManageRoleComponent },
    { path: 'add-role', component: role_detail_component_1.RoleDetailComponent, pathMatch: 'full' },
    { path: 'role-detail/:id/:action', component: role_detail_component_1.RoleDetailComponent, pathMatch: 'full' }
];
var RoleRouting = /** @class */ (function () {
    function RoleRouting() {
    }
    RoleRouting = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes)
            ],
            declarations: [],
            exports: [router_1.RouterModule]
        })
    ], RoleRouting);
    return RoleRouting;
}());
exports.RoleRouting = RoleRouting;
//# sourceMappingURL=role.routing.js.map
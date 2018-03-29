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
var role_routing_1 = require("./role.routing");
var role_service_1 = require("./role.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../../../shared/shared.module");
var RoleModule = /** @class */ (function () {
    function RoleModule() {
    }
    RoleModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                role_routing_1.RoleRouting,
                router_1.RouterModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule
            ],
            declarations: [role_detail_component_1.RoleDetailComponent, manage_role_component_1.ManageRoleComponent],
            entryComponents: [
                manage_role_component_1.ManageRoleComponent
            ],
            providers: [
                role_service_1.RoleService
            ]
        })
    ], RoleModule);
    return RoleModule;
}());
exports.RoleModule = RoleModule;
//# sourceMappingURL=role.module.js.map
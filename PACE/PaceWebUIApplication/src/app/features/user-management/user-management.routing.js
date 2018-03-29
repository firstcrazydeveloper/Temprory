"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var userManagementRoutes = [
    {
        path: 'teams',
        loadChildren: 'app/features/user-management/team/team.module#TeamModule'
    },
    {
        path: 'roles',
        loadChildren: 'app/features/user-management/role/role.module#RoleModule'
    },
    {
        path: 'users',
        loadChildren: 'app/features/user-management/user/user.module#UserModule'
    },
];
exports.userManagementRounting = router_1.RouterModule.forRoot(userManagementRoutes);
//# sourceMappingURL=user-management.routing.js.map
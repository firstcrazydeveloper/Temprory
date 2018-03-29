import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const
    userManagementRoutes: Routes = [
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

export const userManagementRounting: ModuleWithProviders = RouterModule.forRoot(userManagementRoutes);

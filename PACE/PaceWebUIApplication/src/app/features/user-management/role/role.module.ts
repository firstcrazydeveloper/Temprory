import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { RoleRouting } from './role.routing';
import { RoleService } from './role.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RoleRouting,
        RouterModule,
        FormsModule,
        SharedModule
    ],
    declarations: [RoleDetailComponent, ManageRoleComponent],
    entryComponents: [
        ManageRoleComponent
    ],
    providers: [
        RoleService
    ]
})
export class RoleModule { }

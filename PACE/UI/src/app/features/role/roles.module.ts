import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { RoleRoutingModule } from './role-routing.module';
import { RoleService } from './roles-service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
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
export class RolesModule { }

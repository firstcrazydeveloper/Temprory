import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ManageRoleComponent },
  { path: 'add-role', component: RoleDetailComponent, pathMatch: 'full' },
  { path: 'role-detail/:id/:action', component: RoleDetailComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoleRoutingModule { }

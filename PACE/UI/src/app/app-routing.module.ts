import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'teams',
    loadChildren: 'app/features/team/team.module#TeamModule'
  },
  {
    path: 'roles',
    loadChildren: 'app/features/role/roles.module#RolesModule'
  },
  {
    path: 'users',
    loadChildren: 'app/features/user/user.module#UserModule'
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }

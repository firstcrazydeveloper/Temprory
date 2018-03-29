import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';

const teamRoutes: Routes = [
  {
    path: '',
    component: ManageTeamComponent
  },
  {
    path: 'add-team',
    component: TeamDetailComponent
  },
  {
    path: 'team-detail/:id/:action',
    component: TeamDetailComponent
  }
];

export const TeamRouting: ModuleWithProviders = RouterModule.forRoot(teamRoutes);



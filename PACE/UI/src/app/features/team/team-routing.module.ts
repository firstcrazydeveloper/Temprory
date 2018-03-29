import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }

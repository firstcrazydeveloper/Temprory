import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamRoutingModule } from './team-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TeamService } from './team.service';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule,
    FormsModule,
    Ng2AutoCompleteModule
  ],
  declarations: [ ManageTeamComponent, TeamDetailComponent],
  bootstrap : [ManageTeamComponent],
  providers : [TeamService]
})
export class TeamModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamRouting } from './team.routing';
import { SharedModule } from '../../../shared/shared.module';
import { TeamService } from './team.service';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        TeamRouting,
        SharedModule, FormsModule
    ],
    declarations: [ManageTeamComponent, TeamDetailComponent],
    bootstrap: [ManageTeamComponent],
    providers: [TeamService]
})
export class TeamModule { }

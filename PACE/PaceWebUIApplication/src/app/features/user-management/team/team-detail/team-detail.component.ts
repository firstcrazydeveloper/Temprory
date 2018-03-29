import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoggerService } from '../../../../shared/services/logger.service';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Team } from '../../../../shared/models/team';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  teamId: number;
  disabled: boolean;
  teamName: string;
  userName: string;
  status: number; // change it to status after ading column in db
  constructor(private loggingService: LoggerService, private activatedRoute: ActivatedRoute,
    private teamService: TeamService, private router: Router) {
    this.loggingService.logInformation('Constructor called');
    this.activatedRoute.params.subscribe(params => this.loggingService.logInformation(params.name));
  }


  ngOnInit() {

    this.teamId = this.activatedRoute.snapshot.params['id'];
    this.disabled = this.activatedRoute.snapshot.params['action'] === 'edit' ? false : true;
    if (this.teamId) {
      this.getTeamById(this.teamId);

    } else {
      this.disabled = false;
    }
  }

  onCancelClicked() {
    this.router.navigateByUrl('/teams');
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const status = form.value.status;
    const userId = 1;
    let teamInfo: Team;
    this.loggingService.logInformation(form.value);
    this.teamService.saveTeam(name, status).subscribe(
      (response) => {
        teamInfo = response;
        console.log(teamInfo);
        this.teamService.saveTeamLiason(response.id, userId).subscribe(
          (res) => {
            console.log(res);
            this.router.navigateByUrl('/teams');
          },
          (error) => { console.log(error); this.router.navigateByUrl('/error'); }
        );
      },
      (error) => { console.log(error); }
    );
  }


  getTeamById(teamId) {
    this.loggingService.logInformation('GetTeam Method of TeamDetail');
    this.teamService.getTeamById(teamId).subscribe(
      (response) => {
        console.log(response);
        this.teamName = response.name;
      },
      (error) => console.log(error));
  }

}

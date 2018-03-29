import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoggingService } from '../../../shared/services/logging.service';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Team } from '../../../models/team';
import { BrowserModule } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';

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
  existingEmployeeUserName: any=[];
  existingEmployeeIds: any=[];
  status: number; // change it to status after ading column in db
  // myname = [
  //   'Jack',
  //   'Jim',
  //   'Jill',
  //   'Joey',
  //   'John',
  //   'Kitty',
  //   'Kate',
  //   'Kylie',
  //   'Kristen'
  // ];

  constructor(private loggingService: LoggingService, private activatedRoute: ActivatedRoute,
    private teamService: TeamService, private router: Router,
    private _spinnerService: Ng4LoadingSpinnerService, private _toaster: ToastsManager,private _vcr: ViewContainerRef,
    private _location: Location) {
    this.loggingService.logInformation('Constructor called');
    this.activatedRoute.params.subscribe(params => this.loggingService.logInformation(params.name));
    this._toaster.setRootViewContainerRef(_vcr);
  }


  ngOnInit() {

    this.teamId = this.activatedRoute.snapshot.params['id'];
    this.disabled = this.activatedRoute.snapshot.params['action'] === 'edit' ? false : true;
    this.getEmployees();
    if (this.teamId) {
      this.getTeamById(this.teamId);

    } else {
      this.disabled = false;
    }
  }

  onCancelClicked() {
    this._location.back();
  }

  onSubmit(form: NgForm) {
    const name = form.value.teamname;
    const status = form.value.status;
    const userId = 1;
    let teamInfo: Team;
    this.loggingService.logInformation(form.value);
    this.teamService.saveTeam(name, status).subscribe(
      (response) => {
        teamInfo = response;
        console.log(teamInfo);
        this._toaster.success('Team Saved Successfully!');
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
    this._spinnerService.show();
    this.loggingService.logInformation('GetTeam Method of TeamDetail');
    this.teamService.getTeamById(teamId).subscribe(
      (response) => {
        console.log(response);
        this.teamName = response.name;
        this._spinnerService.hide();
      },
      (error) => console.log(error));
  }

  getEmployees() {
    return this.teamService.getEmployees().subscribe(
      (response => {
        console.log(response);
       
        if (response.length > 0) {        
          response.forEach(data => {
            this.existingEmployeeUserName.push(data.username);
            this.existingEmployeeIds.push(data.employeeId);
          });
        }

      }),
      (error => { console.log(error); })
    );
  }

}

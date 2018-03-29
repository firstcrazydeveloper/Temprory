import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { LoggerService } from '../../../../shared/services/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent implements OnInit {

    constructor(private _teamService: TeamService, private _logger: LoggerService, private _router: Router) { }
  totalCount: number;
  teamData: any;
  pageIndex = 1;
  ngOnInit() {
    this.getTeam(this.pageIndex);
  }

  getTeam(pageIndex) {
    this._teamService.getTeamData(this.pageIndex).subscribe(
      (response) => { console.log(response); this.teamData = response; this.totalCount = response.length; },
      (error) => { console.log(error); }
    );
  }

  getTeamLiaison() {

  }


  displayToolTip($event) {
    const style = $event.currentTarget.children[1].style.display;
    if (style === '') {
      $event.currentTarget.children[1].style.display = 'inline-block';
    } else {
      $event.currentTarget.children[1].style = 'none';
    }

  }
  showDetails(teamid) {
    this._logger.logInformation('ShowDetails Method of ManageRoleComponent');
    if (event.srcElement.className === 'editLink') {
      this._router.navigateByUrl('/team-detail/' + teamid + '/edit');
    } else {
      this._router.navigateByUrl('/team-detail/' + teamid + '/view');
    }
  }

  goToPage(n: number): void {
    this.pageIndex = n;
    this.getTeam(n);
  }

  onNext(): void {
    this.pageIndex++;
    this.getTeam(this.pageIndex);
  }

  onPrev(): void {
    this.pageIndex--;
    this.getTeam(this.pageIndex);
  }

  deleteRow(teamId) {
    const output = confirm('Are you sure you want to delete?');
    if (output) {
      this._teamService.deleteTeam(teamId).subscribe(
        (response) => { console.log(response); this.getTeam(this.pageIndex); },
        (error) => { console.log(error); }
      );
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Team } from '../../../shared/models/team';
import { TeamLiason } from '../../../shared/models/team.liason';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamService {

  pageSize = 25;
  constructor(private httpService: HttpService) { }


  getTeamData(pageIndex?: number): Observable<Team[]> {
    return this.httpService.get('/teams/paged?json={"Filter":null,"Sortings":[{"Direction":1,"Field":"Id"}],"PageIndex":1,"PageSize":20}');
  }

  getTeamById(teamId: number): Observable<Team> {
    return this.httpService.get('/teams/getbyid?id=' + teamId);
  }

  getTeamLiasion() {
    return this.httpService.get('/teamliaison/');
  }

  saveTeam(teamName: string, status: number): Observable<Team> {
    const newTeam = {
      'Name': teamName,
      'isDeleted': status,
      'CreatedBy': 'in/divya.gusain',
      'ModifiedBy': 'in/divya.gusain'
    };
    return this.httpService.post('/teams', newTeam);
  }

  saveTeamLiason(teamId: number, userId: number): Observable<TeamLiason> {
    const newTeamLiason = {
      'teamId': teamId,
      'userId': userId,
      'CreatedBy': 'in/divya.gusain',
      'ModifiedBy': 'in/divya.gusain'
    };
    return this.httpService.post('/teamliaison', newTeamLiason);
  }

  deleteTeam(teamId: number): Observable<Team> {
    return this.httpService.put('/teams', teamId);
  }


}

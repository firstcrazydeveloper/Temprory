import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { User } from '../../models/user';
import { UserTeam } from '../../models/user.team';
import { UserRole } from '../../models/user.role';
import { UserPersonalDetail } from '../../models/user.personal.detail';
import { Observable } from 'rxjs/Observable';
import { Suburb } from '../../models/suburb';
import { Address } from '../../models/address';
import { UserAddress } from '../../models/user.address';

@Injectable()
export class UserService {

  pageSize = 25;
  constructor(private httpService: HttpService) { }

  getUsers(pageIndex?: number): Observable<User[]> {
    return null;
  }

  getUserById(userId: number): Observable<User> {
    return this.httpService.get('/users/getbyid?id=' + userId);
  }

  getUserPersonalDetailByUserId(userId: number) {
    return this.httpService.get('/userpersonaldetails/getbyuserid?id=' + userId);
  }

  saveUser(newUser: User): Observable<User> {

    return this.httpService.post('/users', newUser);
  }
  saveUserTeam(userTeam: UserTeam): Observable<UserTeam> {

    return this.httpService.post('/userteams', userTeam);
  }

  saveUserRole(userRole: UserRole): Observable<UserRole> {

    return this.httpService.post('/userroles', userRole);
  }

  saveUserPersonalDetail(newUserPersonalDetail: UserPersonalDetail): Observable<UserPersonalDetail> {

    return this.httpService.post('/userpersonaldetails', newUserPersonalDetail);
  }


  saveSuburb(suburb: Suburb): Observable<Suburb> {

    return this.httpService.post('/suburbs', suburb);
  }



  saveAddress(address: Address): Observable<Address> {

    return this.httpService.post('/addresses', address);
  }


  saveUserAddress(address: UserAddress): Observable<UserAddress> {

    return this.httpService.post('/useraddresses', address);
  }

  getBusinessLines(): any {
    return this.httpService.get('/referencedata/getbytype?type=businesslinetype');
  }

  getStreetTypes(): any {
    return this.httpService.get('/referencedata/getbytype?type=streettype');
  }

  getStateTypes(): any {
    return this.httpService.get('/referencedata/getbytype?type=statetype');
  }

  getActiveTeams(): any {
    return this.httpService.get('/teams/list');
  }

  getActiveRoles(): any {
    return this.httpService.get('/roles/list');
  }

  getEmployees(): any {
    return this.httpService.get('/employees/list');
  }

   getCountries(): any {
    return this.httpService.get('/referencedata/getbytype?type=countrytype');
  
  }
}
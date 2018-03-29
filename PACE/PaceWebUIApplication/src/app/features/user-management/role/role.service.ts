import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Role } from '../../../shared/models/role';
import { RoleAction } from '../../../shared/models/role.action';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class RoleService {

  roleDetails: Role[];
  roleAction: RoleAction[];

  constructor(private httpService: HttpService) {

  }
  getRoles(pageIndex?: number): Observable<Role[]> {
    return this.httpService.get('/roles/paged?json={"Filter":null,"Sortings":[{"Direction":1,"Field":"Id"}],"PageIndex":1,"PageSize":20}');
  }
  getRoleById(roleId: number): Observable<Role> {
    return this.httpService.get('/roles/getbyid?id=' + roleId);
  }

  getRoleActionsByRoleId(roleId: number): Observable<RoleAction[]> {
    return this.httpService.get('/roleactions/getbyroleid?id=' + roleId);
  }

   saveRole(roleName: string): Observable<Role> {
    const testRole = {
      'Name': roleName,
      'IsSuperAdmin': false,
      'CreatedBy': 'in/gagande.pratihar',
      'ModifiedBy': 'in/gagande.pratihar'
    };
    return this.httpService.post('/roles', testRole);
  }

  saveRoleActions(roleActions: any): any {
    return this.httpService.post('/roleactions/postlist', roleActions);
  }

  getAllRoleActions(): any {
    return this.httpService.get('/referencedata/getbytype?type=actiontype');
  }

  getRoleActionById(roleId): any {
    return this.httpService.get('/roleactions/' + roleId);
  }

  getAllRoles(): any {
    return this.httpService.get('/roles/list');
  }

  deleteRole(id: number, name: string): Observable<Role> {
    const testRole = {
      'Id': id,
      'Name': name,
      'IsSuperAdmin': false,
      'IsDeleted': true,
      'CreatedBy': 'in/gagande.pratihar',
      'ModifiedBy': 'in/gagande.pratihar'
    };
    return this.httpService.put('/roles', testRole);
  }

}

import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { LoggerService } from '../../../../shared/services/logger.service';
import { Router } from '@angular/router';
import { Role } from '../../../../shared/models/role';

@Component({
  selector: 'app-role-detail',
  templateUrl: './manage-role.component.html',
})
export class ManageRoleComponent implements OnInit {
  roleData: Role[];
  isVisible: boolean;
  myclass: any;
  totalCount: number;
  pageIndex: number;
  total = 0;
  page = 1;
  limit = 20;
  constructor(private loggingService: LoggerService, private roleService: RoleService, private router: Router) {
  }

  ngOnInit() {
    this.loggingService.logInformation('On Init Method Called of manage');
    this.totalCount = 0;
    this.pageIndex = 1;
    this.getRoles(this.pageIndex);
  }

  getRoles(id: number) {
    // To do: fetch only active roles
    this.roleService.getRoles(id).subscribe(
      (response) => {
        if (response !== null) {
          console.log(response);
          this.roleData = response;
          this.totalCount = response[0].totalCount;
          this.total = response[0].totalCount;
        }
      },
      (error) => console.log(error));
  }

  displayToolTip($event) {
    const style = $event.currentTarget.children[1].style.display;
    if (style === '') {
      $event.currentTarget.children[1].style.display = 'inline-block';
    } else {
      $event.currentTarget.children[1].style = 'none';
    }

  }
  showDetails(roleid, roleName) {
    this.loggingService.logInformation('ShowDetails Method of ManageRoleComponent');
    if (event.srcElement.className === 'editLink') {
      this.router.navigateByUrl('/role-detail/' + roleid + '/edit');
    } else {
      this.router.navigateByUrl('/role-detail/' + roleid + '/view');
    }
  }


  goToPage(n: number): void {
    this.page = n;
    this.getRoles(n);
  }

  onNext(): void {
    this.page++;
    this.getRoles(this.page);
  }

  onPrev(): void {
    this.page--;
    this.getRoles(this.page);
  }

  deleteRole(roleId, roleName) {
    const output = confirm('Are you sure you want to delete?');
    if (output) {
      this.roleService.deleteRole(roleId, roleName).subscribe(
        (response) => { console.log(response); this.getRoles(1); },
        (error) => { console.log(error); }
      );
    }



  }
}

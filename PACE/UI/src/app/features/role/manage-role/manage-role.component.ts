import { Component, OnInit } from '@angular/core';
import { RoleService } from '../roles-service';
import { LoggingService } from '../../../shared/services/logging.service';
import { Router } from '@angular/router';
import { Role } from '../../../models/role';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
  limit = 25;
  constructor(private loggingService: LoggingService, private roleService: RoleService, private router: Router,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.loggingService.logInformation('On Init Method Called of manage');
    this.totalCount = 0;
    this.pageIndex = 1;
    this.getRoles(this.pageIndex);
  }

  getRoles(id) {
    // To do: fetch only active roles
    this.spinnerService.show();
    this.roleService.getRoles(id).subscribe(
      (response) => {
        if (response !== null) {
          console.log(response);
          this.roleData = response;
          this.totalCount = response[0].totalCount;
          this.total = response[0].totalCount;
          this.spinnerService.hide();
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
    this.getRoles(this.page);
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
    this.spinnerService.show();
    if (output) {
      this.roleService.deleteRole(roleId, roleName).subscribe(
        (response) => { console.log(response); window.location.reload(); },
        (error) => { console.log(error); }
      );
    }
    this.spinnerService.show();
  }
}

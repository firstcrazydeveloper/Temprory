import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RoleService } from '../roles-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoggingService } from '../../../shared/services/logging.service';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Role } from '../../../models/role';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css'],
})
export class RoleDetailComponent implements OnInit {

  roleActions: any;
  selectedRoleActions: any;
  permissionId: number[] = [];
  roleId: number;
  disabled: boolean;
  roleName: string;


  constructor(private loggingService: LoggingService, private activatedRoute: ActivatedRoute,
    private roleService: RoleService, private router: Router, private logger: LoggingService,
    private spinnerService: Ng4LoadingSpinnerService, public toastr: ToastsManager, vcr: ViewContainerRef,
    private _location: Location) {
    this.loggingService.logInformation('Constructor called');
    this.activatedRoute.params.subscribe(params => this.loggingService.logInformation(params.name));
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.spinnerService.show();
    this.roleId = this.activatedRoute.snapshot.params['id'];
    this.disabled = this.activatedRoute.snapshot.params['action'] === 'edit' ? false : true;
    this.getRoleActions();
    if (this.roleId) {
      this.getRoleById(this.roleId);
      this.getRoleActionByRoleId(this.roleId);
    } else {
      this.disabled = false;
    }
    this.spinnerService.hide();
  }
  getRoleById(roleId) {
    this.loggingService.logInformation('GetRoleAction Method of ViewRoleComponent');
    this.roleService.getRoleById(roleId).subscribe(
      (response) => {
        console.log(response);
        this.roleName = response.name;
        this.roleService.getAllRoleActions().subscribe(
          (res => { console.log(res); this.roleActions = res; this.spinnerService.hide(); }),
          (error => { console.log(error); }));
      },
      (error) => console.log(error));
  }

  getRoleActionByRoleId(roleId) {
    this.loggingService.logInformation('GetRoleActionByRoleId Method of ViewRoleComponent');
    this.roleService.getRoleActionsByRoleId(roleId).subscribe(
      (response) => {
        console.log(response);
        this.selectedRoleActions = response;
        if (this.selectedRoleActions.length > 0) {
          this.roleActions.forEach((el) => {
            this.selectedRoleActions.forEach((ele) => {
              if (ele.actionTypeId === el.id) {
                this.permissionId.push(el.id);
              }
            });
          });
        }
      },
      (error) => console.log(error));
  }

  getRoleActions() {
    return this.roleService.getAllRoleActions().subscribe(
      (response => { console.log(response); this.roleActions = response; this.spinnerService.hide(); }),
      (error => { console.log(error); })
    );
  }

  onCancelClicked() {
    this._location.back();
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    let roleInfo: Role;
    this.logger.logInformation(form.value);
    if (!this.disabled) {
      this.roleService.saveRole(name).subscribe(
        (response) => {
          roleInfo = response;
          this.loggingService.logInformation(JSON.stringify(roleInfo));
          this.loggingService.logInformation(JSON.stringify(this.permissionId));
          const lstRoleActions = this.prepareRoleActions(roleInfo.id, this.permissionId);
          this.roleService.saveRoleActions(lstRoleActions).subscribe(
            (res) => {
              this.loggingService.logInformation(res);
              if (res.statusCode === 200) {
                this.toastr.success('Role Saved Successfully!');
                this.router.navigateByUrl('/roles');
              } else {
                this.toastr.error('Role Cannot be Saved!');
              }
            },
            (error) => { console.log(error); this.toastr.error('Role Cannot be Saved!'); }
          );
        },
        (error) => { console.log(error); this.toastr.error('Role Cannot be Saved!'); }
      );
    } else {
      this.roleService.updateRole(name, this.roleId).subscribe(
        (response) => {
          roleInfo = response;
          console.log(roleInfo);
          console.log(this.permissionId);
          const lstRoleActions = this.prepareRoleActions(roleInfo.id, this.permissionId);

          this.roleService.updateRoleActions(lstRoleActions, this.roleId).subscribe(
            (res) => {
              console.log(res);
              this.toastr.success('Role Updated Successfully!');
              if (res.statusCode === 200) {
                this.toastr.success('Role Updated Successfully!');
                this.router.navigateByUrl('/roles');
              } else {
                this.toastr.error('Role Cannot be updated!');
              }
            },
            (error) => { console.log(error); this.toastr.error('Role cannot be updated !'); }
          );
        },
        (error) => { console.log(error); this.toastr.error('Role cannot be updated !'); }
      );
    }
  }

  onChecked($event) {
    if ($event.currentTarget.checked === true) {
      this.permissionId.push($event.currentTarget.value);
    } else {
      const arrPermissions = this.permissionId;
      arrPermissions.splice(arrPermissions.indexOf($event.currentTarget.value), 1);
      this.permissionId = arrPermissions;
    }

  }

  prepareRoleActions(roleId: number, permissions: number[]) {
    const arrRoleActions = [];
    for (let i = 0; i < permissions.length; i++) {
      // To Do : Fix this logic
      const newObj = Object.create(null);
      newObj.RoleId = roleId;
      newObj.ActionTypeId = permissions[i];
      newObj.isEnabled = true;
      newObj.CreatedBy = 'in/gagande.pratihar';
      newObj.ModifiedBy = 'in/gagande.pratihar';
      newObj.ActionTypeId = permissions[i];
      arrRoleActions.push(newObj);
    }
    return arrRoleActions;
  }



}

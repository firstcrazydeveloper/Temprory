import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoggerService } from '../../../../shared/services/logger.service';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Role } from '../../../../shared/models/role';

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


    constructor(private loggingService: LoggerService, private activatedRoute: ActivatedRoute,
        private roleService: RoleService, private router: Router) {
        this.loggingService.logInformation('Constructor called');
        this.activatedRoute.params.subscribe(params => this.loggingService.logInformation(params.name));
    }

    ngOnInit() {
        this.roleId = this.activatedRoute.snapshot.params['id'];
        this.disabled = this.activatedRoute.snapshot.params['action'] === 'edit' ? false : true;
        this.getRoleActions();
        if (this.roleId) {
            this.getRoleById(this.roleId);
            this.getRoleActionByRoleId(this.roleId);

        } else {
            this.disabled = false;
        }

    }
    getRoleById(roleId) {
        this.loggingService.logInformation('GetRoleAction Method of ViewRoleComponent');
        this.roleService.getRoleById(roleId).subscribe(
            (response) => {
                console.log(response);
                this.roleName = response.name;
                this.roleService.getAllRoleActions().subscribe(
                    (res => { console.log(res); this.roleActions = res; }),
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
            (response => { console.log(response); this.roleActions = response; }),
            (error => { console.log(error); })
        );
    }

    onCancelClicked() {
        this.router.navigateByUrl('/roles');
    }

    onSubmit(form: NgForm) {
        const name = form.value.name;
        let roleInfo: Role;
        this.loggingService.logInformation(form.value);
        this.roleService.saveRole(name).subscribe(
            (response) => {
                roleInfo = response;
                console.log(roleInfo);
                console.log(this.permissionId);
                const lstRoleActions = this.prepareRoleActions(roleInfo.id, this.permissionId);
                this.roleService.saveRoleActions(lstRoleActions).subscribe(
                    (res) => {
                        console.log(res);
                        res.statusCode === 200 ? this.router.navigateByUrl('/roles') : this.router.navigateByUrl('/error');
                    },
                    (error) => { console.log(error); }
                );
            },
            (error) => { console.log(error); }
        );
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

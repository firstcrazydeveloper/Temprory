"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var role_service_1 = require("../role.service");
var router_1 = require("@angular/router");
var logger_service_1 = require("../../../../shared/services/logger.service");
var router_2 = require("@angular/router");
var RoleDetailComponent = /** @class */ (function () {
    function RoleDetailComponent(loggingService, activatedRoute, roleService, router) {
        var _this = this;
        this.loggingService = loggingService;
        this.activatedRoute = activatedRoute;
        this.roleService = roleService;
        this.router = router;
        this.permissionId = [];
        this.loggingService.logInformation('Constructor called');
        this.activatedRoute.params.subscribe(function (params) { return _this.loggingService.logInformation(params.name); });
    }
    RoleDetailComponent.prototype.ngOnInit = function () {
        this.roleId = this.activatedRoute.snapshot.params['id'];
        this.disabled = this.activatedRoute.snapshot.params['action'] === 'edit' ? false : true;
        this.getRoleActions();
        if (this.roleId) {
            this.getRoleById(this.roleId);
            this.getRoleActionByRoleId(this.roleId);
        }
        else {
            this.disabled = false;
        }
    };
    RoleDetailComponent.prototype.getRoleById = function (roleId) {
        var _this = this;
        this.loggingService.logInformation('GetRoleAction Method of ViewRoleComponent');
        this.roleService.getRoleById(roleId).subscribe(function (response) {
            console.log(response);
            _this.roleName = response.name;
            _this.roleService.getAllRoleActions().subscribe((function (res) { console.log(res); _this.roleActions = res; }), (function (error) { console.log(error); }));
        }, function (error) { return console.log(error); });
    };
    RoleDetailComponent.prototype.getRoleActionByRoleId = function (roleId) {
        var _this = this;
        this.loggingService.logInformation('GetRoleActionByRoleId Method of ViewRoleComponent');
        this.roleService.getRoleActionsByRoleId(roleId).subscribe(function (response) {
            console.log(response);
            _this.selectedRoleActions = response;
            if (_this.selectedRoleActions.length > 0) {
                _this.roleActions.forEach(function (el) {
                    _this.selectedRoleActions.forEach(function (ele) {
                        if (ele.actionTypeId === el.id) {
                            _this.permissionId.push(el.id);
                        }
                    });
                });
            }
        }, function (error) { return console.log(error); });
    };
    RoleDetailComponent.prototype.getRoleActions = function () {
        var _this = this;
        return this.roleService.getAllRoleActions().subscribe((function (response) { console.log(response); _this.roleActions = response; }), (function (error) { console.log(error); }));
    };
    RoleDetailComponent.prototype.onCancelClicked = function () {
        this.router.navigateByUrl('/roles');
    };
    RoleDetailComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var name = form.value.name;
        var roleInfo;
        this.loggingService.logInformation(form.value);
        this.roleService.saveRole(name).subscribe(function (response) {
            roleInfo = response;
            console.log(roleInfo);
            console.log(_this.permissionId);
            var lstRoleActions = _this.prepareRoleActions(roleInfo.id, _this.permissionId);
            _this.roleService.saveRoleActions(lstRoleActions).subscribe(function (res) {
                console.log(res);
                res.statusCode === 200 ? _this.router.navigateByUrl('/roles') : _this.router.navigateByUrl('/error');
            }, function (error) { console.log(error); });
        }, function (error) { console.log(error); });
    };
    RoleDetailComponent.prototype.onChecked = function ($event) {
        if ($event.currentTarget.checked === true) {
            this.permissionId.push($event.currentTarget.value);
        }
        else {
            var arrPermissions = this.permissionId;
            arrPermissions.splice(arrPermissions.indexOf($event.currentTarget.value), 1);
            this.permissionId = arrPermissions;
        }
    };
    RoleDetailComponent.prototype.prepareRoleActions = function (roleId, permissions) {
        var arrRoleActions = [];
        for (var i = 0; i < permissions.length; i++) {
            // To Do : Fix this logic
            var newObj = Object.create(null);
            newObj.RoleId = roleId;
            newObj.ActionTypeId = permissions[i];
            newObj.isEnabled = true;
            newObj.CreatedBy = 'in/gagande.pratihar';
            newObj.ModifiedBy = 'in/gagande.pratihar';
            newObj.ActionTypeId = permissions[i];
            arrRoleActions.push(newObj);
        }
        return arrRoleActions;
    };
    RoleDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-role-detail',
            templateUrl: './role-detail.component.html',
            styleUrls: ['./role-detail.component.css'],
        }),
        __metadata("design:paramtypes", [logger_service_1.LoggerService, router_2.ActivatedRoute,
            role_service_1.RoleService, router_1.Router])
    ], RoleDetailComponent);
    return RoleDetailComponent;
}());
exports.RoleDetailComponent = RoleDetailComponent;
//# sourceMappingURL=role-detail.component.js.map
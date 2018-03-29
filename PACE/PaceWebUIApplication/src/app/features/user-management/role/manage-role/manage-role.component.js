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
var logger_service_1 = require("../../../../shared/services/logger.service");
var router_1 = require("@angular/router");
var ManageRoleComponent = /** @class */ (function () {
    function ManageRoleComponent(loggingService, roleService, router) {
        this.loggingService = loggingService;
        this.roleService = roleService;
        this.router = router;
        this.total = 0;
        this.page = 1;
        this.limit = 20;
    }
    ManageRoleComponent.prototype.ngOnInit = function () {
        this.loggingService.logInformation('On Init Method Called of manage');
        this.totalCount = 0;
        this.pageIndex = 1;
        this.getRoles(this.pageIndex);
    };
    ManageRoleComponent.prototype.getRoles = function (id) {
        var _this = this;
        // To do: fetch only active roles
        this.roleService.getRoles(id).subscribe(function (response) {
            if (response !== null) {
                console.log(response);
                _this.roleData = response;
                _this.totalCount = response[0].totalCount;
                _this.total = response[0].totalCount;
            }
        }, function (error) { return console.log(error); });
    };
    ManageRoleComponent.prototype.displayToolTip = function ($event) {
        var style = $event.currentTarget.children[1].style.display;
        if (style === '') {
            $event.currentTarget.children[1].style.display = 'inline-block';
        }
        else {
            $event.currentTarget.children[1].style = 'none';
        }
    };
    ManageRoleComponent.prototype.showDetails = function (roleid, roleName) {
        this.loggingService.logInformation('ShowDetails Method of ManageRoleComponent');
        if (event.srcElement.className === 'editLink') {
            this.router.navigateByUrl('/role-detail/' + roleid + '/edit');
        }
        else {
            this.router.navigateByUrl('/role-detail/' + roleid + '/view');
        }
    };
    ManageRoleComponent.prototype.goToPage = function (n) {
        this.page = n;
        this.getRoles(n);
    };
    ManageRoleComponent.prototype.onNext = function () {
        this.page++;
        this.getRoles(this.page);
    };
    ManageRoleComponent.prototype.onPrev = function () {
        this.page--;
        this.getRoles(this.page);
    };
    ManageRoleComponent.prototype.deleteRole = function (roleId, roleName) {
        var _this = this;
        var output = confirm('Are you sure you want to delete?');
        if (output) {
            this.roleService.deleteRole(roleId, roleName).subscribe(function (response) { console.log(response); _this.getRoles(1); }, function (error) { console.log(error); });
        }
    };
    ManageRoleComponent = __decorate([
        core_1.Component({
            selector: 'app-role-detail',
            templateUrl: './manage-role.component.html',
        }),
        __metadata("design:paramtypes", [logger_service_1.LoggerService, role_service_1.RoleService, router_1.Router])
    ], ManageRoleComponent);
    return ManageRoleComponent;
}());
exports.ManageRoleComponent = ManageRoleComponent;
//# sourceMappingURL=manage-role.component.js.map
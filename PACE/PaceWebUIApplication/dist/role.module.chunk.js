webpackJsonp(["role.module"],{

/***/ "./src/app/features/user-management/role/manage-role/manage-role.component.html":
/***/ (function(module, exports) {

module.exports = "<app-nav-menu></app-nav-menu>\r\n<div class=\"container\" style=\"padding: 15px\">\r\n  <div class=\"pull-left\" style=\"color: #818A8F; padding-top: 5px;\">Total {{this.totalCount}} records </div>\r\n</div>\r\n\r\n<div class=\"container\">\r\n  <div class=\"contentTable\">\r\n    <table class=\" \">\r\n      <thead>\r\n        <tr>\r\n          <!-- <th>Role Id</th> -->\r\n          <th>Role Name\r\n            <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a>\r\n          </th>\r\n          <th>Usage\r\n            <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a>\r\n          </th>\r\n          <th>Last Action Date\r\n            <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a>\r\n          </th>\r\n          <th width=\"90\">Actions</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let role of this.roleData\">\r\n          <td>{{role.name}}</td>\r\n          <td>0</td>\r\n          <td>{{role.modified | date }}</td>\r\n          <td class=\"text-center\">\r\n            <div class=\"rowNavIcon\" (click)=\"displayToolTip($event);\">\r\n              <a href=\"javascript:void(0);\">&bull;&bull;&bull;</a>\r\n              <div class=\"rowNavBox\">\r\n                <a (click)=\"showDetails(role.id);\" class=\"editLink\"> </a>\r\n                <a (click)=\"showDetails(role.id);\" class=\"searchLink\"> </a>\r\n                <!-- <div *ngIf='role.totalCount>0 else showDelete'></div>\r\n                    <ng-template #showDelete><a href=\"javascript:void(0);\" class=\"deleteLink\"> </a></ng-template> -->\r\n                <a (click)=\"deleteRole(role.id,role.name);\" class=\"deleteLink\"> </a>\r\n              </div>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n\r\n\r\n<app-pagination *ngIf=\"this.totalCount>25\" (goPage)=\"this.goToPage($event)\" (goNext)=\"onNext()\" (goPrev)=\"onPrev()\" [pagesToShow]=\"3\" [page]=\"page\" [perPage]=\"limit\"\r\n  [count]=\"total\"></app-pagination>"

/***/ }),

/***/ "./src/app/features/user-management/role/manage-role/manage-role.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageRoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__role_service__ = __webpack_require__("./src/app/features/user-management/role/role.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_logger_service__ = __webpack_require__("./src/app/shared/services/logger.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-role-detail',
            template: __webpack_require__("./src/app/features/user-management/role/manage-role/manage-role.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_services_logger_service__["a" /* LoggerService */], __WEBPACK_IMPORTED_MODULE_1__role_service__["a" /* RoleService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
    ], ManageRoleComponent);
    return ManageRoleComponent;
}());



/***/ }),

/***/ "./src/app/features/user-management/role/role-detail/role-detail.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/features/user-management/role/role-detail/role-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-nav-menu></app-nav-menu>\r\n<form (ngSubmit)=\"onSubmit(f)\" #f=\"ngForm\" novalidate>\r\n\t<div class=\"container clearfix\">\r\n\t\t<div class=\"pageHeading_new row\">\r\n\t\t\t<span>Details</span>\r\n\t\t</div>\r\n\t\t<!--//pageHeading-->\r\n\t\t<div class=\"page_body row\">\r\n\t\t\t<div class=\"pageHeading\">\r\n\t\t\t\tDetails\r\n\t\t\t</div>\r\n\t\t\t<div class=\"row form-group\">\r\n\t\t\t\t<div class=\"col-sm-1 textlabel\">Role Name</div>\r\n\t\t\t\t<div class=\"col-sm-3\" >\r\n\t\t\t\t\t<input type=\"text\" name=\"name\" [(ngModel)]=\"roleName\"  class=\"form-control\" disabled=\"{{disabled}}\" required/>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"pageHeading\">\r\n\t\t\t\tAccess\r\n\t\t\t</div>\r\n\t\t\t<div class=\"contentTable\" style=\"margin-bottom:15px; padding-bottom:0;\">\r\n\t\t\t\t<table class=\" \">\r\n\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<th width=\"80%\">Action</th>\r\n\t\t\t\t\t\t\t<th>Has Permission</th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</thead>\r\n\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr *ngFor=\"let action of this.roleActions\">\r\n\t\t\t\t\t\t\t\t\t<td>{{action.description}}</td>\r\n\t\t\t\t\t\t\t\t\t<td><input type=\"checkbox\" [checked]=\"permissionId.indexOf(action.id) >= 0\" [attr.disabled]=\"disabled?'':null\" name=\"chkPermissions\" (change)=\"onChecked($event)\" value=\"{{action.id}}\" ngModel required></td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"col-sm-12 text-right margin_top_10\">\r\n\t\t\t\t<button *ngIf=\"!disabled\" type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!f.valid\">Save</button>\r\n\t\t\t\t<input type=\"button\" class=\"btn btn-primary\" value=\"Cancel\" (click)=\"onCancelClicked()\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/features/user-management/role/role-detail/role-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__role_service__ = __webpack_require__("./src/app/features/user-management/role/role.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_logger_service__ = __webpack_require__("./src/app/shared/services/logger.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-role-detail',
            template: __webpack_require__("./src/app/features/user-management/role/role-detail/role-detail.component.html"),
            styles: [__webpack_require__("./src/app/features/user-management/role/role-detail/role-detail.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__shared_services_logger_service__["a" /* LoggerService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__role_service__["a" /* RoleService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], RoleDetailComponent);
    return RoleDetailComponent;
}());



/***/ }),

/***/ "./src/app/features/user-management/role/role.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleModule", function() { return RoleModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__role_detail_role_detail_component__ = __webpack_require__("./src/app/features/user-management/role/role-detail/role-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manage_role_manage_role_component__ = __webpack_require__("./src/app/features/user-management/role/manage-role/manage-role.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__role_routing__ = __webpack_require__("./src/app/features/user-management/role/role.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__role_service__ = __webpack_require__("./src/app/features/user-management/role/role.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var RoleModule = /** @class */ (function () {
    function RoleModule() {
    }
    RoleModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__role_routing__["a" /* RoleRouting */],
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["c" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__role_detail_role_detail_component__["a" /* RoleDetailComponent */], __WEBPACK_IMPORTED_MODULE_3__manage_role_manage_role_component__["a" /* ManageRoleComponent */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__manage_role_manage_role_component__["a" /* ManageRoleComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__role_service__["a" /* RoleService */]
            ]
        })
    ], RoleModule);
    return RoleModule;
}());



/***/ }),

/***/ "./src/app/features/user-management/role/role.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__role_detail_role_detail_component__ = __webpack_require__("./src/app/features/user-management/role/role-detail/role-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manage_role_manage_role_component__ = __webpack_require__("./src/app/features/user-management/role/manage-role/manage-role.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_3__manage_role_manage_role_component__["a" /* ManageRoleComponent */] },
    { path: 'add-role', component: __WEBPACK_IMPORTED_MODULE_2__role_detail_role_detail_component__["a" /* RoleDetailComponent */], pathMatch: 'full' },
    { path: 'role-detail/:id/:action', component: __WEBPACK_IMPORTED_MODULE_2__role_detail_role_detail_component__["a" /* RoleDetailComponent */], pathMatch: 'full' }
];
var RoleRouting = /** @class */ (function () {
    function RoleRouting() {
    }
    RoleRouting = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forChild(routes)
            ],
            declarations: [],
            exports: [__WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */]]
        })
    ], RoleRouting);
    return RoleRouting;
}());



/***/ }),

/***/ "./src/app/features/user-management/role/role.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_http_service__ = __webpack_require__("./src/app/shared/services/http.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RoleService = /** @class */ (function () {
    function RoleService(httpService) {
        this.httpService = httpService;
    }
    RoleService.prototype.getRoles = function (pageIndex) {
        return this.httpService.get('/roles/paged?json={"Filter":null,"Sortings":[{"Direction":1,"Field":"Id"}],"PageIndex":1,"PageSize":20}');
    };
    RoleService.prototype.getRoleById = function (roleId) {
        return this.httpService.get('/roles/getbyid?id=' + roleId);
    };
    RoleService.prototype.getRoleActionsByRoleId = function (roleId) {
        return this.httpService.get('/roleactions/getbyroleid?id=' + roleId);
    };
    RoleService.prototype.saveRole = function (roleName) {
        var testRole = {
            'Name': roleName,
            'IsSuperAdmin': false,
            'CreatedBy': 'in/gagande.pratihar',
            'ModifiedBy': 'in/gagande.pratihar'
        };
        return this.httpService.post('/roles', testRole);
    };
    RoleService.prototype.saveRoleActions = function (roleActions) {
        return this.httpService.post('/roleactions/postlist', roleActions);
    };
    RoleService.prototype.getAllRoleActions = function () {
        return this.httpService.get('/referencedata/getbytype?type=actiontype');
    };
    RoleService.prototype.getRoleActionById = function (roleId) {
        return this.httpService.get('/roleactions/' + roleId);
    };
    RoleService.prototype.getAllRoles = function () {
        return this.httpService.get('/roles/list');
    };
    RoleService.prototype.deleteRole = function (id, name) {
        var testRole = {
            'Id': id,
            'Name': name,
            'IsSuperAdmin': false,
            'IsDeleted': true,
            'CreatedBy': 'in/gagande.pratihar',
            'ModifiedBy': 'in/gagande.pratihar'
        };
        return this.httpService.put('/roles', testRole);
    };
    RoleService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_http_service__["a" /* HttpService */]])
    ], RoleService);
    return RoleService;
}());



/***/ })

});
//# sourceMappingURL=role.module.chunk.js.map
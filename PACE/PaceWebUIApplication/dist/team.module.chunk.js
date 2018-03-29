webpackJsonp(["team.module"],{

/***/ "./src/app/features/user-management/team/manage-team/manage-team.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/features/user-management/team/manage-team/manage-team.component.html":
/***/ (function(module, exports) {

module.exports = "<app-nav-menu></app-nav-menu>\r\n<div class=\"container\" style=\"padding: 15px\">\r\n  <div class=\"pull-left\" style=\"color: #818A8F; padding-top: 5px;\">Total {{this.totalCount}} Records</div>\r\n\r\n</div>\r\n\r\n<div class=\"container\">\r\n  <div class=\"contentTable\">\r\n    <table class=\" \">\r\n      <thead>\r\n        <tr>\r\n          <th>Team Name\r\n            <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a>\r\n          </th>\r\n          <th>Liaison Username\r\n            <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a>\r\n          </th>\r\n          <th>Liaison Team\r\n            <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a>\r\n          </th>\r\n          <th> Last Action Date\r\n            <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a>\r\n          </th>\r\n          <th width=\"90\">Actions</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n          <tr *ngFor=\"let item of this.teamData\">\r\n              <td>{{item.name}}</td>\r\n              <td>null</td>\r\n              <td>null</td>\r\n              <td>{{item.modified | date }}</td>\r\n              <td class=\"text-center\">\r\n                <div class=\"rowNavIcon\" (click)=\"displayToolTip($event);\">\r\n                  <a href=\"javascript:void(0);\">&bull;&bull;&bull;</a>\r\n                  <div class=\"rowNavBox\">\r\n                    <a (click)=\"showDetails(item.id);\" class=\"editLink\"> </a>\r\n                    <a (click)=\"showDetails(item.id);\" class=\"searchLink\"> </a>\r\n                    <a (click)=\"deleteRow(item.id,item.name);\" class=\"deleteLink\"> </a>\r\n                  </div>\r\n                </div>\r\n              </td>\r\n            </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <!--//contentTable-->\r\n</div>\r\n<app-pagination *ngIf=\"this.totalCount>25\" (goPage)=\"this.goToPage($event)\" (goNext)=\"onNext()\" (goPrev)=\"onPrev()\" [pagesToShow]=\"3\" [page]=\"this.pageIndex\" [perPage]=\"25\"\r\n  [count]=\"this.totalCount\"></app-pagination>"

/***/ }),

/***/ "./src/app/features/user-management/team/manage-team/manage-team.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageTeamComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__team_service__ = __webpack_require__("./src/app/features/user-management/team/team.service.ts");
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




var ManageTeamComponent = /** @class */ (function () {
    function ManageTeamComponent(_teamService, _logger, _router) {
        this._teamService = _teamService;
        this._logger = _logger;
        this._router = _router;
        this.pageIndex = 1;
    }
    ManageTeamComponent.prototype.ngOnInit = function () {
        this.getTeam(this.pageIndex);
    };
    ManageTeamComponent.prototype.getTeam = function (pageIndex) {
        var _this = this;
        this._teamService.getTeamData(this.pageIndex).subscribe(function (response) { console.log(response); _this.teamData = response; _this.totalCount = response.length; }, function (error) { console.log(error); });
    };
    ManageTeamComponent.prototype.getTeamLiaison = function () {
    };
    ManageTeamComponent.prototype.displayToolTip = function ($event) {
        var style = $event.currentTarget.children[1].style.display;
        if (style === '') {
            $event.currentTarget.children[1].style.display = 'inline-block';
        }
        else {
            $event.currentTarget.children[1].style = 'none';
        }
    };
    ManageTeamComponent.prototype.showDetails = function (teamid) {
        this._logger.logInformation('ShowDetails Method of ManageRoleComponent');
        if (event.srcElement.className === 'editLink') {
            this._router.navigateByUrl('/team-detail/' + teamid + '/edit');
        }
        else {
            this._router.navigateByUrl('/team-detail/' + teamid + '/view');
        }
    };
    ManageTeamComponent.prototype.goToPage = function (n) {
        this.pageIndex = n;
        this.getTeam(n);
    };
    ManageTeamComponent.prototype.onNext = function () {
        this.pageIndex++;
        this.getTeam(this.pageIndex);
    };
    ManageTeamComponent.prototype.onPrev = function () {
        this.pageIndex--;
        this.getTeam(this.pageIndex);
    };
    ManageTeamComponent.prototype.deleteRow = function (teamId) {
        var _this = this;
        var output = confirm('Are you sure you want to delete?');
        if (output) {
            this._teamService.deleteTeam(teamId).subscribe(function (response) { console.log(response); _this.getTeam(_this.pageIndex); }, function (error) { console.log(error); });
        }
    };
    ManageTeamComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-team-list',
            template: __webpack_require__("./src/app/features/user-management/team/manage-team/manage-team.component.html"),
            styles: [__webpack_require__("./src/app/features/user-management/team/manage-team/manage-team.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__team_service__["a" /* TeamService */], __WEBPACK_IMPORTED_MODULE_2__shared_services_logger_service__["a" /* LoggerService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
    ], ManageTeamComponent);
    return ManageTeamComponent;
}());



/***/ }),

/***/ "./src/app/features/user-management/team/team-detail/team-detail.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/features/user-management/team/team-detail/team-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-nav-menu></app-nav-menu>\r\n<form (ngSubmit)=\"onSubmit(f)\" #f=\"ngForm\" novalidate>\r\n<div class=\"container clearfix\" style=\"padding-top:20px;\">\t\r\n\t<div class=\"contractFormTabs\">\r\n\t\t<!-- Nav tabs -->\r\n\t\t<ul class=\"nav nav-tabs\" role=\"tablist\">\r\n\t\t\t<li role=\"presentation\" class=\"active\"><a href=\"#tab1\" aria-controls=\"tab1\" role=\"tab\" data-toggle=\"tab\">Details</a></li>\r\n\t\t\t<!-- <li role=\"presentation\"><a href=\"#tab2\" aria-controls=\"tab2\" role=\"tab\" data-toggle=\"tab\">Templates</a></li> -->\r\n\t\t</ul>\r\n\r\n\t\t<!-- Tab panes -->\r\n\t\t<div class=\"tab-content\">\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane active\" id=\"tab1\">\r\n\t\t\t\t<div class=\"pageHeading\">\r\n\t\t\t\t\tDetails\r\n\t\t\t\t</div><!--//pageHeading-->\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-md-4\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4 textlabel\">Team Name</div><!--//col-sm-4-->\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\r\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"name\" [(ngModel)]=\"teamName\"  class=\"form-control\" disabled=\"{{disabled}}\" required/>\r\n\t\t\t\t\t\t\t\t</div><!--//col-sm-8-->\r\n\t\t\t\t\t\t\t</div><!--//row-->\r\n\t\t\t\t\t\t</div><!--//form-group-->\r\n\t\t\t\t\t</div><!--//col-md-4-->\r\n\t\t\t\t\t<div class=\"col-md-4\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4 textlabel\">Status</div><!--//col-sm-4-->\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\r\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" [(ngModel)]=\"status\" name=\"status\"   disabled=\"{{disabled}}\">\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"0\">Active</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"8\">InActive</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\r\n\t\t\t\t\t\t\t\t</div><!--//col-sm-8-->\r\n\t\t\t\t\t\t\t</div><!--//row-->\r\n\t\t\t\t\t\t</div><!--//form-group-->\r\n\t\t\t\t\t</div><!--//col-md-4-->\r\n\t\t\t\t</div><!--//row-->\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"pageHeading\">\r\n\t\t\t\t\tLiaison\r\n\t\t\t\t</div><!--//pageHeading-->\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"row\">\t\t\t\t\t\r\n\t\t\t\t\t<div class=\"col-md-4\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4 textlabel\">Username</div><!--//col-sm-4-->\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\r\n\t\t\t\t\t\t\t\t\t<a href=\"javascript:void(0);\" class=\"addFldBtn\"><span class=\"glyphicon glyphicon-search\"></span></a>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"userName\" [(ngModel)]=\"userName\"  class=\"form-control\" disabled=\"{{disabled}}\" />\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t</div><!--//col-sm-8-->\r\n\t\t\t\t\t\t\t</div><!--//row-->\r\n\t\t\t\t\t\t</div><!--//form-group-->\r\n\t\t\t\t\t</div><!--//col-md-4-->\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class=\"col-md-4\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4 textlabel\">Team</div><!--//col-sm-4-->\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\r\n\t\t\t\t\t\t\t\t\t<!-- <input type=\"text\" class=\"form-control\" value=\"\" disabled> -->\r\n\t\t\t\t\t\t\t\t</div><!--//col-sm-8-->\r\n\t\t\t\t\t\t\t</div><!--//row-->\r\n\t\t\t\t\t\t</div><!--//form-group-->\r\n\t\t\t\t\t</div><!--//col-md-4-->\r\n\t\t\t\t</div><!--//row-->\r\n\t\t\t\t\r\n\t\t\t</div><!--//tab1-->\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t<!-- <div role=\"tabpanel\" class=\"tab-pane\" id=\"tab2\">\t\t\t\t\t\t\r\n\t\t\t\t<div class=\"pageHeading\">\r\n\t\t\t\t\tTemplates\r\n\t\t\t\t</div><!--//pageHeading-->\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"row\">\t\t\t\t\t\r\n\t\t\t\t\t<div class=\"col-md-4\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\r\n\t\t\t\t\t\t\t\t\t<!-- <input type=\"text\" class=\"form-control\" value=\"\"> -->\r\n\t\t\t\t\t\t\t\t</div><!--//col-sm-4-->\r\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\r\n\t\t\t\t\t\t\t\t\t<a href=\"javascript:void(0);\" class=\"addFldBtn\"><span class=\"glyphicon glyphicon-plus\"></span></a>\r\n\t\t\t\t\t\t\t\t</div><!--//col-sm-4-->\r\n\t\t\t\t\t\t\t</div><!--//row-->\r\n\t\t\t\t\t\t</div><!--//form-group-->\r\n\t\t\t\t\t</div><!--//col-md-4-->\r\n\t\t\t\t</div><!--//row-->\r\n\t\t\t\t\r\n\t\t\t\t<!-- <div class=\"contentTable\" style=\"margin-bottom:15px; padding-bottom:0;\">\r\n\t\t\t\t\t<table class=\" \">\r\n\t\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<th>Template Name <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a></th>\r\n\t\t\t\t\t\t\t<th class=\"text-center\" width=\"150\">Useage <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a></th>\r\n\t\t\t\t\t\t\t<th class=\"text-center\" width=\"150\">Version <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a></th>\r\n\t\t\t\t\t\t\t<th class=\"text-center\" width=\"150\">Status <a href=\"javascript:void(0);\" class=\"colSortBtn\"></a></th>\r\n\t\t\t\t\t\t\t<th class=\"text-center\" width=\"66\"></th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</div> -->\r\n\t\t\t\t<!-- //contentTable -->\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t<!-- </div> -->\r\n\t\t\t<!--//tab2-->\r\n\t\t\t\r\n\t\t\t\r\n\t\t</div><!--//tab-content-->\r\n\r\n\t</div><!--//contractFormTabs-->\r\n\t\r\n\t\r\n\t<div class=\"clearfix text-right contractBtns\">\r\n\t\t\t<button *ngIf=\"!disabled\" type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!f.valid\">Save</button>\r\n\t\t\t<input type=\"button\" class=\"btn btn-primary\" value=\"Cancel\" (click)=\"onCancelClicked()\">\r\n\t</div>\r\n\t\r\n</div>\r\n</form>"

/***/ }),

/***/ "./src/app/features/user-management/team/team-detail/team-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__team_service__ = __webpack_require__("./src/app/features/user-management/team/team.service.ts");
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





var TeamDetailComponent = /** @class */ (function () {
    function TeamDetailComponent(loggingService, activatedRoute, teamService, router) {
        var _this = this;
        this.loggingService = loggingService;
        this.activatedRoute = activatedRoute;
        this.teamService = teamService;
        this.router = router;
        this.loggingService.logInformation('Constructor called');
        this.activatedRoute.params.subscribe(function (params) { return _this.loggingService.logInformation(params.name); });
    }
    TeamDetailComponent.prototype.ngOnInit = function () {
        this.teamId = this.activatedRoute.snapshot.params['id'];
        this.disabled = this.activatedRoute.snapshot.params['action'] === 'edit' ? false : true;
        if (this.teamId) {
            this.getTeamById(this.teamId);
        }
        else {
            this.disabled = false;
        }
    };
    TeamDetailComponent.prototype.onCancelClicked = function () {
        this.router.navigateByUrl('/teams');
    };
    TeamDetailComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var name = form.value.name;
        var status = form.value.status;
        var userId = 1;
        var teamInfo;
        this.loggingService.logInformation(form.value);
        this.teamService.saveTeam(name, status).subscribe(function (response) {
            teamInfo = response;
            console.log(teamInfo);
            _this.teamService.saveTeamLiason(response.id, userId).subscribe(function (res) {
                console.log(res);
                _this.router.navigateByUrl('/teams');
            }, function (error) { console.log(error); _this.router.navigateByUrl('/error'); });
        }, function (error) { console.log(error); });
    };
    TeamDetailComponent.prototype.getTeamById = function (teamId) {
        var _this = this;
        this.loggingService.logInformation('GetTeam Method of TeamDetail');
        this.teamService.getTeamById(teamId).subscribe(function (response) {
            console.log(response);
            _this.teamName = response.name;
        }, function (error) { return console.log(error); });
    };
    TeamDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-team-detail',
            template: __webpack_require__("./src/app/features/user-management/team/team-detail/team-detail.component.html"),
            styles: [__webpack_require__("./src/app/features/user-management/team/team-detail/team-detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__shared_services_logger_service__["a" /* LoggerService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__team_service__["a" /* TeamService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], TeamDetailComponent);
    return TeamDetailComponent;
}());



/***/ }),

/***/ "./src/app/features/user-management/team/team.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamModule", function() { return TeamModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_team_manage_team_component__ = __webpack_require__("./src/app/features/user-management/team/manage-team/manage-team.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__team_detail_team_detail_component__ = __webpack_require__("./src/app/features/user-management/team/team-detail/team-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__team_routing__ = __webpack_require__("./src/app/features/user-management/team/team.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__team_service__ = __webpack_require__("./src/app/features/user-management/team/team.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var TeamModule = /** @class */ (function () {
    function TeamModule() {
    }
    TeamModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__team_routing__["a" /* TeamRouting */],
                __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__manage_team_manage_team_component__["a" /* ManageTeamComponent */], __WEBPACK_IMPORTED_MODULE_3__team_detail_team_detail_component__["a" /* TeamDetailComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__manage_team_manage_team_component__["a" /* ManageTeamComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__team_service__["a" /* TeamService */]]
        })
    ], TeamModule);
    return TeamModule;
}());



/***/ }),

/***/ "./src/app/features/user-management/team/team.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__team_detail_team_detail_component__ = __webpack_require__("./src/app/features/user-management/team/team-detail/team-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_team_manage_team_component__ = __webpack_require__("./src/app/features/user-management/team/manage-team/manage-team.component.ts");



var teamRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__manage_team_manage_team_component__["a" /* ManageTeamComponent */]
    },
    {
        path: 'add-team',
        component: __WEBPACK_IMPORTED_MODULE_1__team_detail_team_detail_component__["a" /* TeamDetailComponent */]
    },
    {
        path: 'team-detail/:id/:action',
        component: __WEBPACK_IMPORTED_MODULE_1__team_detail_team_detail_component__["a" /* TeamDetailComponent */]
    }
];
var TeamRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(teamRoutes);


/***/ }),

/***/ "./src/app/features/user-management/team/team.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamService; });
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


var TeamService = /** @class */ (function () {
    function TeamService(httpService) {
        this.httpService = httpService;
        this.pageSize = 25;
    }
    TeamService.prototype.getTeamData = function (pageIndex) {
        return this.httpService.get('/teams/paged?json={"Filter":null,"Sortings":[{"Direction":1,"Field":"Id"}],"PageIndex":1,"PageSize":20}');
    };
    TeamService.prototype.getTeamById = function (teamId) {
        return this.httpService.get('/teams/getbyid?id=' + teamId);
    };
    TeamService.prototype.getTeamLiasion = function () {
        return this.httpService.get('/teamliaison/');
    };
    TeamService.prototype.saveTeam = function (teamName, status) {
        var newTeam = {
            'Name': teamName,
            'isDeleted': status,
            'CreatedBy': 'in/divya.gusain',
            'ModifiedBy': 'in/divya.gusain'
        };
        return this.httpService.post('/teams', newTeam);
    };
    TeamService.prototype.saveTeamLiason = function (teamId, userId) {
        var newTeamLiason = {
            'teamId': teamId,
            'userId': userId,
            'CreatedBy': 'in/divya.gusain',
            'ModifiedBy': 'in/divya.gusain'
        };
        return this.httpService.post('/teamliaison', newTeamLiason);
    };
    TeamService.prototype.deleteTeam = function (teamId) {
        return this.httpService.put('/teams', teamId);
    };
    TeamService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_http_service__["a" /* HttpService */]])
    ], TeamService);
    return TeamService;
}());



/***/ })

});
//# sourceMappingURL=team.module.chunk.js.map
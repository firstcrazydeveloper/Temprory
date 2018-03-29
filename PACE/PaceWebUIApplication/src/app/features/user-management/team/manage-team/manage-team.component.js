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
var team_service_1 = require("../team.service");
var logger_service_1 = require("../../../../shared/services/logger.service");
var router_1 = require("@angular/router");
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
        core_1.Component({
            selector: 'app-team-list',
            templateUrl: './manage-team.component.html',
            styleUrls: ['./manage-team.component.css']
        }),
        __metadata("design:paramtypes", [team_service_1.TeamService, logger_service_1.LoggerService, router_1.Router])
    ], ManageTeamComponent);
    return ManageTeamComponent;
}());
exports.ManageTeamComponent = ManageTeamComponent;
//# sourceMappingURL=manage-team.component.js.map
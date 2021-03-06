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
var router_1 = require("@angular/router");
var logger_service_1 = require("../../../../shared/services/logger.service");
var router_2 = require("@angular/router");
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
        core_1.Component({
            selector: 'app-team-detail',
            templateUrl: './team-detail.component.html',
            styleUrls: ['./team-detail.component.css']
        }),
        __metadata("design:paramtypes", [logger_service_1.LoggerService, router_2.ActivatedRoute,
            team_service_1.TeamService, router_1.Router])
    ], TeamDetailComponent);
    return TeamDetailComponent;
}());
exports.TeamDetailComponent = TeamDetailComponent;
//# sourceMappingURL=team-detail.component.js.map
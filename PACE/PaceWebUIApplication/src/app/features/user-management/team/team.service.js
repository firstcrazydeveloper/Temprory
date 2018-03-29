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
var http_service_1 = require("../../../shared/services/http.service");
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_service_1.HttpService])
    ], TeamService);
    return TeamService;
}());
exports.TeamService = TeamService;
//# sourceMappingURL=team.service.js.map
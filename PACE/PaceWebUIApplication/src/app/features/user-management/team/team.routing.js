"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var team_detail_component_1 = require("./team-detail/team-detail.component");
var manage_team_component_1 = require("./manage-team/manage-team.component");
var teamRoutes = [
    {
        path: '',
        component: manage_team_component_1.ManageTeamComponent
    },
    {
        path: 'add-team',
        component: team_detail_component_1.TeamDetailComponent
    },
    {
        path: 'team-detail/:id/:action',
        component: team_detail_component_1.TeamDetailComponent
    }
];
exports.TeamRouting = router_1.RouterModule.forRoot(teamRoutes);
//# sourceMappingURL=team.routing.js.map
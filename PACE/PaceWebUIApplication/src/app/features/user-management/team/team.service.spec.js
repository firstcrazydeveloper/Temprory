"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var team_service_1 = require("./team.service");
describe('TeamService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [team_service_1.TeamService]
        });
    });
    it('should be created', testing_1.inject([team_service_1.TeamService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=team.service.spec.js.map
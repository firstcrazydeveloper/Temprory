"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Team = /** @class */ (function () {
    function Team(id, name, status, date, count, isDeleted) {
        this.id = id;
        this.name = name;
        this.modified = date;
        this.createdBy = 'in/divya.gusain';
        this.modifiedBy = 'in/divya.gusain';
        this.totalCount = count;
        this.isDeleted = isDeleted;
        this.status = 0; // change it to status after adding new status column
    }
    return Team;
}());
exports.Team = Team;
//# sourceMappingURL=team.js.map
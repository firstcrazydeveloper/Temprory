"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role = /** @class */ (function () {
    function Role(id, name, users, date, count, isActive) {
        this.id = id;
        this.name = name;
        this.modified = date;
        this.createdBy = 'in/gagande.pratihar';
        this.modifiedBy = 'in/gagande.pratihar';
        this.isSuperAdmin = false;
        this.totalCount = count;
        this.IsDeleted = isActive;
    }
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=role.js.map
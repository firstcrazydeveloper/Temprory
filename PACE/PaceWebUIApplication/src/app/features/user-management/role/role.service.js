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
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_service_1.HttpService])
    ], RoleService);
    return RoleService;
}());
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var manage_user_component_1 = require("./manage-user/manage-user.component");
var user_detail_component_1 = require("./user-detail/user-detail.component");
var user_routing_1 = require("./user.routing");
var shared_module_1 = require("../../../shared/shared.module");
var user_service_1 = require("./user.service");
var forms_1 = require("@angular/forms");
var sortableDataGrid_module_1 = require("../../../shared/sortableDataGrid/sortableDataGrid.module");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                user_routing_1.UserRouting,
                shared_module_1.SharedModule, forms_1.FormsModule, sortableDataGrid_module_1.SortableDataGridModule
            ],
            declarations: [manage_user_component_1.ManageUserComponent, user_detail_component_1.UserDetailComponent],
            bootstrap: [manage_user_component_1.ManageUserComponent],
            providers: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map
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
var app_header_component_1 = require("./components/app-header/app-header.component");
var app_footer_component_1 = require("./components/app-footer/app-footer.component");
var nav_menu_component_1 = require("./components/nav-menu/nav-menu.component");
var router_1 = require("@angular/router");
var pagination_component_1 = require("./components/pagination/pagination.component");
var loader_component_1 = require("./components/loader/loader.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule
            ],
            declarations: [app_header_component_1.AppHeaderComponent, app_footer_component_1.AppFooterComponent, nav_menu_component_1.NavMenuComponent, pagination_component_1.PaginationComponent, loader_component_1.LoaderComponent],
            exports: [app_header_component_1.AppHeaderComponent, app_footer_component_1.AppFooterComponent, nav_menu_component_1.NavMenuComponent, pagination_component_1.PaginationComponent, loader_component_1.LoaderComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map
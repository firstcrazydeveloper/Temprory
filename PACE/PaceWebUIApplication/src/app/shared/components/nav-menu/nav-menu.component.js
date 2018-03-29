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
var router_1 = require("@angular/router");
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(_router) {
        this._router = _router;
        this.testObject = [
            { 'text': 'new role', 'path': '/add-role' },
            { 'text': 'roles', 'path': '/roles' },
            { 'text': 'teams', 'path': '/teams' },
            { 'text': 'users', 'path': '/users' },
        ];
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        this.changeNavigationMenu(this._router.url);
    };
    NavMenuComponent.prototype.changeNavigationMenu = function (url) {
        if (url === '/roles') {
            this.header = 'Security - Roles';
        }
        else if (url === '/teams' || url === '/team-detail/') {
            this.header = 'Security - Teams';
            this.testObject = [
                { 'text': 'new team', 'path': '/add-team' },
                { 'text': 'roles', 'path': '/roles' },
                { 'text': 'teams', 'path': '/teams' },
                { 'text': 'users', 'path': '/users' },
            ];
        }
        else if (url === '/users' || url === '/user-detail/') {
            this.header = 'Security - Users';
            this.testObject = [
                { 'text': 'new user', 'path': '/add-user' },
                { 'text': 'roles', 'path': '/roles' },
                { 'text': 'teams', 'path': '/teams' },
                { 'text': 'users', 'path': '/users' },
            ];
        }
    };
    NavMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-menu',
            templateUrl: './nav-menu.component.html',
            styleUrls: ['./nav-menu.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], NavMenuComponent);
    return NavMenuComponent;
}());
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=nav-menu.component.js.map
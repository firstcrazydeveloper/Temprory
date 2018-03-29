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
var enum_1 = require("../../../../shared/config/enum");
var ManageUserComponent = /** @class */ (function () {
    //Grid Vars end
    function ManageUserComponent() {
        this.users = [];
        this.isReadOnly = false;
        this.dummyUsers = [{ "Id": 33, "FirstName": "Yaseer", "LastName": "Mumtaz", "Gender": "Male", "Email": "contact@fullstackcircle.com", "DOB": "1985-02-08T06:00:00", "City": "Fairfax", "State": "Virginia", "Zip": "22033", "Country": "USA" }, { "Id": 34, "FirstName": "John", "LastName": "Doe", "Gender": "Male", "Email": "jdoe@testmail.com", "DOB": "1950-01-01T06:00:00", "City": "Reston", "State": "Virginia", "Zip": "20007", "Country": "USA" }, { "Id": 35, "FirstName": "Chris", "LastName": "Walton", "Gender": "Male", "Email": "cwalton@nodb.com", "DOB": "1964-07-03T05:00:00", "City": "Edgewood", "State": "New York", "Zip": "11801", "Country": "USA" }];
        //Grid Vars start
        this.columns = [
            {
                display: 'First Name',
                variable: 'FirstName',
                filter: 'text',
            },
            {
                display: 'Last Name',
                variable: 'LastName',
                filter: 'text'
            },
            {
                display: 'Gender',
                variable: 'Gender',
                filter: 'text'
            },
            {
                display: 'Date of Birth',
                variable: 'DOB',
                filter: 'date'
            }
        ];
        this.sorting = {
            column: 'FirstName',
            descending: false
        };
        this.hdrbtns = [];
        this.gridbtns = [];
    }
    ManageUserComponent.prototype.initGridButton = function () {
        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: enum_1.DBOperation.create,
                ishide: this.isReadOnly
            }
        ];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['Id'],
                action: enum_1.DBOperation.update,
                ishide: this.isReadOnly
            },
            {
                title: 'X',
                keys: ["Id"],
                action: enum_1.DBOperation.delete,
                ishide: this.isReadOnly
            }
        ];
    };
    ManageUserComponent.prototype.ngOnInit = function () {
        this.loadUsers();
    };
    ManageUserComponent.prototype.loadUsers = function () {
        this.users = this.dummyUsers;
        this.initGridButton();
    };
    ManageUserComponent.prototype.addUser = function () {
    };
    ManageUserComponent.prototype.editUser = function (id) {
    };
    ManageUserComponent.prototype.deleteUser = function (id) {
    };
    ManageUserComponent.prototype.gridaction = function (gridaction) {
        switch (gridaction.action) {
            case enum_1.DBOperation.create:
                this.addUser();
                break;
            case enum_1.DBOperation.update:
                this.editUser(gridaction.values[0].value);
                break;
            case enum_1.DBOperation.delete:
                this.deleteUser(gridaction.values[0].value);
                break;
        }
    };
    ManageUserComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-user',
            templateUrl: './manage-user.component.html',
            styleUrls: ['./manage-user.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ManageUserComponent);
    return ManageUserComponent;
}());
exports.ManageUserComponent = ManageUserComponent;
//# sourceMappingURL=manage-user.component.js.map
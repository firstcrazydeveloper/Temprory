webpackJsonp(["user.module"],{

/***/ "./src/app/features/user-management/user/manage-user/manage-user.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/features/user-management/user/manage-user/manage-user.component.html":
/***/ (function(module, exports) {

module.exports = "<app-nav-menu></app-nav-menu>\r\n\r\n<div class='panel-body'>\r\n\r\n    <sortableDataGrid [columns]=\"columns\"\r\n                      [data]=\"users\"\r\n                      [gridbtns]=\"gridbtns\"\r\n                      [hdrbtns]=\"hdrbtns\"\r\n                      [sort]=\"sorting\"\r\n                      [isshowfilter]=false\r\n                      [isExporttoCSV]=false\r\n                      [exportFileName]=\"exportFileName\"\r\n                      [searchBoxCloseImgUrl]=\"closeImageurl\"\r\n                      [filter]=userfilter\r\n                      (btnclick)=\"gridaction($event)\">\r\n    </sortableDataGrid>\r\n\r\n    <div *ngIf=\"msg\" role=\"alert\" class=\"alert alert-info alert-dismissible\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n        <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\r\n        <span class=\"sr-only\">Error:</span>\r\n        {{msg}}\r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/features/user-management/user/manage-user/manage-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_config_enum__ = __webpack_require__("./src/app/shared/config/enum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
                action: __WEBPACK_IMPORTED_MODULE_1__shared_config_enum__["a" /* DBOperation */].create,
                ishide: this.isReadOnly
            }
        ];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['Id'],
                action: __WEBPACK_IMPORTED_MODULE_1__shared_config_enum__["a" /* DBOperation */].update,
                ishide: this.isReadOnly
            },
            {
                title: 'X',
                keys: ["Id"],
                action: __WEBPACK_IMPORTED_MODULE_1__shared_config_enum__["a" /* DBOperation */].delete,
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
            case __WEBPACK_IMPORTED_MODULE_1__shared_config_enum__["a" /* DBOperation */].create:
                this.addUser();
                break;
            case __WEBPACK_IMPORTED_MODULE_1__shared_config_enum__["a" /* DBOperation */].update:
                this.editUser(gridaction.values[0].value);
                break;
            case __WEBPACK_IMPORTED_MODULE_1__shared_config_enum__["a" /* DBOperation */].delete:
                this.deleteUser(gridaction.values[0].value);
                break;
        }
    };
    ManageUserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage-user',
            template: __webpack_require__("./src/app/features/user-management/user/manage-user/manage-user.component.html"),
            styles: [__webpack_require__("./src/app/features/user-management/user/manage-user/manage-user.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ManageUserComponent);
    return ManageUserComponent;
}());



/***/ }),

/***/ "./src/app/features/user-management/user/user-detail/user-detail.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/features/user-management/user/user-detail/user-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-nav-menu></app-nav-menu>\r\n<div class=\"container clearfix\" style=\"padding-top:20px;\">\t\r\n    <div class=\"contractFormTabs\">\r\n      <!-- Nav tabs -->\r\n      <ul class=\"nav nav-tabs\" role=\"tablist\">\r\n        <li role=\"presentation\" class=\"active\"><a href=\"#tab1\" aria-controls=\"tab1\" role=\"tab\" data-toggle=\"tab\">User Details</a></li>\r\n        <li role=\"presentation\"><a href=\"#tab2\" aria-controls=\"tab2\" role=\"tab\" data-toggle=\"tab\">Personal Details</a></li>\r\n      </ul>\r\n  \r\n      <!-- Tab panes -->\r\n      <div class=\"tab-content\">\r\n        \r\n        <div role=\"tabpanel\" class=\"tab-pane active\" id=\"tab1\">\r\n          <div class=\"pageHeading\">\r\n            PeopleSoft\r\n          </div><!--//pageHeading-->\r\n          \r\n          <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Domain</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <input type=\"text\" class=\"form-control\" value=\"\">\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Status</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <select class=\"form-control\"><option>Active</option></select>\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n                      <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Business Line</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <select class=\"form-control\"><option></option></select>\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Username</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <a href=\"javascript:void(0);\" class=\"addFldBtn\"><span class=\"glyphicon glyphicon-search\"></span></a>\r\n                    <input type=\"text\" class=\"form-control\" value=\"\">\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Employee Id</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <a href=\"javascript:void(0);\" class=\"addFldBtn\"><span class=\"glyphicon glyphicon-search\"></span></a>\r\n                    <input type=\"text\" class=\"form-control\" value=\"\">\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n                      <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Position</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\t\t\t\t\t\t\t\t\t\r\n                    <input type=\"text\" class=\"form-control\" value=\"\">\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          \r\n          <div class=\"pageHeading\">\r\n            Access\r\n          </div><!--//pageHeading-->\r\n          \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Team</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <a href=\"javascript:void(0);\" class=\"addFldBtn\"><span class=\"glyphicon glyphicon-plus\"></span></a>\r\n                    <select class=\"form-control\"><option>GWS</option></select>\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n            \r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Role</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <a href=\"javascript:void(0);\" class=\"addFldBtn\"><span class=\"glyphicon glyphicon-plus\"></span></a>\r\n                    <select class=\"form-control\"><option>Broker</option></select>\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          \r\n          <div class=\"pageHeading\">\r\n            Approver\r\n          </div><!--//pageHeading-->\r\n          \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Username</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <a href=\"javascript:void(0);\" class=\"addFldBtn\"><span class=\"glyphicon glyphicon-search\"></span></a>\r\n                    <input type=\"text\" class=\"form-control\">\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n            \r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Team</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\">\r\n                    <input type=\"text\" class=\"form-control\">\r\n                  </div><!--//col-sm-8-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          \r\n        </div><!--//tab1-->\r\n        \r\n        \r\n        <div role=\"tabpanel\" class=\"tab-pane\" id=\"tab2\">\t\t\t\t\t\t\r\n          <div class=\"pageHeading\">\r\n            Details\r\n          </div><!--//pageHeading-->\r\n          \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Prefix</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><select class=\"form-control\"><option>Mrs.</option><option>Mr.</option></select></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">First Name</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\t\r\n            \r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Last Name</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Email</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\t\r\n            \r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Mobile</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          <div class=\"pageHeading\">\r\n            Address\r\n          </div><!--//pageHeading-->\r\n          \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Country</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n            \r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">State</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><select class=\"form-control\"><option>Queensland</option></select></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Lot/Block No.</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n            \r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Street No.</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n                  \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Street Name</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n            \r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Street Type</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><select class=\"form-control\"><option>Lane</option></select></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          <div class=\"row\">\t\t\t\t\t\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">District/Suburb</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n            \r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">City/Town</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n          <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n              <div class=\"form-group\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-sm-4 textlabel\">Post Code</div><!--//col-sm-4-->\r\n                  <div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" value=\"\"></div><!--//col-sm-4-->\r\n                </div><!--//row-->\r\n              </div><!--//form-group-->\r\n            </div><!--//col-md-4-->\r\n          </div><!--//row-->\r\n          \r\n        </div><!--//tab2-->\r\n        \r\n        \r\n      </div><!--//tab-content-->\r\n  \r\n    </div><!--//contractFormTabs-->\r\n    \r\n    \r\n    <div class=\"clearfix text-right contractBtns\">\r\n      <input type=\"button\" class=\"btn btn-primary\" value=\"Save\">\r\n      <input type=\"button\" class=\"btn btn-primary\" value=\"Cancel\">\r\n    </div>\r\n    \r\n  </div>"

/***/ }),

/***/ "./src/app/features/user-management/user/user-detail/user-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserDetailComponent = /** @class */ (function () {
    function UserDetailComponent() {
    }
    UserDetailComponent.prototype.ngOnInit = function () {
    };
    UserDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user-detail',
            template: __webpack_require__("./src/app/features/user-management/user/user-detail/user-detail.component.html"),
            styles: [__webpack_require__("./src/app/features/user-management/user/user-detail/user-detail.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], UserDetailComponent);
    return UserDetailComponent;
}());



/***/ }),

/***/ "./src/app/features/user-management/user/user.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_user_manage_user_component__ = __webpack_require__("./src/app/features/user-management/user/manage-user/manage-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_detail_user_detail_component__ = __webpack_require__("./src/app/features/user-management/user/user-detail/user-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_routing__ = __webpack_require__("./src/app/features/user-management/user/user.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_service__ = __webpack_require__("./src/app/features/user-management/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_sortableDataGrid_sortableDataGrid_module__ = __webpack_require__("./src/app/shared/sortableDataGrid/sortableDataGrid.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__user_routing__["a" /* UserRouting */],
                __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_8__shared_sortableDataGrid_sortableDataGrid_module__["a" /* SortableDataGridModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__manage_user_manage_user_component__["a" /* ManageUserComponent */], __WEBPACK_IMPORTED_MODULE_3__user_detail_user_detail_component__["a" /* UserDetailComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__manage_user_manage_user_component__["a" /* ManageUserComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__user_service__["a" /* UserService */]]
        })
    ], UserModule);
    return UserModule;
}());



/***/ }),

/***/ "./src/app/features/user-management/user/user.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_detail_user_detail_component__ = __webpack_require__("./src/app/features/user-management/user/user-detail/user-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manage_user_manage_user_component__ = __webpack_require__("./src/app/features/user-management/user/manage-user/manage-user.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_3__manage_user_manage_user_component__["a" /* ManageUserComponent */]
    },
    {
        path: 'add-user',
        component: __WEBPACK_IMPORTED_MODULE_2__user_detail_user_detail_component__["a" /* UserDetailComponent */]
    },
    {
        path: 'user-detail/:id/:action',
        component: __WEBPACK_IMPORTED_MODULE_2__user_detail_user_detail_component__["a" /* UserDetailComponent */]
    }
];
var UserRouting = /** @class */ (function () {
    function UserRouting() {
    }
    UserRouting = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], UserRouting);
    return UserRouting;
}());



/***/ }),

/***/ "./src/app/features/user-management/user/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_http_service__ = __webpack_require__("./src/app/shared/services/http.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = /** @class */ (function () {
    function UserService(httpService) {
        this.httpService = httpService;
        this.pageSize = 25;
    }
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_http_service__["a" /* HttpService */]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/shared/config/enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBOperation; });
var DBOperation;
(function (DBOperation) {
    DBOperation[DBOperation["create"] = 1] = "create";
    DBOperation[DBOperation["update"] = 2] = "update";
    DBOperation[DBOperation["delete"] = 3] = "delete";
})(DBOperation || (DBOperation = {}));


/***/ })

});
//# sourceMappingURL=user.module.chunk.js.map
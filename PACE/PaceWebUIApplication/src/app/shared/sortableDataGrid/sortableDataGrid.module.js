"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var sortableDataGrid_component_1 = require("./components/sortableDataGrid.component");
var sortableDataGridSearch_component_1 = require("./components/sortableDataGridSearch.component");
var format_1 = require("./helper/format");
var orderby_1 = require("./helper/orderby");
var SortableDataGridModule = /** @class */ (function () {
    function SortableDataGridModule() {
    }
    SortableDataGridModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, forms_1.FormsModule],
            declarations: [sortableDataGrid_component_1.SortableDataGrid, sortableDataGridSearch_component_1.SortableDataGridSearchComponent, format_1.Format, orderby_1.OrderBy],
            exports: [sortableDataGrid_component_1.SortableDataGrid, sortableDataGridSearch_component_1.SortableDataGridSearchComponent, format_1.Format, orderby_1.OrderBy]
        })
    ], SortableDataGridModule);
    return SortableDataGridModule;
}());
exports.SortableDataGridModule = SortableDataGridModule;
//# sourceMappingURL=sortableDataGrid.module.js.map
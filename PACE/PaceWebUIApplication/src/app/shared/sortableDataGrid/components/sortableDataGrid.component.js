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
var sortableDataGrid_util_1 = require("../helper/sortableDataGrid.util");
var format_1 = require("../helper/format");
var SortableDataGrid = /** @class */ (function () {
    function SortableDataGrid() {
        //Output Variable
        this.btnclick = new core_1.EventEmitter();
        //Local Variable
        this.pdata = this.data;
        this.searchTitle = "Search:";
    }
    SortableDataGrid.prototype.ngOnChanges = function (changes) {
        if (JSON.stringify(changes).indexOf("data") != -1)
            this.pdata = this.data;
        this.criteriaChange(this.listFilter);
    };
    SortableDataGrid.prototype.selectedClass = function (columnName) {
        return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
    };
    SortableDataGrid.prototype.changeSorting = function (columnName) {
        var sort = this.sort;
        if (sort.column == columnName) {
            sort.descending = !sort.descending;
        }
        else {
            sort.column = columnName;
            sort.descending = false;
        }
    };
    SortableDataGrid.prototype.convertSorting = function () {
        return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    };
    SortableDataGrid.prototype.click = function (btn, row) {
        var keyds = {};
        keyds.action = btn.action;
        if (row != null) {
            keyds.values = [];
            btn.keys.forEach(function (key) {
                keyds.values.push({ key: key, value: row[key] });
            });
        }
        this.btnclick.emit(keyds);
    };
    SortableDataGrid.prototype.criteriaChange = function (value) {
        if (this.filter != null) {
            if (value != '[object Event]') {
                this.listFilter = value;
                this.pdata = this.filter.transform(this.data, this.listFilter);
            }
        }
    };
    SortableDataGrid.prototype.exporttoCSV = function () {
        var _this = this;
        var exprtcsv = [];
        JSON.parse(JSON.stringify(this.data)).forEach(function (x) {
            var obj = new Object();
            var frmt = new format_1.Format();
            for (var i = 0; i < _this.columns.length; i++) {
                var transfrmVal = frmt.transform(x[_this.columns[i].variable], _this.columns[i].filter);
                obj[_this.columns[i].display] = transfrmVal;
            }
            exprtcsv.push(obj);
        });
        sortableDataGrid_util_1.SortableDataGridUtil.downloadcsv(exprtcsv, this.exportFileName);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SortableDataGrid.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SortableDataGrid.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SortableDataGrid.prototype, "sort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SortableDataGrid.prototype, "gridbtns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SortableDataGrid.prototype, "hdrbtns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SortableDataGrid.prototype, "isshowfilter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SortableDataGrid.prototype, "isExporttoCSV", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortableDataGrid.prototype, "exportFileName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SortableDataGrid.prototype, "filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortableDataGrid.prototype, "searchBoxCloseImgUrl", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SortableDataGrid.prototype, "btnclick", void 0);
    SortableDataGrid = __decorate([
        core_1.Component({
            selector: 'sortableDataGrid',
            styleUrls: ['./sortableDataGrid.component.css'],
            templateUrl: './sortableDataGrid.component.html'
        })
    ], SortableDataGrid);
    return SortableDataGrid;
}());
exports.SortableDataGrid = SortableDataGrid;
//# sourceMappingURL=sortableDataGrid.component.js.map
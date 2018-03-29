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
var SortableDataGridSearchComponent = /** @class */ (function () {
    function SortableDataGridSearchComponent() {
        this.change = new core_1.EventEmitter();
    }
    SortableDataGridSearchComponent.prototype.ngOnChanges = function (changes) {
    };
    SortableDataGridSearchComponent.prototype.getEachChar = function (value) {
        this.change.emit(value);
        if (this.listFilter === undefined || this.listFilter === null || this.listFilter.length === 0) {
            this.clearFilter();
        }
    };
    SortableDataGridSearchComponent.prototype.clearFilter = function () {
        this.listFilter = null;
        this.change.emit(null);
    };
    SortableDataGridSearchComponent.prototype.getPasteData = function (value) {
        var pastedVal = value.clipboardData.getData('text/plain');
        this.change.emit(pastedVal);
        value.preventDefault();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortableDataGridSearchComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortableDataGridSearchComponent.prototype, "searchBoxCloseImgUrl", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SortableDataGridSearchComponent.prototype, "change", void 0);
    SortableDataGridSearchComponent = __decorate([
        core_1.Component({
            selector: 'sortableDataGridSearchList',
            styleUrls: ['./sortableDataGridSearch.component.css'],
            templateUrl: './sortableDataGridSearch.component.html'
        })
    ], SortableDataGridSearchComponent);
    return SortableDataGridSearchComponent;
}());
exports.SortableDataGridSearchComponent = SortableDataGridSearchComponent;
//# sourceMappingURL=sortableDataGridSearch.component.js.map
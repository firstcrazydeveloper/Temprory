import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SortableDataGrid } from './components/sortableDataGrid.component';
import { SortableDataGridSearchComponent } from './components/sortableDataGridSearch.component';
import { SortableDataGridUtil } from './helper/sortableDataGrid.util';
import { Format } from './helper/format';
import { OrderBy } from './helper/orderby';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    declarations: [SortableDataGrid, SortableDataGridSearchComponent, Format, OrderBy],
    exports: [SortableDataGrid, SortableDataGridSearchComponent, Format, OrderBy]

})
export class SortableDataGridModule { }
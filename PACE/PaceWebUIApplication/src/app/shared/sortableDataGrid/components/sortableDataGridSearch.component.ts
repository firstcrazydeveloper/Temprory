import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
    selector: 'sortableDataGridSearchList',
    styleUrls: ['./sortableDataGridSearch.component.css'],
    templateUrl: './sortableDataGridSearch.component.html'
})

export class SortableDataGridSearchComponent {

    listFilter: string;
    @Input() title: string;
    @Input() searchBoxCloseImgUrl: string;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(changes: SimpleChanges) {
    }
    getEachChar(value: any) {
        this.change.emit(value);
        if (this.listFilter === undefined || this.listFilter === null || this.listFilter.length === 0) {
            this.clearFilter();
        }
    }

    clearFilter() {
        this.listFilter = null;
        this.change.emit(null);
    }

    getPasteData(value: any) {
        let pastedVal = value.clipboardData.getData('text/plain');
        this.change.emit(pastedVal);
        value.preventDefault();
    }
}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'USER', name: 'user' },
    {
      title: 'Team',
      name: 'team',
      className: ['office-header', 'text-success'],
      sort: 'asc'
    },
    {
      title: 'Role',
      name: 'role',
      className: ['office-header', 'text-success'],
      sort: 'asc'
    },
    {
      title: 'Status',
      name: 'status',
      className: ['text-warning'],
      sort: 'asc'
    },
    {
      title: 'Actions',
      name: 'actions',
      className: ['office-header', 'text-success'],
      sort: 'asc'
    },

  ];
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    sorting: { columns: this.columns },
    className: ['table-striped', 'table-bordered']
  };

  private data: Array<any> = [{ 'user': 'jack1', 'team': 'gws1', 'role': 'broker1', 'status': 'active' },
  { 'user': 'jack2', 'team': 'gws2', 'role': 'broker2', 'status': 'active' },
  { 'user': 'jack3', 'team': 'gws3', 'role': 'broker3', 'status': 'inactive' },
  { 'user': 'jack4', 'team': 'gws4', 'role': 'broker4', 'status': 'inactive' }];

  public constructor() {
    this.length = this.data.length;
  }


  public ngOnInit(): void {
    this.onChangeTable(this.config);
  }


  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }
    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      debugger;
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }


  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    const sortedData = this.changeSort(this.data, this.config);
    this.rows = sortedData;
    this.length = sortedData.length;
  }

  public getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }


}

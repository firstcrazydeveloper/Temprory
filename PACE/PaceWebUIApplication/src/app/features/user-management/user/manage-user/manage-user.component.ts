import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/models/user';
import { DBOperation } from '../../../../shared/config/enum';

@Component({
    selector: 'app-manage-user',
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

    users: any = [];
    user: IUser;
    msg: string;
    dbops: DBOperation;
    isReadOnly: boolean = false;

    dummyUsers = [{ "Id": 33, "FirstName": "Yaseer", "LastName": "Mumtaz", "Gender": "Male", "Email": "contact@fullstackcircle.com", "DOB": "1985-02-08T06:00:00", "City": "Fairfax", "State": "Virginia", "Zip": "22033", "Country": "USA" }, { "Id": 34, "FirstName": "John", "LastName": "Doe", "Gender": "Male", "Email": "jdoe@testmail.com", "DOB": "1950-01-01T06:00:00", "City": "Reston", "State": "Virginia", "Zip": "20007", "Country": "USA" }, { "Id": 35, "FirstName": "Chris", "LastName": "Walton", "Gender": "Male", "Email": "cwalton@nodb.com", "DOB": "1964-07-03T05:00:00", "City": "Edgewood", "State": "New York", "Zip": "11801", "Country": "USA" }];

    //Grid Vars start
    columns: any[] = [
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

    sorting: any = {
        column: 'FirstName',
        descending: false
    };

    hdrbtns: any[] = [];
    gridbtns: any[] = [];
    initGridButton() {

        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: DBOperation.create,
                ishide: this.isReadOnly

            }];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['Id'],
                action: DBOperation.update,
                ishide: this.isReadOnly
            },
            {
                title: 'X',
                keys: ["Id"],
                action: DBOperation.delete,
                ishide: this.isReadOnly
            }

        ];

    }
    //Grid Vars end

    constructor() { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.users = this.dummyUsers;
        this.initGridButton();

    }
    addUser() {

    }
    editUser(id: number) {

    }
    deleteUser(id: number) {

    }

    gridaction(gridaction: any): void {

        switch (gridaction.action) {
            case DBOperation.create:
                this.addUser();
                break;
            case DBOperation.update:
                this.editUser(gridaction.values[0].value);
                break;
            case DBOperation.delete:
                this.deleteUser(gridaction.values[0].value);
                break;
        }
    }

}

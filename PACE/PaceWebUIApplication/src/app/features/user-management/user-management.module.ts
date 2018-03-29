import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { userManagementRounting } from './user-management.routing'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,       
        userManagementRounting

    ],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class UerManagementModule { }

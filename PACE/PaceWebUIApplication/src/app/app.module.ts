import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppRounting } from './app.routing';
import { LoggerService } from './shared/services/logger.service';
import { HttpService } from './shared/services/http.service';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { UerManagementModule } from '../app/features/user-management/user-management.module';
import { SortableDataGridModule } from './shared/sortableDataGrid/sortableDataGrid.module';


@NgModule({
    declarations: [
        AppComponent, LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        UerManagementModule,
        SortableDataGridModule,
        AppRounting
    ],
    providers: [LoggerService, HttpService],
    bootstrap: [AppComponent]
})
export class AppModule { }

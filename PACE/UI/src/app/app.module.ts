import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoggingService } from '../app/shared/services/logging.service';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../app/shared/services/http.service';
import { RolesModule } from '../app/features/role/roles.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { TeamModule } from './features/team/team.module';
import { UserModule } from './features/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RolesModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TeamModule,
    UserModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoggingService, HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

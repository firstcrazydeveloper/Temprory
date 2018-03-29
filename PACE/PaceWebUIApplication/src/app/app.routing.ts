import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent }
];

export const AppRounting: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });



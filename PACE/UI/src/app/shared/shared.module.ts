import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastModule } from 'ng2-toastr';
import { Ng2TableModule } from 'ng2-table/ng2-table';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    Ng2TableModule
  ],
  declarations: [AppHeaderComponent, AppFooterComponent, NavMenuComponent, PaginationComponent],
  exports: [AppHeaderComponent, AppFooterComponent, NavMenuComponent, PaginationComponent,
    Ng4LoadingSpinnerModule, Ng2TableModule]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRouting } from './user.routing';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { SortableDataGridModule } from '../../../shared/sortableDataGrid/sortableDataGrid.module';


@NgModule({
  imports: [
    CommonModule,
    UserRouting,
      SharedModule, FormsModule, SortableDataGridModule
  ],
  declarations: [ ManageUserComponent, UserDetailComponent],
  bootstrap : [ManageUserComponent],
  providers : [UserService]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,FormsModule,Ng2AutoCompleteModule,
  ],
  declarations: [ ManageUserComponent, UserDetailComponent],
  bootstrap : [ManageUserComponent],
  providers : [UserService]
})
export class UserModule { }

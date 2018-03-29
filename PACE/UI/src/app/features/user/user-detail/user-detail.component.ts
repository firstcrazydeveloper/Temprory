import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoggingService } from '../../../shared/services/logging.service';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Team } from '../../../models/team';
import { UserService } from '../user.service'
import { BrowserModule } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';
import { User } from '../../../models/user';
import { UserPersonalDetail } from '../../../models/user.personal.detail';
import { UserTeam } from '../../../models/user.team';
import { UserRole } from '../../../models/user.role';
import { UserApprover } from '../../../models/user.approver';
import { Suburb } from '../../../models/suburb';
import { Address } from '../../../models/address';
import { UserAddress } from '../../../models/user.address';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: number;
  disabled: boolean;
  user: User;
  userPersonalDetail: UserPersonalDetail;
  userTeam: UserTeam;
  userRole: UserRole;
  userAddres: UserAddress;
  userApprover: UserApprover;
  suburb: Suburb;
  address: Address;
  businessLines: any;
  teams: any;
  roles: any;
  streetTypes: any;
  countries:any;
  stateTypes: any;
  existingEmployeeUserName: any=[];
  existingEmployeeIds: any=[];
  employees:any;
  constructor(private loggingService: LoggingService, private activatedRoute: ActivatedRoute,
    private userService: UserService, private router: Router,private spinnerService: Ng4LoadingSpinnerService, private _toaster: ToastsManager,private _vcr: ViewContainerRef,
    private _location: Location) {
    this.loggingService.logInformation('Constructor called');
    this.activatedRoute.params.subscribe(params => this.loggingService.logInformation(params.name));
    this.user = new User();
    this.suburb = new Suburb();
    this.address = new Address();
    this.userAddres = new UserAddress();
    this.userPersonalDetail = new UserPersonalDetail();
    this.userTeam = new UserTeam();
    this.userRole = new UserRole();
    this.userApprover = new UserApprover();
    this._toaster.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {

    this.userId = this.activatedRoute.snapshot.params['id'];
    this.disabled = this.activatedRoute.snapshot.params['action'] === 'edit' ? false : true;
    this.spinnerService.show();
    this.getBusinessLines();
    this.getActiveRoles();
    this.getActiveTeams();
    this.getStateTypes();
    this.getStreetTypes();
    this.getEmployees();
    this.getCountries();
    this.spinnerService.hide();
    if (this.userId) {
      this.getUserById(this.userId);

    } else {
      this.disabled = false;
    }
  }
  getBusinessLines() {
    return this.userService.getBusinessLines().subscribe(
      (response => {
        console.log(response);
        this.businessLines = response;
      }),
      (error => { console.log(error); })
    );
  }

  getStreetTypes() {
    return this.userService.getStreetTypes().subscribe(
      (response => {
        console.log(response);
        this.streetTypes = response;
      }),
      (error => { console.log(error); })
    );
  }

  getStateTypes() {
    return this.userService.getStateTypes().subscribe(
      (response => {
        console.log(response);
        this.stateTypes = response;
      }),
      (error => { console.log(error); })
    );
  }

  getCountries() {
    return this.userService.getCountries().subscribe(
      (response => {
        console.log(response);
        this.countries = response;
      }),
      (error => { console.log(error); })
    );
  }

  businessLineSelected($event) {
    this.user.businessLineId = $event.currentTarget.value;

  }

  onUserNameSelect(userName?:string){
    debugger;
    var employee=[];   
     employee=this.employees.filter(item => (item.username ==userName || item.employeeId ==userName));
    
    
    if(employee.length==1){
    this.user.employeeId=employee[0].employeeId;
    this.user.domain=employee[0].domainName;
    this.userPersonalDetail.firstName=employee[0].givenName;
    this.userPersonalDetail.lastName=employee[0].surname;
    this.userPersonalDetail.email=employee[0].email;
    this.userPersonalDetail.mobile=employee[0].mobile;
    }
    
  }
  getActiveRoles() {
    return this.userService.getActiveRoles().subscribe(
      (response => {
        console.log(response);
        this.roles = response;
      }),
      (error => { console.log(error); })
    );
  }

  getActiveTeams() {
    return this.userService.getActiveTeams().subscribe(
      (response => {
        console.log(response);
        this.teams = response;
      }),
      (error => { console.log(error); })
    );
  }

  getEmployees() {
    return this.userService.getEmployees().subscribe(
      (response => {
        console.log(response);
       
        if (response.length > 0) {
          this.employees=response;
          response.forEach(data => {
            this.existingEmployeeUserName.push(data.username);
            this.existingEmployeeIds.push(data.employeeId);
          });
        }

      }),
      (error => { console.log(error); })
    );
  }
  onCancelClicked() {
    this.router.navigateByUrl('/users');
  }

  onSubmit(form: NgForm) {
    this.user.peopleSoftId = this.user.employeeId;

    this.userService.saveUser(this.user).subscribe(
      (response) => {
        this.user = response;
        this.userPersonalDetail.userId = this.userRole.userId = this.userTeam.userId = this.user.id;

        this.userService.saveUserPersonalDetail(this.userPersonalDetail).subscribe(
          (res) => {
            console.log(res);
            // res.statusCode === 200 ? this.router.navigateByUrl('/roles') : this.router.navigateByUrl('/error');
            this.userService.saveUserTeam(this.userTeam).subscribe(
              (res) => {
                console.log(res);
                this.userService.saveUserRole(this.userRole).subscribe(
                  (res) => {
                    console.log(res);
                    this.saveAddressOfUser(this.user.id);
                  },
                  (error) => { console.log(error); }
                );
                // res.statusCode === 200 ? this.router.navigateByUrl('/roles') : this.router.navigateByUrl('/error');
              },
              (error) => { console.log(error); }
            );


          },
          (error) => { console.log(error); }
        );


        console.log(this.user);
      },
      (error) => { console.log(error); }
    );
  }

  saveAddressOfUser(userId) {
    this.suburb.district = this.suburb.city;
    this.userService.saveSuburb(this.suburb).subscribe(
      (response) => {
        this.suburb = response;
        this.address.suburbId = this.suburb.id;
        this.address.addressTypeId = 1;// divya to fix         

        this.userService.saveAddress(this.address).subscribe(
          (res) => {
            this.address = res;
            this.userAddres.userId = userId;
            this.userAddres.addressId = this.address.id;
            console.log(res);

            this.userService.saveUserAddress(this.userAddres).subscribe(
              (res) => {
                console.log(res);

              },
              (error) => { console.log(error); }
            );

          },
          (error) => { console.log(error); }
        );

        console.log(this.user);
      },
      (error) => { console.log(error); }
    );

  }
  getUserById(userId) {
    this.loggingService.logInformation('GetUser Method of UserDetail');
    this.userService.getUserById(userId).subscribe(
      (response) => {
        console.log(response);
        this.user = response;
      },
      (error) => console.log(error));
  }

}

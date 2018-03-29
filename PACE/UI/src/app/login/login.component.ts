import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    
  }

  onLoggedIn() {
    // this.spinnerService.show();
    // setTimeout(function () {
    //   this.spinnerService.hide();
    // }, 1000);
    this.router.navigateByUrl('/roles');
  }

}

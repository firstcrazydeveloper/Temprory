import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private _router: Router) { }
  header: string;
  testObject = [
    { 'text': 'new role', 'path': '/add-role' },
    { 'text': 'roles', 'path': '/roles' },
    { 'text': 'teams', 'path': '/teams' },
    { 'text': 'users', 'path': '/users' },
  ];

  ngOnInit() {
    this.changeNavigationMenu(this._router.url);
  }

  changeNavigationMenu(url: string) {
    if (url === '/roles') {
      this.header = 'Security - Roles';
    } else if (url === '/teams' || url === '/team-detail/') {
      this.header = 'Security - Teams';
      this.testObject = [
        { 'text': 'new team', 'path': '/add-team' },
        { 'text': 'roles', 'path': '/roles' },
        { 'text': 'teams', 'path': '/teams' },
        { 'text': 'users', 'path': '/users' },
      ];
    }
    else if (url === '/users' || url === '/user-detail/') {
      this.header = 'Security - Users';
      this.testObject = [
        { 'text': 'new user', 'path': '/add-user' },
        { 'text': 'roles', 'path': '/roles' },
        { 'text': 'teams', 'path': '/teams' },
        { 'text': 'users', 'path': '/users' },
      ];
    }
  }


}

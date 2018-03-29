import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    template: `
        <div class="container">
            <h1>Angular 2 & TypeScript web application</h1>
            <h2>Made with ASP.NET Core and Visual Studio 2017</h2>
            <nav>
                <a routerLink="home" routerLinkActive="active">Home</a>
                <a routerLink="about">About</a>
            </nav>
            <router-outlet></router-outlet>
        </div>
    `,
    providers: []
})
export class AppComponent implements OnInit {

    constructor(private _httpService: Http) {
        console.log('AppComponent -> constructor');
    }

    apiValues : string[] = [];

    ngOnInit() {
        console.log('AppComponent -> ngOnInit');

        this._httpService.get('/api/values').subscribe(values => { this.apiValues = values.json() as string[] });
    }
}
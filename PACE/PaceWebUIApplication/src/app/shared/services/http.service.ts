import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';
import { LoggerService } from './logger.service';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient, private loggingService: LoggerService
  ) { }

  private formatErrors(error: any) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': 'CorsPolicy'
      })
    };
    return this.http.get(`${environment.apiUrl}${path}`, httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': 'CorsPolicy'
      })
    };
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body), httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': 'CorsPolicy'
      })
    };
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body), httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': 'CorsPolicy'
      })
    };

    return this.http.delete(
      `${environment.apiUrl}${path}`, httpOptions
    ).pipe(catchError(this.formatErrors));
  }
}

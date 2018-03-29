"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var http_1 = require("@angular/common/http");
var ErrorObservable_1 = require("rxjs/observable/ErrorObservable");
var catchError_1 = require("rxjs/operators/catchError");
var logger_service_1 = require("./logger.service");
var HttpService = /** @class */ (function () {
    function HttpService(http, loggingService) {
        this.http = http;
        this.loggingService = loggingService;
    }
    HttpService.prototype.formatErrors = function (error) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        }
        else {
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        return new ErrorObservable_1.ErrorObservable('Something bad happened; please try again later.');
    };
    HttpService.prototype.get = function (path, params) {
        if (params === void 0) { params = new http_1.HttpParams(); }
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token',
                'Access-Control-Allow-Origin': 'CorsPolicy'
            })
        };
        return this.http.get("" + environment_1.environment.apiUrl + path, httpOptions)
            .pipe(catchError_1.catchError(this.formatErrors));
    };
    HttpService.prototype.put = function (path, body) {
        if (body === void 0) { body = {}; }
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token',
                'Access-Control-Allow-Origin': 'CorsPolicy'
            })
        };
        return this.http.put("" + environment_1.environment.apiUrl + path, JSON.stringify(body), httpOptions).pipe(catchError_1.catchError(this.formatErrors));
    };
    HttpService.prototype.post = function (path, body) {
        if (body === void 0) { body = {}; }
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token',
                'Access-Control-Allow-Origin': 'CorsPolicy'
            })
        };
        return this.http.post("" + environment_1.environment.apiUrl + path, JSON.stringify(body), httpOptions).pipe(catchError_1.catchError(this.formatErrors));
    };
    HttpService.prototype.delete = function (path) {
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token',
                'Access-Control-Allow-Origin': 'CorsPolicy'
            })
        };
        return this.http.delete("" + environment_1.environment.apiUrl + path, httpOptions).pipe(catchError_1.catchError(this.formatErrors));
    };
    HttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, logger_service_1.LoggerService])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map
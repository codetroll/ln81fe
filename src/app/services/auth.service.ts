import { LogoutResponse } from './../models/logoutresponse';
import { LoginResponse } from './../models/loginresponse';
import { LoginRequest } from '../models/loginrequest';

import { Injectable } from '@angular/core';
import { BackendUrls, BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as moment from 'moment';


@Injectable({
    providedIn: 'root'
})

export class AuthService extends BaseService {

    constructor(protected router: Router, protected httpClient: HttpClient) {
        super(router, httpClient);
    }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        console.log('==>> AuthService.login()');
        console.log('==>> loginRequest : ' + loginRequest);
        const URL = BackendUrls.LOGIN_URL;
        console.log('==>> Calling : ' + URL);
        return this.httpClient.post<LoginResponse>(URL, loginRequest).pipe(
            tap((response: LoginResponse) => {
                if (response) {
                    this.setSession(response);
                }
            }));
        // .pipe(catchError(err => console.log(err)));
    }

    logout(): Observable<LogoutResponse> {
        return this.httpClient.post<LogoutResponse>(BackendUrls.PROD_URL + BackendUrls.LOGOUT_URL, {}).pipe(
            tap((response: LogoutResponse) => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires_at');
            }
        ));
            // .pipe(catchError(err => this.errorHandler.handleError(err, false)));
    }

    private setSession(loginResponse: LoginResponse): void {
        const expiresAt = moment().add(loginResponse.expires_in, 'second');

        localStorage.setItem('access_token', loginResponse.access_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    public isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    getExpiration() {
        // let expiration = (localStorage.getItem('expires_at') === null) ? localStorage.getItem('expires_at') : '0';
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return moment(expiresAt);
    }
}

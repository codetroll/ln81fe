import { LoginResponse } from './../models/loginresponse';
import { LoginRequest } from '../models/loginrequest';
import { LogoutResponse } from '../models/logoutresponse';

import { Injectable } from '@angular/core';
import { BackenUrls, BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
        const URL = BackenUrls.PROD_URL + BackenUrls.LOGIN_URL;
        console.log('==>> Calling : ' + URL);
        return this.httpClient.post<LoginResponse>(URL, loginRequest);
        // .pipe(res => this.setSession(loginResponse));
        // .pipe(catchError(err => console.log(err)));
    }

    logout(): Observable<LogoutResponse> {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        return this.httpClient.post<LogoutResponse>(BackenUrls.LOGOUT_URL, {});
            // .pipe(catchError(err => this.errorHandler.handleError(err, false)));
    }

    private setSession(loginResponse: LoginResponse) {
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

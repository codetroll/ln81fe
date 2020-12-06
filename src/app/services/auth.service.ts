import { User } from './../models/user';
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
        return this.httpClient.post<LogoutResponse>(BackendUrls.LOGOUT_URL, {}).pipe(
            tap((response: LogoutResponse) => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires_at');
                localStorage.removeItem('groups');
            }
        ));
            // .pipe(catchError(err => this.errorHandler.handleError(err, false)));
    }

    getCurrentUser(): Observable<User> {
        return this.httpClient.post<User>(BackendUrls.USER_URL, {}).pipe(
            tap((response: User) => {
                console.log(response);
            }
        ));
    }

    private setSession(loginResponse: LoginResponse): void {
        const expiresAt = moment().add(loginResponse.expires_in, 'second');
        localStorage.setItem('groups', loginResponse.payload.toString());
        localStorage.setItem('access_token', loginResponse.access_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    public isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    getGroups(): string[] {
      return (localStorage.getItem('groups') || '').split(',') || [];
    }

    getExpiration(): moment.Moment {
        // let expiration = (localStorage.getItem('expires_at') === null) ? localStorage.getItem('expires_at') : '0';
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return moment(expiresAt);
    }
}

import { SessionService } from './session.service';
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
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
export const TOKEN_NAME = 'lef_access_token';

@Injectable({
    providedIn: 'root'
})

export class AuthService extends BaseService {

    // tslint:disable-next-line: max-line-length
    constructor(protected router: Router, protected httpClient: HttpClient, private cookieService: CookieService, private sessionService: SessionService) {
        super(router, httpClient);
    }

    getToken(): string {
        return this.cookieService.get(TOKEN_NAME);
    }

    setToken(token: string): void {
        this.cookieService.set(TOKEN_NAME, token);
    }

    getTokenExpirationDate(token: string): Date {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        const expirationDate = helper.getTokenExpirationDate(token);
        const isExpired = helper.isTokenExpired(token);

        // const decoded = jwt_decode(token);
        // console.log('token expiry : ', expirationDate);

        if (expirationDate === undefined) {
            return null;
        }
        return expirationDate;
      }

      isTokenExpired(token?: string): boolean {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
      }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        // console.log('==>> AuthService.login()');
        // console.log('==>> loginRequest : ' + loginRequest);
        const URL = BackendUrls.LOGIN_URL;
        // console.log('==>> Calling : ' + URL);
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
                this.clearSession();
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

    private clearSession(): void {
        this.cookieService.delete('lef_access_token');
        this.cookieService.delete('lef_groups');
        this.sessionService.clearSession();
    }

    private setSession(loginResponse: LoginResponse): void {
        const expiresAt = moment().add(loginResponse.expires_in, 'second');
        this.cookieService.set('lef_access_token', loginResponse.access_token);
        this.cookieService.set('lef_groups', loginResponse.payload.toString());
        this.sessionService.setGroups(loginResponse.payload);
        this.sessionService.setUser(loginResponse.user);
    }

    public isLoggedIn(): boolean {
        return (this.isTokenExpired()) ? false : true;
    }

    isLoggedOut(): boolean {
        return (this.isTokenExpired()) ? true : false;
    }

    getGroups(): string[] {
        const grouplist = (this.cookieService.get('lef_groups') || '').split(',') || [];
        console.log('getGroups : ', grouplist);
        return grouplist;
    }
}

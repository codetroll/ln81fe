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

export class SessionService extends BaseService {
    user: User;

    constructor(protected router: Router, protected httpClient: HttpClient) {
        super(router, httpClient);
    }

    setUser(user: User): void { this.user = user; }
    getUser(): User { return this.user; }
    getUserName() {
        console.log('Username : ', this.user.name);
        return (this.user.name) ? this.user.name : '';
    }
}

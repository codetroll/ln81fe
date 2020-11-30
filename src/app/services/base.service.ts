import { Injectable, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

export enum BackendUrls {

    PROD_URL = 'http://api.lefnet.dk/',

    // Login
    LOGIN_URL = 'api/auth/login',
    LOGOUT_URL = 'api/auth/logout',

    REGLER_URL = 'api/rules/',
}

@Injectable({
    providedIn: 'root'
})
export class BaseService implements OnDestroy {

    // protected errorHandler: ErrorUtil;
    protected subscriptions: Subscription[] = [];

    constructor(protected router: Router, protected httpClient: HttpClient) {
        // Skal vi have errorhandling?
        // this.errorHandler = new ErrorUtil(router, tssService);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    convertObjectToBase64(object: any): string {
        return  btoa(encodeURIComponent(JSON.stringify(object)));
    }

}

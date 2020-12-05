import { Version } from './../models/version';

import { Injectable } from '@angular/core';
import { BaseService, BackendUrls } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class RuleService extends BaseService {

    constructor(protected router: Router, protected httpClient: HttpClient) {
        super(router, httpClient);
    }

    hentRegler(): Observable<Version> {
        console.log('==>> RuleService.hentRegler()');
        const URL = BackendUrls.REGLER_URL;
        console.log('==>> Calling : ' + URL);
        return this.httpClient.get<Version>(URL);
        // .pipe(
        //     tap((response: LoginResponse) => {
        //         if (response) {
        //             this.setSession(response);
        //         }
        //     })
        //     );
        // .pipe(catchError(err => console.log(err)));
    }

    // hentStamdata(type: StamdataType): Observable<StamdataModel> {
    //     return this.httpClient.get<StamdataModel>(BackenUrls.REGLER_URL)
    //         .pipe(catchError(err => this.errorHandler.handleError(err, false)));
    // }

}

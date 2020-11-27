import { Injectable } from '@angular/core';
import { BackenUrls, BaseService } from "./base.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})

export class RuleService extends BaseService {

    constructor(protected router: Router, protected httpClient: HttpClient) {
        super(router, httpClient);
    }

    hentStamdata(type: StamdataType): Observable<StamdataModel> {
        return this.httpClient.get<StamdataModel>(BackenUrls.REGLER_URL)
            .pipe(catchError(err => this.errorHandler.handleError(err, false)));
    }

}

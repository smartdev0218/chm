import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const baseUrl = 'alerts';

@Injectable()
export class DashboardAlertsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) { super(); }

    getAlerts() {
        const siteUrl = this.store.getSitesUrl();
        console.log('alerts.url => ' + `${siteUrl}${baseUrl}`);
        return <Observable<any>>this.http
            .get(`${siteUrl}${baseUrl}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

}

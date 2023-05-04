import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const baseUrl = 'channels-status';

@Injectable()
export class DashboardStatusService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) { super(); }

    getChannels() {
        const siteUrl = this.store.getSitesUrl();
        console.log('channels-status.url => ' + `${siteUrl}${baseUrl}`);
        return <Observable<any>>this.http
            .get(`${siteUrl}${baseUrl}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getChannelHistory(idChannel: number) {
        const siteUrl = this.store.getSitesUrl();
        console.log('channels-status.url => ' + `${siteUrl}channels/${idChannel}/status`);
        return <Observable<any>>this.http
            .get(`${siteUrl}channels/${idChannel}/status`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

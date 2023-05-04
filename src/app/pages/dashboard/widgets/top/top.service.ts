import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';

import { TopConfig, Interval } from './top.models';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const baseUrl = 'config';
const topSells = 'top-sells';

@Injectable()
export class DashboardTopService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) { super(); }

    getTopConfig() {
        const siteUrl = this.store.getSitesUrl();
        console.log('top-sells-config.url => ' + `${siteUrl}${baseUrl}?params=TOP_CHANNELS_TIPO_INTERVALO`);
        return <Observable<any>>this.http
            .get(`${siteUrl}${baseUrl}?params=TOP_CHANNELS_TIPO_INTERVALO`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    setTopConfig(intervalId: any) {
        const body = JSON.stringify([{ key: 'TOP_CHANNELS_TIPO_INTERVALO', value: intervalId }]);
        const siteUrl = this.store.getSitesUrl();
        return <Observable<any>>this.http
            .put(`${siteUrl}${baseUrl}`, body)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getTopSells() {
        const siteUrl = this.store.getSitesUrl();
        console.log('top-sells.url => ' + `${siteUrl}${topSells}`);
        return <Observable<any>>this.http
            .get(`${siteUrl}${topSells}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

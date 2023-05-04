import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { StoreService } from './store.service';
import { ChmHttp } from './chm-http.model';
import { ApiConfig as AC } from '../api-config';
import { AuthHttp } from 'angular2-jwt';

const channelsUrl = 'api/channels';
const descriptionsUrl = 'api/descriptions';
const titlesUrl = 'api/titles';
const paymethodsUrl = 'api/paymethods';
const pubmodeUrl = 'api/pubmode';
const pricemodifiersUrl = 'api/pricemodifiers';
const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';
const langUrl = (isDevMode()) ? '/chm/backend/login/language' : '/chm/login/language';

@Injectable()
export class HermesService extends ChmHttp {
    constructor(
        private http: AuthHttp, private store: StoreService) { super(); }

    getSites() {
        return <Observable<any>>this.http
            .get(AC.sites)
            .map(res => this.extractData<Object[]>(res));
    }

    getLang() {
        return this.http
            .get(langUrl)
            .map(res => res.text());
    }

    getChannels() {
        return <Observable<any>>this.http
            .get(this.store.getSitesUrl() + AC.channels)
            .map(res => this.extractData<Object[]>(res));
    }

    getDescriptions() {
        return <Observable<any>>this.http
            .get(descriptionsUrl)
            .map(res => this.extractData<Object[]>(res));
    }

    getTitles() {
        return <Observable<any>>this.http
            .get(titlesUrl)
            .map(res => this.extractData<Object[]>(res));
    }

    getPayMethods() {
        return <Observable<any>>this.http
            .get(paymethodsUrl)
            .map(res => this.extractData<Object[]>(res));
    }

    getPubMode() {
        return <Observable<any>>this.http
            .get(pubmodeUrl)
            .map(res => this.extractData<Object[]>(res));
    }

    getPriceModifiers() {
        return <Observable<any>>this.http
            .get(pricemodifiersUrl)
            .map(res => this.extractData<Object[]>(res));
    }

    getInventoryFields() {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/inventory-fields`)
            .map(res => this.extractData<Object[]>(res));
    }

    getFilterOps() {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/filter-operators`)
            .map(res => this.extractData<Object[]>(res));
    }

    getIntervals() {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/intervals`)
            .map(res => this.extractData<Object[]>(res));
    }
}

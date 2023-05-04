import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class BrandsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) {
        super();
    }

    // GET /sites/{idSite}/channels
    getChannels() {
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}channels`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /channels
    getAllChannels() {
        return <Observable<any>>this.http
            .get(`${this.store.getChmUrl()}channels`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /chm/constants/brands/hermes
    getHermesBrands() {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/brands/hermes`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /chm/constants/brands/channel/{idChannel}
    getBrandsByChannel(idChannel) {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/brands/channel/${idChannel}`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /chm/brand-mappings-for-channel/{idChannel}
    getMappingBrandsByChannel(idChannel) {
        return <Observable<any>>this.http
            .get(`${this.store.getChmUrl()}brand-mappings-for-channel/${idChannel}`)
            .map(res => this.extractData<Object[]>(res));
    }

    // POST /chm/brand-mappings-for-channel/{idChannel}?hermes-brand-id=XXX&channel-brand-id=YYY
    addBrandMapping(idChannel, idHermesBrand, idChannelBrand) {
        return <Observable<any>>this.http
            .post(`${this.store.getChmUrl()}brand-mappings-for-channel/${idChannel}?hermes-brand-id=${idHermesBrand}&channel-brand-id=${idChannelBrand}`, null)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // DELETE /chm/brand-mappings-for-channel/{idChannel}?hermes-brand-id=XXX&channel-brand-id=YYY
    deleteBrandMapping(idChannel, idHermesBrand, idChannelBrand) {
        return <Observable<any>>this.http
            .delete(`${this.store.getChmUrl()}brand-mappings-for-channel/${idChannel}?hermes-brand-id=${idHermesBrand}&channel-brand-id=${idChannelBrand}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

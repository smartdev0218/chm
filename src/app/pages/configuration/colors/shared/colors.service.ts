import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class ColorsService extends ChmHttp {

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

    // GET /chm/constants/colors/Hermes
    getHermesColors() {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/colors/hermes`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /chm/constants/colors/channel/{idChannel}
    getColorsByChannel(idChannel) {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/colors/channel/${idChannel}`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /chm/color-mappings-for-channel/{idChannel}
    getMappingColorsByChannel(idChannel) {
        return <Observable<any>>this.http
            .get(`${this.store.getChmUrl()}color-mappings-for-channel/${idChannel}`)
            .map(res => this.extractData<Object[]>(res));
    }

    // POST /chm/color-mappings-for-channel/{idChannel}?hermes-color-id=XXX&channel-color-id=YYY
    addColorMapping(idChannel, idHermesColor, idChannelColor) {
        return <Observable<any>>this.http
            .post(`${this.store.getChmUrl()}color-mappings-for-channel/${idChannel}?hermes-color-id=${idHermesColor}&channel-color-id=${idChannelColor}`, null)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // DELETE /chm/color-mappings-for-channel/{idChannel}?hermes-color-id=XXX&channel-color-id=YYY
    deleteColorMapping(idChannel, idHermesColor, idChannelColor) {
        return <Observable<any>>this.http
            .delete(`${this.store.getChmUrl()}color-mappings-for-channel/${idChannel}?hermes-color-id=${idHermesColor}&channel-color-id=${idChannelColor}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

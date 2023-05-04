import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class MethodsService extends ChmHttp {

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

    // GET //channels
    getAllChannels() {
        return <Observable<any>>this.http
            .get(`${this.store.getChmUrl()}channels`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /methods
    getMethods() {
        return <Observable<any>>this.http
            .get(`${this.geBaseUrl()}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getMethod(id) {
        return <Observable<any>>this.http
            .get(this.geMethodUrl(id))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // POST /methods
    addMethod(methodModel) {
        return <Observable<any>>this.http
            .post(`${this.geBaseUrl()}`, JSON.stringify(methodModel))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // PUT /methods/{idMethod}
    updateMethod(methodModel) {
        return <Observable<any>>this.http
            .put(this.geMethodUrl(methodModel.methodId), JSON.stringify(methodModel))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // DELETE /methods/{idMethod}
    deleteMethod(id) {
        return <Observable<any>>this.http
            .delete(this.geMethodUrl(id))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    private geMethodUrl(id) {
        return this.geBaseUrl() + '/' + id;
    }

    private geBaseUrl() {
        return this.store.getChmUrl() + 'methods';
    }
}

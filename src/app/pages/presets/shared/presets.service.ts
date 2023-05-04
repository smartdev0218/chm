import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class PresetsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) {
        super();
    }

    // GET /sites/{idSite}/models
    getModels() {
        return <Observable<any>>this.http
            .get(`${this.geBaseUrl()}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getModel(id) {
        return <Observable<any>>this.http
            .get(this.geModelUrl(id))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // POST /sites/{idSite}/models
    addModel(model) {
        return <Observable<any>>this.http
            .post(`${this.geBaseUrl()}`, JSON.stringify(model))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // PUT /sites/{idSite}/models/{idModel}
    updateModel(model) {
        return <Observable<any>>this.http
            .put(this.geModelUrl(model.idModel), JSON.stringify(model))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // DELETE /sites/{idSite}/models/{idModel}
    deleteModel(id) {
        return <Observable<any>>this.http
            .delete(this.geModelUrl(id))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    private geModelUrl(id) {
        return this.geBaseUrl() + '/' + id;
    }

    private geBaseUrl() {
        return this.store.getSitesUrl() + 'models';
    }

    // GET /sites/{idSite}/channels
    getChannels() {
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}channels`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /constants/model-types
    getModelTypes() {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/model-types`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /constants/attribs-for-model-and-channel?id-channel=XXX&id-model-type=YYY
    getModelAttr(idChannel, idModelType) {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/attribs-for-model-and-channel?id-channel=${idChannel}&id-model-type=${idModelType}`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /constants/inventory-fields
    getInventoryFields() {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/inventory-fields`)
            .map(res => this.extractData<Object[]>(res));
    }
}

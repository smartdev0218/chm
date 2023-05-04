import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const baseUrl = 'alerts';

@Injectable()
export class DashboardRecentlyFinishedMethodsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) { super(); }


    getRecentlyFinishedMethods(idSite) {
        return <Observable<any>>this.http
            .get(this.store.getChmUrl() + 'methods/site/' + idSite + '/recently-finished-methods')
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

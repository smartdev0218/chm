import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class DashboardTopProductsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) { super(); }

    getTopProducts() {
        const siteUrl = this.store.getSitesUrl();
        console.log('top-products.url => ' + apiPrefix + 'dashboard/top-products');
        return <Observable<any>>this.http
            .get(apiPrefix + 'dashboard/top-products')
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getTopProductsForSite(idSite : number) {
        const siteUrl = this.store.getSitesUrl();
        console.log('top-products.url => ' + apiPrefix + 'dashboard/top-products?id-site=' + idSite);
        return <Observable<any>>this.http
            .get(apiPrefix + 'dashboard/top-products?id-site=' + idSite)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

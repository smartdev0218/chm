import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class DashboardTopBrandsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) { super(); }

    getTopBrands() {
        const siteUrl = this.store.getSitesUrl();
        console.log('top-brands.url => ' + apiPrefix + 'dashboard/top-brands');
        return <Observable<any>>this.http
            .get(apiPrefix + 'dashboard/top-brands')
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getTopBrandsForSite(idSite: number) {
        const siteUrl = this.store.getSitesUrl();
        console.log('top-brands.url => ' + apiPrefix + 'dashboard/top-brands?id-site='+idSite);
        return <Observable<any>>this.http
            .get(apiPrefix + 'dashboard/top-brands?id-site='+idSite)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

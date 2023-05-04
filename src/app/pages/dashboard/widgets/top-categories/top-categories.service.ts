import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class DashboardTopCategoriesService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) { super(); }

    getTopCategories() {
        const siteUrl = this.store.getSitesUrl();
        console.log('top-categories.url => ' + apiPrefix + 'dashboard/top-categories');
        return <Observable<any>>this.http
            .get(apiPrefix + 'dashboard/top-categories')
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getTopCategoriesForSite(idSite : number) {
        const siteUrl = this.store.getSitesUrl();
        console.log('top-categories.url => ' + apiPrefix + 'dashboard/top-categories?id-site=' + idSite);
        return <Observable<any>>this.http
            .get(apiPrefix + 'dashboard/top-categories?id-site=' + idSite)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

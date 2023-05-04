import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const baseUrl = 'config';
const sales = 'summary-sells';

@Injectable()
export class DashboardSalesService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) { super(); }

    getSales() {
        const siteUrl = this.store.getSitesUrl();
        console.log('summary-sells.url => ' + `${siteUrl}${baseUrl}`);
        return <Observable<any>>this.http
            .get(`${siteUrl}${sales}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getSalesConfig() {
        const siteUrl = this.store.getSitesUrl();
        // tslint:disable-next-line:max-line-length
        console.log('sales-config.url => ' + `${siteUrl}${baseUrl}?params=WIDGET_SELLS_TIPO_INTERVALO_1, WIDGET_SELLS_TIPO_INTERVALO_2, WIDGET_SELLS_TIPO_INTERVALO_3`);
        return <Observable<any>>this.http
            .get(`${siteUrl}${baseUrl}?params=WIDGET_SELLS_TIPO_INTERVALO_1,WIDGET_SELLS_TIPO_INTERVALO_2,WIDGET_SELLS_TIPO_INTERVALO_3`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    setSalesConfig(salesConfig: any) {
        const body = salesConfig;
        const siteUrl = this.store.getSitesUrl();
        return <Observable<any>>this.http
            .put(`${siteUrl}${baseUrl}`, body)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

}

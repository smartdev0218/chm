import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';
import { Page } from 'app/data/page';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class InventoryService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) {
        super();
    }


    // GET /sites/{idSite}/products/categories?filterFields=&filterValues
    getProductCategories(productFilter: any) {
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}products/categories`)
            .map(res => this.extractData<Object[]>(res));
    }



    // POST /sites/{idSite}/products/brands?filterFields=&filterValues
    getProductBrands(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/brands`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res));
    }

    // POST /sites/{idSite}/products/stations?filterFields=&filterValues
    getProductStations(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/stations`,  JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res));
    }

    // POST /sites/{idSite}/products/rotulos?filterFields=&filterValues
    getRotulos(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/rotulos`,  JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res));
    }


    getProducts(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}productsFull`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res))
            .catch(this.handleError);
    }

    // POST /sites/{idSite}/products/count?filterFields=&filterValues
    getProductCount(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/count`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res))
            .catch(this.handleError);
    }

    // GET /sites/{idSite}/channels?filterFields=&filterValues
    getProductChannels(productFilter: any){
        let queryString = '';
        // remove brand for filter
        const filterFields = productFilter.filterFields.split(',');
        const filterValues = productFilter.filterValues.split(',');
        const channelIndex = filterFields.indexOf('channel');
        if (channelIndex > -1) {
            filterFields.splice(channelIndex, 1);
            filterValues.splice(channelIndex, 1);
        }
        queryString += filterFields.length ? '&filterFields=' + encodeURI(filterFields.join(',')) : '';
        queryString += filterValues.length ? '&filterValues=' + encodeURI(filterValues.join(',')).replace(/[|]/g, '%7C').replace(/[|]/g, '%7C') : '';
        // queryString += productFilter.filterFields ? '&filterFields=' + productFilter.filterFields : '';
        // queryString += productFilter.filterValues ? '&filterValues=' + productFilter.filterValues : '';
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}channels?${queryString}`)
            .map(res => this.extractData<Object[]>(res));
    }

    getProductDetail(product_id){
        console.log(product_id)
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}products/${product_id}/detailed`)
            .map(res => this.extractData<Object[]>(res));
    }
    getChannelProductDetail(idSiteCanal, channelProductId){
        console.log(channelProductId)
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}channel-sites/${idSiteCanal}/channel-products/${channelProductId}/detailed`)
            .map(res => this.extractData<Object[]>(res));
    }
    // GET /sites/{idSite}/channels
    getChannels() {
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}channels`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /sites/{idSite}/publications
    getPublications() {
        return <Observable<any>>this.http
            .get(`${this.geBaseUrl()}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
    
    private geBaseUrl() {
        return this.store.getSitesUrl() + 'publications';
    }

    // POST /sites/{idSite}/products/{idProduct}/publish/{idPublication}
    publishProductPublications(publication_id, product_id) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/${product_id}/publish/${publication_id}`, publication_id, product_id)
            .map(res => this.extractData(res));
    }

    // POST /sites/{idSite}/products/{idProduct}/unpublish/{idPublication}
    unpublishProductPublications(publication_id, product_id ) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/${product_id}/unpublish/${publication_id}`, publication_id, product_id)
            .map(res => this.extractData(res));
    }

}

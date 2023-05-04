import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class PublicationsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) {
        super();
    }

    // GET /sites/{idSite}/publications
    getPublications() {
        return <Observable<any>>this.http
            .get(`${this.geBaseUrl()}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // GET /sites/{idSite}/publications/{idModel}
    getPublication(model) {
        return <Observable<any>>this.http
            .get(this.geModelUrl(model.publicationId))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
    
    // GET /sites/{idSite}/publications/{idModel}
    getPublicationById(idPublication) {
        return <Observable<any>>this.http
            .get(this.store.getSitesUrl() + 'publications/' + idPublication)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // POST /sites/{idSite}/publications
    addPublication(model) {
        return <Observable<any>>this.http
            .post(`${this.geBaseUrl()}`, JSON.stringify(model))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // PUT /sites/{idSite}/publications/{idModel}
    updatePublication(model) {
        return <Observable<any>>this.http
            .put(this.geModelUrl(model.publicationId), JSON.stringify(model))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // DELETE /sites/{idSite}/models/{idModel}
    deletePublication(id) {
        return <Observable<any>>this.http
            .delete(this.geModelUrl(id))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // GET /methods?
    getMethodsForChannel(idChannel) {
        return <Observable<any>>this.http
            .get(`${this.store.getChmUrl()}methods?id-channel=${idChannel}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    private geModelUrl(id) {
        return this.geBaseUrl() + '/' + id;
    }

    private geBaseUrl() {
        return this.store.getSitesUrl() + 'publications';
    }

    // GET /sites/{idSite}/channels
    getChannels() {
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}channels`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /sites/{idSite}/products?filterFields=&filterValues&page=1&pageSize=5
    getProducts(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res))
            .catch(this.handleError);
    }

    // POST /sites/{idSite}/products/count?filterFields=&filterValues
    getProductCount(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/count`,JSON.stringify(productFilter) )
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // GET /sites/{idSite}/products/categories?filterFields=&filterValues
    getProductCategories(productFilter: any) {
        let queryString = '';
        // remove catagory for filter
        const filterFields = productFilter.filterFields.split(',');
        const filterValues = productFilter.filterValues.split(',');
        const categoryIndex = filterFields.indexOf('category');
        if (categoryIndex > -1) {
            filterFields.splice(categoryIndex, 1);
            filterValues.splice(categoryIndex, 1);
        }

        queryString += filterFields.length ? '&filterFields=' + encodeURI(filterFields.join(',')) : '';
        queryString += filterValues.length ? '&filterValues=' + encodeURI(filterValues.join(',')) : '';

        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}products/categories?${queryString}`)
            .map(res => this.extractData<Object[]>(res));
    }

    // POST /sites/{idSite}/products/brands?filterFields=&filterValues
    getProductBrands(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/brands`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res));
    }


    // GET /constants/model-types
    getModelTypes() {
        return <Observable<any>>this.http
            .get(`${apiPrefix}constants/model-types`)
            .map(res => this.extractData<Object[]>(res));
    }

    // GET /sites/{idSite}/models
    getModels() {
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl() + 'models'}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // POST /sites/{idSite}/publications/{publication_id}/publish
    publishPublications(publicationId, publish) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}publications/${publicationId}/publish?publish=${publish}`, publicationId, publish)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }


    // POST /methods/site/{idSite}/run-method-for-all-publications
    runMethodForAllPublications(idMethod,idSite, idSiteCanal) {
        //alert("idMethod = " + idMethod);
        //alert("idSite = " + idSite);
        //alert("url =" + `${this.store.getChmUrl()}methods/site/`+idSite+'/run-method-for-all-publications?id-method='+idMethod);
        return this.http
            .post(`${this.store.getChmUrl()}/methods/site/`+idSite+'/run-method-for-all-publications?id-method='+idMethod+'&id-site-canal='+idSiteCanal, "")
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }


    // POST /methods/site/{idSite}/run-method-for-one-publication
    runMethodForOnePublication(idMethod,idSite, idPublication) {
        //alert("idMethod = " + idMethod);
        //alert("idSite = " + idSite);
        //alert(`${this.store.getChmUrl()}/methods/site/`+idSite+'/run-method-for-one-publication?id-method='+idMethod+'&id-publication='+idPublication);
        return this.http
            .post(`${this.store.getChmUrl()}/methods/site/`+idSite+'/run-method-for-one-publication?id-method='+idMethod+'&id-publication='+idPublication, "")
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

     // POST /sites/{idSite}/priorities/{idSiteChannel}
     getPrioritiesByChannelSite(idSiteChannel){
        return <Observable<any>>this.http
        .get(this.store.getSitesUrl() + 'priorities/'+idSiteChannel )
        .map(res => this.extractData(res))
        .catch(this.handleError);
     }

     // POST /sites/{idSite}/priorities/{idSiteChannel}/publications/{idPublication}
     getPrioritiesByChannelSiteExcludingPublication(idSiteChannel, idPublication){
        return <Observable<any>>this.http
        .get(this.store.getSitesUrl() + 'priorities/'+idSiteChannel+'/publications/'+idPublication )
        .map(res => this.extractData(res))
        .catch(this.handleError);
     }

    stopMethod(idEjecucionMetodo: string) {
        return this.http
            .get(`${this.store.getChmUrl()}desbloquear/${idEjecucionMetodo}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

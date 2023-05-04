import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class ConfigCategoriesPrimaryService  extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) {
        super();
    }

    private getBaseUrl() {
        return this.store.getSitesUrl() + "config/categories";
    }
    
    // GET /products/categories
    getParentSiteCategories2(idSite) {
        return <Observable<any>>this.http
            .get(this.store.getSitesUrl() + "/products/categories")
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
    
    
    // GET /config/categories/
    getMapSiteCategories() {
        return <Observable<any>>this.http
            .get(`${this.getBaseUrl()}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
        
    // GET /config/categories/parents
    getParentChannelCategories(idChannel) {
        return <Observable<any>>this.http
            .get(this.getBaseUrl() + "/channel/" + idChannel + "/parents")
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
        
    // GET /config/categories/channel/{idChannel}
    getMapChannelCategories(idChannel) {
        return <Observable<any>>this.http
            .get(this.getBaseUrl() + "/channel/" + idChannel)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
        
    // GET /config/categories/mapped/{idChannel}
    getMappedCategoriesByChannel(idChannel) {
        return <Observable<any>>this.http
            .get(this.getBaseUrl() + "/mapped/" + idChannel)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
    
     
    // POST /sites/{idSite}/category-mappings-for-channel/{idChannel}
    mapCategory(idChannel, idCategoryChannel, idCategoryHermes) {
        return <Observable<any>>this.http
            .post(this.store.getSitesUrl()+'category-mappings-for-channel/'+idChannel+'?hermes-category-id='+idCategoryHermes+'&channel-category-id='+idCategoryChannel, '')
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }    
    
    // DELETE /sites/{idSite}/category-mappings-for-channel/{idChannel}
    unmapCategory(idChannel, idCategoryChannel, idCategoryHermes) {
        return <Observable<any>>this.http
            .delete(this.store.getSitesUrl()+'category-mappings-for-channel/'+idChannel+'?hermes-category-id='+idCategoryHermes+'&channel-category-id='+idCategoryChannel)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
    
    // PUT /config/categories/mapped/{idChannel}/set
    setMappedCategories(idChannel, listMappedCategories) {
        return <Observable<any>>this.http
            .put(this.getBaseUrl() + "/mapped/" + idChannel + "/set", JSON.stringify(listMappedCategories))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

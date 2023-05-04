import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class CredentialsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) {
        super();
    }


    public getBaseUrl() {
       // return this.store.getChmUrl() + 'credentials';
    }

    // GET /sites/{idSite}/channel/{idChannel}/credentials
    getCredentialsFieldsByChannel(idChannel) {
        var myUrl=this.store.getChmUrl() + 'constants/credentials-fields/'+idChannel;
        console.log(myUrl)
        return <Observable<any>>this.http
            .get(myUrl)
            .map(res => this.extractData(res)) 
            .catch(this.handleError);
    }

     // GET /sites/{idSite}/channel/{idChannel}/credentials
     getCredentialsBySiteAndChannel(idSite, idChannel, idSiteCanal) {
        var myUrl=this.store.getChmUrl() + 'sites/'+idSite+'/channel/'+idChannel+'/siteChannel/'+idSiteCanal+'/credentials';
        console.log(myUrl)
        return <Observable<any>>this.http
            .get(myUrl)
            .map(res => this.extractData(res)) 
            .catch(this.handleError);
    }

     // GET /sites/{idSite}/channels
    getChannelsBySite(idSite) {
        var myUrl=this.store.getChmUrl() + 'sites/'+idSite+'/channels';
        console.log(myUrl)
        return <Observable<any>>this.http
            .get(myUrl)
            .map(res => this.extractData(res)) 
            .catch(this.handleError);
    }


    setCredentialsBySiteAndChannel(idSite, idChannel, idSiteChannel, listCredentials) {
        var myUrl=this.store.getChmUrl() + 'sites/'+idSite+'/channel/'+idChannel+'/siteChannel/'+idSiteChannel+'/credentials';
        console.log(JSON.stringify(listCredentials))
        return <Observable<any>>this.http
            .post(myUrl, JSON.stringify(listCredentials))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

}

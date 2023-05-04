import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class StatementsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService,
        private simpleHttp: Http) {
        super();
    }


    public getBaseUrl() {
       // return this.store.getChmUrl() + 'statements';
    }

     // GET /sites/{idSite}/channel/{idChannel}/statements
     getStatementsBySiteAndChannel(idSite, idChannel, idSiteCanal) {
        var myUrl=this.store.getChmUrl() + 'sites/'+idSite+'/channel/'+idChannel+'/siteChannel/'+idSiteCanal+'/statements';
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


  // GET /open/informeControl/{idSiteCanal}
  generateStatement(idSiteCanal) {
    var myUrl=this.store.getChmUrl() + 'open/informeControl/'+idSiteCanal;
    console.log(myUrl)

    this.simpleHttp.get(myUrl).subscribe()
  }
}

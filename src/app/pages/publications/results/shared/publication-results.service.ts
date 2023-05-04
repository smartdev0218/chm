import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class PublicationResultsService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) {
        super();
    }

    private getBaseUrl(idPublication) {
        return this.store.getSitesUrl() + 'publications/' + idPublication + "/results";
    }

    private getPubicationResultUrl(idPublication, idPublicationResult) {
        return this.getBaseUrl(idPublication) + '/' + idPublicationResult;
    }

    // GET /sites/{idSite}/publications/{idPublication}/results
    getPublicationResults(idPublication) {
        return <Observable<any>>this.http
            .get(`${this.getBaseUrl(idPublication)}`)
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // GET /sites/{idSite}/publications/{idPublication}/results/{idPublicationResult}
    getPublicationResult(idPublication, idPublicationResult) {
        return <Observable<any>>this.http
            .get(this.getPubicationResultUrl(idPublication, idPublicationResult))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    // DELETE /sites/{idSite}/publications/{idPublication}/results/{idPublicationResult}
    deletePublicationResult(idPublication, idPublicationResult) {
        return <Observable<any>>this.http
            .delete(this.getPubicationResultUrl(idPublication, idPublicationResult))
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }
}

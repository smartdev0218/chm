import { Injectable, isDevMode } from '@angular/core';
import { Http, Response, ResponseContentType  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';
const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class ExportFileService extends ChmHttp {

    constructor(
        private http: AuthHttp,
        private store: StoreService) {
        super();
    }

    private getBaseUrl(typeReport, typeFile, object) {
        return this.store.getSitesUrl() + 'export/' + typeReport + '/file/' + typeFile + '/' + object;
    }
    
    // GET /sites/{idSite}/export/{typeReport}/file/{typeFile}/{object}
    export(typeReport, typeFile, object) {
        let url = `${this.getBaseUrl(typeReport, typeFile, object)}`;
        return this.http.get(url, {
            responseType: ResponseContentType.Blob
        });
    }
}

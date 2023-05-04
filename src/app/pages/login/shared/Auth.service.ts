import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { tokenNotExpired } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';


const authUrl = (isDevMode()) ? '/chm/backend/login/authenticate' : '/chm/login/authenticate';
const logoutUrl = (isDevMode()) ? '/chm/backend/auth/logout' : '/chm/auth/logout';

@Injectable()
export class AuthService extends ChmHttp {
    private _jwt: string;

    constructor(private http: Http) { super(); }

    isLoggedIn() {
        return tokenNotExpired();
    }

    getUsername() {
        return tokenNotExpired() ? localStorage.getItem('username') : undefined;
    }

    login(username: string, passwd: string) {
        return <Observable<any>>this.http
            .get(`${authUrl}`, {params : {username: username, password: passwd}})
            .map(res => {
                const data = this.extractData<any>(res);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                localStorage.setItem('hermesAdminUrl', data.hermesAdminUrl);
                return data;
            });
    }

    logout() {
        return <Observable<any>>this.http
            .get(`${logoutUrl}`)
            .catch(this.handleError);;
    }
}

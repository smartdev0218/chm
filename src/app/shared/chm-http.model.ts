import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export class ChmHttp {
    protected extractData<T>(res: Response) {
        // console.log('extractData.res => ' + JSON.stringify(res));
        if (!res.ok) {
            throw new Error('Bad response status: ' + res.status);
        }
        if (res.status == 202) {
            throw new Error('202 Accepted status');
        }

        // const body = (res.toString().length > 0 && res.json) ? res.json() : null;        
        // Added disable JSON parse for Empty Body
        const body = (res.toString().length > 0 && res.json && res['_body'] && res['_body'].toString().length) ? res.json() : null;
        // console.log('extractData.body => ' + JSON.stringify(body));
        // console.log('extractData => res[\'_body\'].toString().length => ' + res['_body'].toString().length);
        const data = body && body.data ? body.data : body;
        // console.log('extractData.data => ' + JSON.stringify(data));
        return <T>(data || {});
    }

    protected handleError: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        const res = <Response>errorResponse;
        const err = res.json ? res.json() : res;
        return Observable.throw(err);
    }
}

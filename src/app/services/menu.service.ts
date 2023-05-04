import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { StoreService } from 'app/shared/store.service';
import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';

@Injectable()
export class MenuService extends ChmHttp {
  private current: ReplaySubject<any> = new ReplaySubject<any>(1);
 
  constructor(
    private router: Router,
    private store: StoreService,
    private http: AuthHttp,
  ) { super(); }

  public setCurrent(menu: any) {
    this.current.next(menu);
  }

  public getCurrent() {
    return this.current;
  }

  public getHtml(): Observable<any>{
    const menuURL = this.store.getMenuUrl();
    return <Observable<any>>this.http
        .get(menuURL)
        .map(res => res) 
        .catch(this.handleError);
  }



}

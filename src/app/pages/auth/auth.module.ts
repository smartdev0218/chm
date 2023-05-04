import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AuthWidgetComponent } from './auth-widget.component';
import { BsDropdownModule } from 'ngx-bootstrap';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(
    new AuthConfig({
      headerName: 'chm-token',
      noTokenScheme: true,
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('token')),
      globalHeaders: [{'Content-Type': 'application/json'}]
    }),
    http,
    options
  );
}

@NgModule({
    imports: [
        BsDropdownModule.forRoot()
    ],
    declarations: [
        AuthWidgetComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ],
    exports: [
        AuthWidgetComponent
    ]
})
export class AuthModule { }

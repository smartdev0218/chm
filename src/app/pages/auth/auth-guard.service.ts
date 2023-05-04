import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
      if (localStorage.getItem("token") === null) {
          this.router.navigate(['login', { queryParams: { redirectTo: state.url } }]);
      }
      
      return true;
      
//    if (this.authService.isLoggedIn()) { return true; }
//    this.router.navigate(['login', { queryParams: { redirectTo: state.url } }]);
//    return false;
  }
}

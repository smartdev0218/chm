import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { User } from 'app/models/user';

@Injectable()
export class CanActivateGuard implements CanActivate {
  private connected = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.getCurrent().subscribe((user) => {
      this.connected = user.connected;
    });
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
      if (localStorage.getItem("token") === null) {
          this.router.navigate(['login', { queryParams: { redirectTo: state.url } }]);
      }
      if (localStorage.getItem("username") === null) {
          this.router.navigate(['login', { queryParams: { redirectTo: state.url } }]);
      }
      
    const user1 = new User({
        avatarUrl: 'assets/img/user2-160x160.jpg',
        email: '',
        firstname: localStorage.getItem("username")
        // lastname: 'Soria'
    });
      
      return true;
    // test here if you user is logged
//    if (!this.connected) {
//     // this.router.navigate(['login', { queryParams: { redirectTo: state.url } }]);
//      //revisar para manejo de la sesión
//      this.router.navigate(['login']);
//    }
//    return this.connected;
  }

}

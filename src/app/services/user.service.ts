import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    private current: ReplaySubject<User> = new ReplaySubject<User>( 1 );

    // Called when logout
    public logoutAction: Function;

    constructor(
      private router: Router
    ) {}

    public setCurrent( user: User ) {
      this.current.next( user );
    }

    public getCurrent() {
      return this.current;
    }

    public logout() {
      if ( this.logoutAction ) {
        this.logoutAction();
      } else {
        const user = new User();
        user.connected = false;
        this.setCurrent( user );
        localStorage.clear();
        this.router.navigate(['login']);
      }
    }
}

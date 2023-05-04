import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { TranslateService } from 'app/services/translate.service';
import { AuthService } from 'app/pages/login/shared/Auth.service';
import { Observable } from 'rxjs/Observable';


@Component({
  /* tslint:disable */
  selector: '.userBox',
  /* tslint:enable */
  styleUrls: ['./user-box.component.css'],
  templateUrl: './user-box.component.html'
  ,providers: [AuthService]
})
export class UserBoxComponent implements OnInit {

  // default user, only an example, please use the userService to modify
  public currentUser: User =  new User({
      avatarUrl: 'assets/img/user2-160x160.jpg',
      email: 'weber.antoine@outlook.com',
      firstname: localStorage.getItem("username"),
      lastname: ''
  });

  constructor(private userServ: UserService, private router: Router, private translate: TranslateService,  private authService: AuthService) {
    // se connecter au modif du user courant
    this.userServ.getCurrent().subscribe((user: User) => this.currentUser = user);
  }

  public ngOnInit() {
    // TODO
  }

  public logout (){
    Observable.forkJoin(
      this.authService.logout()
    ).subscribe(
      res => {
        localStorage.clear(); //Borramos el token y redirigimos
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      },
      () => {
       
      }
    );
  
  }

}

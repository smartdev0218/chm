import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { LoggerService } from 'app/services/logger.service';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/user';
import { AuthService } from 'app/pages/login/shared/Auth.service';
import { environment } from 'environments/environment';
import { MOCK_LOGIN } from 'app/mock-api';
import { TranslateService } from 'app/services/translate.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string;
    passwd: string;
    isLoading = false;

    constructor(private router: Router,
        private authService: AuthService,
        private logger: LoggerService,
        private userServ: UserService,
        private translate: TranslateService) { }

    ngOnInit() {
        window.dispatchEvent(new Event('resize'));
        document.body.className = 'hold-transition login-page cm-login';

        //localStorage.clear();
        if (environment.mock) {
            this.username = 'siva2016';
            this.passwd = 'sivakumar';
        }
        this.logger.log('Login', JSON.stringify(environment), null, null);
    }

    login() {
        this.isLoading = true;
        // this.logger.log('Login', JSON.stringify(MOCK_LOGIN), null, null);
        if (environment.mock) {
            const data = MOCK_LOGIN;
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', this.username);

            const user1 = new User({
                avatarUrl: 'assets/img/user2-160x160.jpg',
                email: '',
                firstname: this.username
                // lastname: 'Soria'
            });

            user1.connected = true;

            this.userServ.setCurrent(user1);
            this.router.navigate(['']);
            return;
        }

        this.authService.login(this.username, this.passwd)
            .subscribe(
                res => {
                    let lang = res.defaultLanguage.toLocaleLowerCase(); //Obtenemos el idioma del usuario
                    let logoutUrl = res.logoutUrl;
                    const user1 = new User({
                        avatarUrl: 'assets/img/user2-160x160.jpg',
                        email: 'Manuel.Soria@modd.com',
                        firstname: this.username,
                        lastname: '',
                        preferredLang: lang,
                        logoutUrl: logoutUrl
                    });
                   
                    user1.connected = true;

                    this.userServ.setCurrent(user1);

                    this.router.navigate(['']);
                },
                err => {
                    if (err.status === 401) {
                        this.isLoading = false;
                        alert('Incorrect username and / or password.');
                        this.username = '';
                        this.passwd = '';
                    } else if(err.status === 404) {
                        this.isLoading = false;
                        alert('This user has not sites and / or channels.');
                        this.username = '';
                        this.passwd = '';
                    }else{
                    	this.isLoading = false;
                        alert('There was some problem connecting to the server.');
                    }
                }

            );
    }

}

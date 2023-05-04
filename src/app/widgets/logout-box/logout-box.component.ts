import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../../services/logger.service';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/pages/auth/auth.service';


@Component({
    selector: '.logoutBox',
    styleUrls: ['./logout-box.component.css'],
    templateUrl: './logout-box.component.html'
})

export class LogoutBoxComponent implements OnInit {
    private currentUser: User;
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private userService: UserService, private router: Router, private authService: AuthService) { }
    public ngOnInit() { }


    logout() {
        this.authService.getLogoutUrl()
            .subscribe((res) => {
                let logoutURL =  res.text();
                localStorage.clear();
                this.document.location.href =logoutURL
            })

    }


}



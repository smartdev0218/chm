import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'chm-auth-widget',
    templateUrl: './auth-widget.component.html',
    styleUrls: [ './auth-widget.component.css' ]
})
export class AuthWidgetComponent implements OnInit {

    username: string;

    constructor(private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        this.username = this.authService.getUsername();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}

import { Component } from '@angular/core';
import {
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router
} from '@angular/router';

@Component({
  selector: 'chm-nav-loader',
  templateUrl: './nav-loader.component.html',
  styleUrls: ['./nav-loader.component.css']
})
export class NavLoaderComponent {
    // router state
    loading = true;

    constructor(private router: Router) {
        // intercept router events
        router.events.subscribe((event: RouterEvent) => this.navigationInterceptor(event));
    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
            this.loading = false;
        }
    }
}

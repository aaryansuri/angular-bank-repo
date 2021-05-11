import { Component } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bank-management-system';

  loading = true;

  constructor(private _router: Router) {
    this._router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }

    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }
}

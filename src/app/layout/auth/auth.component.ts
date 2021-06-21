import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  private showLoadingIndicator: boolean = false;

  constructor(private router: Router) {

    this.router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {

        this.showLoadingIndicator = true;

      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError
      ) {

        this.showLoadingIndicator = false;

      }

    })

  }

  ngOnInit(): void {
    
  }

  /**
 * 
 */
  get getShowLoadingIndicator(): boolean {

    return this.showLoadingIndicator;

  }

}

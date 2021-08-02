import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { Subscription } from 'rxjs';
import { RouterLinkService } from 'src/app/core/services/router-link.service';
import { User } from 'src/app/data/models/user.model';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'app-nav-bar-ui',
  templateUrl: './nav-bar.component.html'
})

export class NavBarComponent implements OnInit {

  languageSubscription: Subscription;
  public user: User;

  constructor(
    private sideNavService: SideNavService,
    private routerLinkService: RouterLinkService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.authenticationService.user.subscribe(userData => this.user = userData);

  }

  /**
   * 
   */
  get getUser(): User {

    return this.user;

  }

  /**
   * 
   */
  onToggleSideNavBar(): void {

    this.sideNavService.toggleSideNav();

  }

  /**
   * 
   */
  logout(): void {

    this.authenticationService.logout();

  }

}

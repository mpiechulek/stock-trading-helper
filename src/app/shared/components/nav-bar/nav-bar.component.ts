import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { Subscription } from 'rxjs';
import { RouterLinkService } from 'src/app/core/services/router-link.service';

@Component({
  selector: 'app-nav-bar-ui',
  templateUrl: './nav-bar.component.html'
})

export class NavBarComponent implements OnInit {

  languageSubscription: Subscription;

  constructor(
    private sideNavService: SideNavService,
    private routerLinkService: RouterLinkService
  ) { }

  ngOnInit(): void {
  }

  onToggleSideNavBar(): void {
    this.sideNavService.toggleSideNav();
  }

}

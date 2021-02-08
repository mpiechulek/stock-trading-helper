import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar-ui',
  templateUrl: './nav-bar.component.html'
})

export class NavBarComponent implements OnInit {

  languageSubscription: Subscription;

  constructor(
    private sideNavService: SideNavService
  ) { }

  ngOnInit(): void {
  }


  onToggleSideNavBar(): void {
    this.sideNavService.toggleSideNav();
  }

}

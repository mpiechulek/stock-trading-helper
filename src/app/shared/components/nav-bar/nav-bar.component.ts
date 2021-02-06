import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar-ui',
  templateUrl: './nav-bar.component.html'
})

export class NavBarComponent implements OnInit {

  constructor(
              private sideNavService: SideNavService,
              public translate: TranslateService
    )
   { 
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
  }
          
  ngOnInit(): void {

  } 

  onToggleSideNavBar(): void {
    this.sideNavService.toggleSideNav();
  }

}

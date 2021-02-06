import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-side-nav-ui',
  templateUrl: './side-nav.component.html'
})

export class SideNavComponent implements OnInit {

  sliderChecked: boolean;
  selectedLanguage = 'pl'
  sideNavVisible: boolean;
  sideNavVisibleSubscription: Subscription;

  constructor(private themeService: ThemeService, private sideNavService: SideNavService) { }

  ngOnInit(): void {
    this.sliderChecked = this.themeService.checkLocaleStorage();   

    this.sideNavVisibleSubscription = this.sideNavService.sideNavOpen().subscribe((value) => {
      this.sideNavVisible = value;
    });
  }

  ngOnDestroy(): void {
    this.sideNavVisibleSubscription.unsubscribe();
  }

  changeTheme(event): void {
    this.themeService.changeThemes(event.checked);
    this.sliderChecked = this.themeService.checkLocaleStorage();
  }

  onToggleSideNav() {
    this.sideNavService.toggleSideNav();
   
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-side-nav-ui',
  templateUrl: './side-nav.component.html'
})

export class SideNavComponent implements OnInit {

  sliderChecked: boolean;
  selectedLanguage = 'en'
  sideNavVisible: boolean;
  sideNavVisibleSubscription: Subscription;
  languages: string[];

  //============================================================================

  constructor(
    private themeService: ThemeService,
    private sideNavService: SideNavService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
  }

  //============================================================================

  ngOnInit(): void {
    this.languages = this.translate.getLangs();
    this.sliderChecked = this.themeService.checkLocaleStorage();

    this.sideNavVisibleSubscription = this.sideNavService.sideNavOpen().subscribe((value) => {
      this.sideNavVisible = value;
    });
  }

  ngOnDestroy(): void {
    this.sideNavVisibleSubscription.unsubscribe();
  }
  
  //============================================================================

  switchLang(lang: string) {    
    this.translate.use(lang);
  }

  changeTheme(event): void {
    this.themeService.changeThemes(event.checked);
    this.sliderChecked = this.themeService.checkLocaleStorage();
  }

  onToggleSideNav() {
    this.sideNavService.toggleSideNav();

  }
}

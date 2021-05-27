import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { RouterLinkService } from 'src/app/core/services/router-link.service';

@Component({
  selector: 'app-side-nav-ui',
  templateUrl: './side-nav.component.html'
})

export class SideNavComponent implements OnInit, OnDestroy {

  sliderChecked: boolean;
  selectedLanguage: string;
  sideNavVisible: boolean;
  sideNavVisibleSubscription: Subscription;
  languages: string[];

  //============================================================================

  constructor(
    private themeService: ThemeService,
    private sideNavService: SideNavService,
    public translate: TranslateService,
    private languageService: LanguageService,
    private routerLinkService: RouterLinkService
  ) { }

  //============================================================================

  ngOnInit(): void {

    // Setting the slider position
    this.sliderChecked = this.themeService.checkLocaleStorage();

    // Getting the list of languages to display in the select tag 
    this.languages = this.translate.getLangs();

    // Setting on start the chosen language form local storage or default 'en'
    this.selectedLanguage = this.languageService.getFromLocalStorage();

    // Setting the component visibility
    this.sideNavVisibleSubscription = this.sideNavService.sideNavOpen().subscribe((value) => {
      this.sideNavVisible = value;
    });
  }

  ngOnDestroy(): void {
    if (!!this.sideNavVisibleSubscription) {
      this.sideNavVisibleSubscription.unsubscribe();
    }
  }

  //============================================================================
  /**
   * 
   * @param lang 
   */
  switchLang(lang: string): void {

    this.languageService.switchLang(lang);

    this.languageService.addToLocalStorage(lang);

  }

  /**
   * 
   * @param event 
   */
  changeTheme(event): void {

    this.themeService.changeThemes(event.checked);

    this.sliderChecked = this.themeService.checkLocaleStorage();

  }

  /**
   * 
   */
  onToggleSideNav(): void {

    this.sideNavService.toggleSideNav();

  }

}

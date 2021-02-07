import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { LanguageService } from 'src/app/core/services/language.service';

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
    public translate: TranslateService,
    private languageService: LanguageService
  ) { }

  //============================================================================

  ngOnInit(): void {
   
    // Getting the list of languages to display in the select tag 
    this.languages = this.translate.getLangs();

    // Setting the slider position
    this.sliderChecked = this.themeService.checkLocaleStorage();

     // Setting the component visibility
    this.sideNavVisibleSubscription = this.sideNavService.sideNavOpen().subscribe((value) => {
      this.sideNavVisible = value;      
    });
  }

  ngOnDestroy(): void {
    this.sideNavVisibleSubscription.unsubscribe();
  }
  
  //============================================================================

  switchLang(lang: string) {   
    this.languageService.switchLang(lang);     
    this.languageService.addToLocalStorage(lang);
  }

  changeTheme(event): void {
    this.themeService.changeThemes(event.checked);
    this.sliderChecked = this.themeService.checkLocaleStorage();
  }

  onToggleSideNav() {
    this.sideNavService.toggleSideNav();
  }
}

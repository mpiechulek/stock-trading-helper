
import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private currentLanguage: string;
  private showLoadingIndicator: boolean = true;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {

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

    // setting theme
    this.themeService.lodeTheme();

    // setting translations    
    this.currentLanguage = this.languageService.getFromLocalStorage();

    this.translateService.addLangs(['en', 'pl']);

    this.translateService.setDefaultLang(this.currentLanguage);
  }

  /**
   * 
   */
  get getShowLoadingIndicator():boolean {

    return this.showLoadingIndicator;

  }
}

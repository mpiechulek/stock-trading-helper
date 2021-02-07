
import { Component } from '@angular/core';
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

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.themeService.lodeTheme();

    // setting translations    
    this.currentLanguage =this.languageService.getFromLocalStorage();
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang(this.currentLanguage);
  }
}

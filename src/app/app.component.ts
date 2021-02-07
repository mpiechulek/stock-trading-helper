
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  ) { }

  ngOnInit(): void {
    this.themeService.lodeTheme(); 

    // setting translations
    this.currentLanguage =  this.translateService.getBrowserLang();
    console.log(this.currentLanguage);
    
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang(this.currentLanguage);
  }
}

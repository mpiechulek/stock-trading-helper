import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar-ui',
  templateUrl: './nav-bar.component.html'
})

export class NavBarComponent implements OnInit {

  languageSubscription: Subscription;

  constructor(
              private sideNavService: SideNavService,
              public translate: TranslateService,
              private languageService: LanguageService
    )
   { 
    
  }
          
  ngOnInit(): void {    

    // this.languageService.getFromLocalStorage();

    // this.languageSubscription = this.languageService.getCurrentLanguage().subscribe((lang)=> {
    //   this.translate.addLangs(['en', 'pl']);      
    //   this.translate.setDefaultLang(lang);
    // });    
  } 
  
  ngOnDestroy(): void {
    // this.languageSubscription.unsubscribe();
  }

  onToggleSideNavBar(): void {
    this.sideNavService.toggleSideNav();
  }

}

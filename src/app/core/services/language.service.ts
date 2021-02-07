import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private chosenLanguage: string;
  private chosenLanguage$ = new Subject<string>();

  constructor(public translate: TranslateService) {}

  addToLocalStorage(language: string) {
    localStorage.setItem('language', language);
  }

  getFromLocalStorage() {

    if (localStorage.hasOwnProperty('language')) {
      this.chosenLanguage = localStorage.getItem('language');
    } else {  
      this.chosenLanguage = 'en';   
      this.addToLocalStorage(this.chosenLanguage);
    }   
    return this.chosenLanguage;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}

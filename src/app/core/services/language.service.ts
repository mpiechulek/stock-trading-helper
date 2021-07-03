import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  private chosenLanguage: string;
  private languageData: any;

  constructor(public translate: TranslateService, public http: HttpClient) {

    this.getFromLocalStorage();
    this.fetchTranslations();

  }

  /**
   * 
   */
  get getLanguageData(): any {

    return this.languageData;

  }

  /**
   * 
   * @param language 
   */
  addToLocalStorage(language: string): void {

    localStorage.setItem('language', language);

  }

  /**
   * 
   * @returns 
   */
  getFromLocalStorage(): string {

    if (localStorage.hasOwnProperty('language')) {

      this.chosenLanguage = localStorage.getItem('language');

    } else {

      this.chosenLanguage = 'en';

      this.addToLocalStorage(this.chosenLanguage);

    }

    return this.chosenLanguage;

  }

  /**
   * 
   * @param lang 
   */
  switchLang(lang: string): void {

    this.translate.use(lang);

  }

  /**
   * Getting translations from assets json file
   */
  fetchTranslations(): void {

    this.http.get(`./../assets/i18n/${this.chosenLanguage}.json`)

      .subscribe(data => {

        this.languageData = data;

      });
  }

}

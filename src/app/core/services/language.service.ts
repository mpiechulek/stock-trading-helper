import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private chosenLanguage: string = 'en';
  chosenLanguage$ = new Subject<string>();

  constructor() { }

  addToLocalStorage(language: string){
    localStorage.setItem('language', language);  
  }

  getFormLocalStorage() {
    
    if(localStorage.hasOwnProperty('language')) {
      this.chosenLanguage = localStorage.getItem('language');

    } else {
      this.chosenLanguage = 'en';
      this.addToLocalStorage(this.chosenLanguage);

    }

    this.chosenLanguage$.next(this.chosenLanguage);
  }

  getCurrentLanguage(): string{
    return this.chosenLanguage;
  }
}

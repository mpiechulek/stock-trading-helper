import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private chosenLanguage: string;
  private chosenLanguage$ = new Subject<string>();

  constructor() { }

  addToLocalStorage(language: string){
    localStorage.setItem('language', language);  
  }

  getFromLocalStorage() {
    
    if(localStorage.hasOwnProperty('language')) {
      this.chosenLanguage = localStorage.getItem('language');
    } else {
      this.chosenLanguage = 'en';
      this.addToLocalStorage(this.chosenLanguage);
    }

    this.chosenLanguage$.next(this.chosenLanguage);
  }

  getCurrentLanguage(){
    return this.chosenLanguage$.asObservable();
  }
}

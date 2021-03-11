import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {

  private darkThemeSubject = new Subject<boolean>();
  private darkTheme$ = this.darkThemeSubject.asObservable();

  private storageThemeKeyName: string = 'darkTheme';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  get themeState(): Observable<boolean> {
      return this.darkTheme$;
  }


  /**
   * Setting the light or dark theme
   * @param state 
   */
  changeThemes(state: boolean): void {

    if (state) {
      this.setDarkTheme();
    } else {
      this.setThemLight();
    }

    this.lodeTheme();
  }

  /**
   * 
   * @returns 
   */
  setDarkTheme(): void {
    localStorage.setItem(this.storageThemeKeyName, 'true');
    this.getThemeStateFormLocalStorage();
    return;
  }

  /**
   * 
   * @returns 
   */
  setThemLight(): void {
    localStorage.setItem(this.storageThemeKeyName, 'false');
    this.getThemeStateFormLocalStorage();
    return;
  }

  /**
   * 
   * @returns 
   */
  getThemeStateFormLocalStorage(): void {

    let state: boolean = false;

    if (localStorage.getItem('darkTheme') !== null) {      
      state = JSON.parse(localStorage.getItem(this.storageThemeKeyName));
    }
    this.darkThemeSubject.next(state);
  }

  /**
   * Adding or removing a class of 'dark-theme' form body tag
   * @returns 
   */
  lodeTheme(): void {
    if (this.checkLocaleStorage()) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
    return;
  }

  /**
   * Checking if dark theme is set to true
   */
  checkLocaleStorage(): boolean {
    let darkTheme: string = 'true';
    return darkTheme === localStorage.getItem(this.storageThemeKeyName)
  }

}

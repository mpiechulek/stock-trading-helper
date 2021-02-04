import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {

  darkTheme: boolean = false;

  constructor( @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {       
 
  }

  changeThemes(state: boolean):void {

    if(state) {
      this.setDarkTheme(); 
    }else {
      this.setThemLight();
    }

    this.lodeTheme();
  }

  setDarkTheme(): void {
    localStorage.setItem('darkTheme', 'true' );
    return;
  }

  setThemLight():void {
    localStorage.setItem('darkTheme', 'false' );
    return;
  }

  lodeTheme():void {   
    if(this.checkLocaleStorage()){
      this.document.body.classList.add('dark-theme');
    }else {
      this.document.body.classList.remove('dark-theme');
    }
    return;
  }

  checkLocaleStorage(): boolean {
    let darkTheme: string = 'true';
    return darkTheme ===  localStorage.getItem('darkTheme')
  }  

}

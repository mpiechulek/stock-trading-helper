import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SideNavService {

  private sideNav: boolean = false;
  private sideNavIsOpen$ = new Subject<boolean>();

  constructor() { }

  toggleSideNav(): void {
    this.sideNav = !this.sideNav;
    this.sideNavIsOpen$.next(this.sideNav);
  }

  sideNavOpen() {  
    return  this.sideNavIsOpen$.asObservable(); 
  }
}

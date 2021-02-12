import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SideNavService {

  private sideNav: boolean = false;
  // Here we create the Observer
  private sideNavIsOpen = new Subject<boolean>();

  constructor() { }

  toggleSideNav(): void {
    this.sideNav = !this.sideNav;
    // This is informing all the subscribers about changes
    this.sideNavIsOpen.next(this.sideNav);
  }

  // We are subscribing to this
  sideNavOpen() {
    return this.sideNavIsOpen.asObservable();
  }
}

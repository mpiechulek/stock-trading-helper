import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SideNavService {

  private sideNavIsOpen: boolean = false;

  constructor() { }

  toggleSideNav(): boolean {
    this.sideNavIsOpen = !this.sideNavIsOpen;
    return this.sideNavIsOpen;
  }

  sideNavOpen() {
    return this.sideNavIsOpen;
  }
}

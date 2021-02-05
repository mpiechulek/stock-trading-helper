import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-side-nav-ui',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent implements OnInit {

  sliderChecked: boolean;
  selectedLanguage = 'pl'
  sideNavVisible: boolean;

  constructor(private themeService: ThemeService, private sideNavService: SideNavService ){ }

  ngOnInit(): void {
    this.sliderChecked = this.themeService.checkLocaleStorage();
    this.sideNavVisible = this.sideNavService.sideNavOpen();
  }

  changeTheme(event): void {
    this.themeService.changeThemes(event.checked);
    this.sliderChecked = this.themeService.checkLocaleStorage();
  }

  onToggleSideNav() {
    this.sideNavVisible = this.sideNavService.toggleSideNav();
  }
}

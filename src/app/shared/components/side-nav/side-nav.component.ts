import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-side-nav-ui',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent implements OnInit {

  sliderChecked: boolean;
  selectedLanguage = 'pl'

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.sliderChecked = this.themeService.checkLocaleStorage();
  }

  changeTheme(event): void {
    this.themeService.changeThemes(event.checked);
    this.sliderChecked = this.themeService.checkLocaleStorage();
  }
}

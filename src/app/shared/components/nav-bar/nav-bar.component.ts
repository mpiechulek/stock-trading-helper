import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-nav-bar-ui',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {

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

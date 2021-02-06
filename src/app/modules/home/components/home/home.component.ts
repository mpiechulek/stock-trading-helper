import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-ui',
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {

  constructor(
    public translate: TranslateService
    ) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('pl');
  }

  ngOnInit(): void {
  }

}

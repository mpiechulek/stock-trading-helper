import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './page/home/home.container';
import { HomeComponent } from './components/home/home.component';

// Translations
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DateTimeComponent } from './components/home/date-time/date-time.component';

@NgModule({
  declarations: [HomeContainerComponent, HomeComponent, DateTimeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule ,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class HomeModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


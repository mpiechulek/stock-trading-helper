import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';

// Translations
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GlobalDialogComponent } from './components/global-dialog/global-dialog.component';

// Materials
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NumberDigitDirective } from './directives/number-digit.directive';

@NgModule({
  declarations: [
    NavBarComponent,
    SideNavComponent,
    FooterComponent,
    NumberDigitDirective,
    GlobalDialogComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,  
    MatButtonModule,
    HttpClientModule,   
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  // entryComponents: [ComicSliderDialogComponent],
  exports: [
    NavBarComponent,
    SideNavComponent,
    TranslateModule,
    FooterComponent,
    NumberDigitDirective,
    GlobalDialogComponent
  ],
  providers: [TranslateService]
})

export class SharedModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


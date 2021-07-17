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
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

import { NumberDigitDirective } from './directives/number-digit.directive';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { RoleAccessesDirective } from './directives/role-accesses.directive';
@NgModule({
  declarations: [
    NavBarComponent,
    SideNavComponent,
    FooterComponent,
    NumberDigitDirective,
    RoleAccessesDirective,
    GlobalDialogComponent,
    LoadingScreenComponent,
    InfoDialogComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ], 
  exports: [
    NavBarComponent,
    SideNavComponent,
    TranslateModule,
    FooterComponent,
    NumberDigitDirective,
    GlobalDialogComponent,
    LoadingScreenComponent,
    InfoDialogComponent,
    RoleAccessesDirective
  ],
  providers: [TranslateService]
})

export class SharedModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


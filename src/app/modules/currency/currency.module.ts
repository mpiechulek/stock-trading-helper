import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyContainerComponent } from './page/currency/currency.container';
import { CurrencyComponent } from './components/currency/currency.component';
import { CurrencyFormComponent } from './components/currency/currency-form/currency-form.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyCryptoComponent } from './components/currency/currency-crypto/currency-crypto.component';
import { CurrencyForeignExchangeComponent } from './components/currency/currency-foreign-exchange/currency-foreign-exchange.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CurrencyContainerComponent,
    CurrencyComponent,
    CurrencyFormComponent,
    CurrencyCryptoComponent,
    CurrencyForeignExchangeComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class CurrencyModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


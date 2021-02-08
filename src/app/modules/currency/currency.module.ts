import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyContainerComponent } from './page/currency/currency.container';
import { CurrencyComponent } from './components/currency/currency.component';


@NgModule({
  declarations: [
    CurrencyContainerComponent,
    CurrencyComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule
  ]
})
export class CurrencyModule { }

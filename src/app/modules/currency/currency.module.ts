import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyContainerComponent } from './page/currency/currency.container';
import { CurrencyComponent } from './components/currency/currency.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CurrencyFormComponent } from './components/currency/currency-form/currency-form.component';

@NgModule({
  declarations: [
    CurrencyContainerComponent,
    CurrencyComponent,
    CurrencyFormComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class CurrencyModule { }

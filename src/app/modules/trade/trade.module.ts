import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeRoutingModule } from './trade-routing.module';
import { TradeContainerComponent } from './page/trade/trade.container';
import { TradeComponent } from './components/trade/trade.component';

@NgModule({
  declarations: [
    TradeContainerComponent,
    TradeComponent
  ],
  imports: [
    CommonModule,
    TradeRoutingModule
  ] 
})
export class TradeModule { }

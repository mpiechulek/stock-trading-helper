import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeRoutingModule } from './trade-routing.module';
import { TradeComponent } from './page/trade/trade.container';


@NgModule({
  declarations: [TradeComponent],
  imports: [
    CommonModule,
    TradeRoutingModule
  ]
})
export class TradeModule { }

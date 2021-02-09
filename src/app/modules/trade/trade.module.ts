import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeRoutingModule } from './trade-routing.module';
import { TradeContainerComponent } from './page/trade/trade.container';
import { TradeComponent } from './components/trade/trade.component';
import { TradeDialogComponent } from './components/trade/trade-dialog/trade-dialog.component';

@NgModule({
  declarations: [
    TradeContainerComponent,
    TradeComponent,
    TradeDialogComponent
  ],
  imports: [
    CommonModule,
    TradeRoutingModule
  ] 
})
export class TradeModule { }

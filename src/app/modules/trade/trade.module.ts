import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradeRoutingModule } from './trade-routing.module';
import { StockTileComponent } from './components/trade/stock-tile/stock-tile.component';
import { TradeContainerComponent } from './page/trade/trade.container';
import { TradeComponent } from './components/trade/trade.component';
import { TradeDialogComponent } from './components/trade/trade-dialog/trade-dialog.component';

// Angular materials

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './../../shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    TradeContainerComponent,
    TradeComponent,
    TradeDialogComponent,
    StockTileComponent
  ],
  imports: [
    CommonModule,
    TradeRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatRadioModule
  ]
})
export class TradeModule { }

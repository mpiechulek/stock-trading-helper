import { Component, Input, OnInit } from '@angular/core';
import { StockSellModel, TransactionWalletModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html'
})

export class StatChartComponent implements OnInit {

  @Input() profitLossesData: any;
  @Input() transactionWallet: TransactionWalletModel[];

  ngOnInit(): void { }


  /**
   * 
   */
  get getProfitLossesData(): any{
    return this.profitLossesData;
  }

  /**
  * 
  */
  get getTransactionWallet(): TransactionWalletModel[] {

    return this.transactionWallet;

  }


}

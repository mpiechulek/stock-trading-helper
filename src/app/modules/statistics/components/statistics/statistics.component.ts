import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockSellModel, TransactionWalletModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-statistics-ui',
  templateUrl: './statistics.component.html'
})

export class StatisticsComponent implements OnInit {

  @Input() transactionsData: StockSellModel[];
  @Input() linearChartData;
  @Input() profitLossesData;
  @Input() transactionWallet: TransactionWalletModel[];

  constructor() { }

  ngOnInit(): void {

  }

  /**
   * 
   */
  get getTransactionsData(): StockSellModel[] {

    return this.transactionsData;

  }

  /**
   * 
   */
  get getTransactionWallet(): TransactionWalletModel[] {
    
    console.log(this.transactionWallet);

    return this.transactionWallet;

  }

}

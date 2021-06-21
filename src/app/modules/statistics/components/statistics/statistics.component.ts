import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { StockSellModel, TransactionWalletModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-statistics-ui',
  templateUrl: './statistics.component.html'
})

export class StatisticsComponent implements OnInit {

  @Input()
  transactionsData: StockSellModel[];

  @Input()
  linearChartData: any;

  @Input()
  profitLossesData: any;

  @Input()
  transactionWallet: TransactionWalletModel[];

  @Output()
  deleteTradePositionFromTable: EventEmitter<string> = new EventEmitter<string>();

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

    return this.transactionWallet;

  }

  /**
   * 
   */
  onDeletePositionFromTable(id: string): void {

    this.deleteTradePositionFromTable.emit(id);

  }

}

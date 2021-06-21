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

  @Input()
  chartColorPallet: Object;

  @Input()
  loseProfitDataMarker: string;

  @Output()
  deleteTradePositionFromTable: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  switchProfitLoseCharts: EventEmitter<string> =  new EventEmitter<string>();

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
  get getChartColorPallet(): Object {

    return this.chartColorPallet;

  }

  /**
   * 
   */
  get getLoseProfitDataMarker(): string {

    return this.loseProfitDataMarker;

  }


  // ===========================================================================

  /**
   * 
   */
  onDeletePositionFromTable(id: string): void {

    this.deleteTradePositionFromTable.emit(id);

  }
  
  /**
   * 
   * @param marker 
   */
   onSwitchProfitLoseCharts(marker: string):void {

    this.switchProfitLoseCharts.emit(marker);
    
  }

}

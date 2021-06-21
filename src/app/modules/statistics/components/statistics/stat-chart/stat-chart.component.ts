import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockSellModel, TransactionWalletModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html'
})

export class StatChartComponent implements OnInit {

  @Input()
  profitLossesData: any;

  @Input()
  transactionWallet: TransactionWalletModel[];

  @Input()
  chartColorPallet: Object;

  @Input()
  loseProfitDataMarker: string;

  @Output()
  switchProfitLoseCharts: EventEmitter<string> =  new EventEmitter<string>();

  ngOnInit(): void { }

  /**
   * 
   */
  get getProfitLossesData(): any {
    return this.profitLossesData;
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

  /**
   * 
   * @param marker 
   */
  onSwitchProfitLoseCharts(marker: string):void {

    this.switchProfitLoseCharts.emit(marker);
    
  }

}

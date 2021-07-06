import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { StockSellModel, TransactionWalletModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html'
})

export class StatChartComponent implements OnInit {

  @Input()
  profitLossesData: any;

  @Input()
  chartColorPallet: Object;

  @Input()
  loseProfitDataMarker: string;

  @Input()
  private transactionWallet: TransactionWalletModel[];
  
  @Input()
  private profitLossesData$: Observable<TransactionWalletModel[]>;

  @Output()
  switchProfitLoseCharts: EventEmitter<string> = new EventEmitter<string>();

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
  */
     get getTransactionWallet(): TransactionWalletModel[] {

      return this.transactionWallet;
  
    }


  /**
  * 
  */
  get getProfitLossesData$(): Observable<TransactionWalletModel[]> {

    return this.profitLossesData$;

  }


  /**
   * 
   * @param marker 
   */
  onSwitchProfitLoseCharts(marker: string): void {

    this.switchProfitLoseCharts.emit(marker);

  }

}

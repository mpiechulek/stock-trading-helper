import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { StockTradeBoardService } from 'src/app/core/services/stock-trade-board.service';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.container.html'

})
export class StatisticsContainerComponent implements OnInit {

  private transactionsSubscription: Subscription;
  private transactionsData: StockSellModel[];

  private transactionsDataSubject = new Subject<StockSellModel[]>();
  private transactionsDataSubject$ = this.transactionsDataSubject.asObservable();

  private transactionsDataSubject2 = new Subject<StockSellModel[]>();
  private transactionsDataSubject2$ = this.transactionsDataSubject2.asObservable();

  constructor(private stockTradeBoardService: StockTradeBoardService) { }

  ngOnInit(): void {

    this.transactionsSubscription =
      this.stockTradeBoardService.getTransactionsArray.subscribe((data) => {

        this.transactionsData = data;
        console.log(this.transactionsData);  

      });

    this.stockTradeBoardService.getTransactionsFromLocalStorage();
  }

  ngOnDestroy(): void {

    if (this.transactionsSubscription) {
      this.transactionsSubscription.unsubscribe();
    }

  }

  /**
   * 
   */
  get getTransactionsData(): StockSellModel[] {

    return this.transactionsData;

  }

  /**
   * 
   * ! tabela edycja i delete    
   * 
   */

}

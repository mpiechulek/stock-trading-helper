import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-statistics-ui',
  templateUrl: './statistics.component.html',

})
export class StatisticsComponent implements OnInit {

  tabLoadTimes: Date[] = [];

  @Input() transactionsData: StockSellModel[];
  @Input() linearChartData;
  @Input() profitLossesData;

  constructor() { }

  ngOnInit(): void {

  }

  /**
   * 
   */
  get getTransactionsData(): StockSellModel[] {
    return this.transactionsData;
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

}

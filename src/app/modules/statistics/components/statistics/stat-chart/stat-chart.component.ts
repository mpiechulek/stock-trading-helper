import { Component, Input, OnInit } from '@angular/core';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html'
})

export class StatChartComponent implements OnInit {

  @Input() profitLossesData;
  @Input() transactionsData;

  ngOnInit(): void { }

  
  /**
   * 
   */
   get getTransactionsData(): StockSellModel[] {
    return this.transactionsData;
  }
  
  /**
   * 
   */
   get getProfitLossesData() {
    return this.profitLossesData;
  }


}

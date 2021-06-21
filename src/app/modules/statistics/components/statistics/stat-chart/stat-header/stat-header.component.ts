import { Component, Input, OnInit } from '@angular/core';
import { StatisticTypeMarker } from 'src/app/data/enums/statistics-markers.enum';
import { TransactionWalletModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-stat-header',
  templateUrl: './stat-header.component.html'
})

export class StatHeaderComponent implements OnInit {

  readonly chosenTypeOfDataForDisplay = StatisticTypeMarker;

  @Input()
  readonly profitLossesData: any;

  @Input()
  readonly loseProfitDataMarker: string;

  constructor() { }

  ngOnInit(): void {

  }

  /**
   * 
   */
  onShowProfitCharts(): void {

    console.log('profit data');

  }

  /**
   * 
   */
  onShowLoseCharts(): void {

    console.log('lode data');

  }

}

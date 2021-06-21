import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { StatisticTypeMarker } from 'src/app/data/enums/statistics-markers.enum';


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

  @Output()
  switchProfitLoseCharts: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  /**
   * 
   */
  onShowProfitCharts(): void {

    this.switchProfitLoseCharts.emit(this.chosenTypeOfDataForDisplay.profit);

  }

  /**
   * 
   */
  onShowLoseCharts(): void {

    this.switchProfitLoseCharts.emit(this.chosenTypeOfDataForDisplay.lose)

  }

}

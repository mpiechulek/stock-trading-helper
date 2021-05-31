import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html'
})

export class StatChartComponent implements OnInit {

  @Input() profitLossesData;

  ngOnInit(): void { }


}

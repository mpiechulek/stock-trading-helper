import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-advanced-pipe-chart',
  templateUrl: './advanced-pipe-chart.component.html'
})
export class AdvancedPipeChartComponent implements OnInit {

  single: any[];

  view = [500, 500];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: [
      '#00A8FF'
    ]
  };

  constructor() {
    Object.assign(this, { single });
    this.onChangeChartSize(innerWidth);
  }

  ngOnInit(): void {

  }

  onResize(event) {
    this.onChangeChartSize(event.target.innerWidth);
  }

  onChangeChartSize(width: number): void {
    if (width < 1440) {
      this.view = [450, 350];
    } else if (width < 1000) {
      this.view = [400, 300];
    } else if (width < 700) {
      this.view = [350, 300];
    } else if (width < 400) {
      this.view = [300, 250];
    }
  }

  onSelect(event) {
    console.log(event);
  }
}

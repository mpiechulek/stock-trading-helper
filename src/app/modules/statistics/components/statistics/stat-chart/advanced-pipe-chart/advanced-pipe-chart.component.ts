import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-advanced-pipe-chart',
  templateUrl: './advanced-pipe-chart.component.html'
})
export class AdvancedPipeChartComponent implements OnInit {

  single: any[];

  view = [500, 800];

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
    this.onChangeChartSize(window.innerWidth);
  }

  ngOnInit(): void {

  }

  onResize(event) {
    this.onChangeChartSize(event.target.innerWidth);
  }

  onChangeChartSize(width: number): void {
    if (width <= 1440 && width > 960) {
      this.view = [500, 800];
    } else if (width <= 960 && width > 800) {
      this.view = [400, 800];
    } else if (width <= 800 && width > 400) {
      this.view = [450, 800];
    }else if (width <= 400 ) {
      this.view = [300, 2000];
    }
  }

  onSelect(event) {
    console.log(event);
  }
}

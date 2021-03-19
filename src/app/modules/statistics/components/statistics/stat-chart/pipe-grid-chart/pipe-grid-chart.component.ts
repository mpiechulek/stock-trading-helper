import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-pipe-grid-chart',
  templateUrl: './pipe-grid-chart.component.html'
})
export class PipeGridChartComponent implements OnInit {

  single: any[];

  view = [500, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: [
      '#D80925',
      '#2196F3'
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
      this.view = [450, 400];
    } else if (width <= 960 && width > 800) {
      this.view = [450, 400];
    } else if (width <= 800 && width > 400) {
      this.view = [350, 200];
    }else if (width <= 400 ) {
      this.view = [300, 200];
    }
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}

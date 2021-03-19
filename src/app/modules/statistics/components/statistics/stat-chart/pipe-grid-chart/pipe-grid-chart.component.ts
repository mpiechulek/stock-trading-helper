import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-pipe-grid-chart',
  templateUrl: './pipe-grid-chart.component.html'
})
export class PipeGridChartComponent implements OnInit {

  single: any[];

  view = [600, 600];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: [
      '#D80925',
      '#07D100'
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

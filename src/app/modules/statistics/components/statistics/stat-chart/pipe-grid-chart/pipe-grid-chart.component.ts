import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-pipe-grid-chart',
  templateUrl: './pipe-grid-chart.component.html'
})
export class PipeGridChartComponent implements OnInit {

  single: any[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: [
      '#2196F3',
      '#D80925'  
    ]
  };

  constructor() {
    Object.assign(this, { single });
  }

  ngOnInit(): void {

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

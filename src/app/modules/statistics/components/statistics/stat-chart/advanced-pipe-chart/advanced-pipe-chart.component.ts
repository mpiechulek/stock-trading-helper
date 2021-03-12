import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-advanced-pipe-chart',
  templateUrl: './advanced-pipe-chart.component.html'
})
export class AdvancedPipeChartComponent implements OnInit {

  single: any[];  

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  animations: boolean = true;
   
  colorScheme = {
    domain: [
      '#2196F3',
      '#D80925',
      '#404040',
      '#858585',
      '#d1d1d1',
      '#00A8FF',
      '#00D3FF',
      '#18BCD6'
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

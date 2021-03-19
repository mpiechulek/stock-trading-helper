import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-advanced-pipe-chart',
  templateUrl: './advanced-pipe-chart.component.html'
})
export class AdvancedPipeChartComponent implements OnInit {

  single: any[];
  
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
  }

  ngOnInit(): void {

  }

  onSelect(event) {
    console.log(event);
  }
}

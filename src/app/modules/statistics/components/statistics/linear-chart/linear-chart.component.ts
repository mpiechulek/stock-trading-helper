import { Component, Input, NgModule, OnInit  } from '@angular/core';
import { multi } from './data';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html' 
})

export class LinearChartComponent implements OnInit {

  @Input() linearChartData;

  multi: any[];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Ballance';
  timeline: boolean = true;
  autoScale: boolean = true;

  colorScheme = {

    domain: ['#2196F3']

  };

  constructor() {
   
  }

  ngOnInit(): void {  
   

  }

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}

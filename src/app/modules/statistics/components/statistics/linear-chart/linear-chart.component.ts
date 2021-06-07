import { Component, HostListener, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html'
})

export class LinearChartComponent implements OnInit {

  @Input() linearChartData;

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Ballance';
  timeline: boolean = true;
  autoScale: boolean = false;
  roundDomains: boolean = true;

  colorScheme = {

    domain: ['#2196F3']

  };

  constructor() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    this.onChangeChartSettings(event.target.innerWidth, event.target.innerHeight);

  }

  ngOnInit(): void {   
    
    this.onChangeChartSettings(window.innerWidth, window.innerHeight);

  }
  
  /**
   * 
   * @param event 
   */
  onChangeChartSettings(innerWidth: number, innerHeight: number): void {

    
    if(innerWidth < 768 && innerHeight < 420) {
      
      this.xAxis = false;
      this.yAxis = false;
      this.showLabels = false;
      this.showXAxisLabel = false;
      this.showYAxisLabel = false;
      
      return;

    }

    if (innerWidth < 768 && innerHeight > 420) {

      this.xAxis = true;
      this.yAxis = true;
      this.showLabels = false;
      this.showXAxisLabel = false;
      this.showYAxisLabel = false;


    } else if (innerWidth > 768 && innerHeight > 420) {

      this.xAxis = true;
      this.yAxis = true;
      this.showLabels = true;
      this.showXAxisLabel = true;
      this.showYAxisLabel = true;

    }
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

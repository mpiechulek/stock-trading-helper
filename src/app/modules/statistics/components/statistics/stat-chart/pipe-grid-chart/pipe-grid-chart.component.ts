import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe-grid-chart',
  templateUrl: './pipe-grid-chart.component.html'
})
export class PipeGridChartComponent implements OnInit {

  
  view = [500, 350];
  
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
  
  @Input() profitLossesData;
  
  constructor() {  

    this.onChangeChartSize(window.innerWidth);
    
  }

  ngOnInit(): void {

  }

  /**
   * 
   * @param event 
   */
  onResize(event) {
    this.onChangeChartSize(event.target.innerWidth);
  }

  /**
   * 
   * @param width 
   */
  onChangeChartSize(width: number): void {

    if (width <= 1440 && width > 960) {

      this.view = [500, 400];
      this.showLabels = true;

    } else if (width <= 960 && width > 800) {

      this.view = [430, 350];
      this.showLabels = true;

    } else if (width <= 800 ) {

      this.view = [450, 200];
      this.showLabels = false;
    } 
  }

  /**
   * 
   * @param data 
   */
  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  /**
   * 
   * @param data 
   */
  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  /**
   * 
   * @param data 
   */
  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}

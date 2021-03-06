import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pipe-grid-chart',
  templateUrl: './pipe-grid-chart.component.html'
})
export class PipeGridChartComponent implements OnInit {
  
  view = [800, 450];
  
  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  
  colorScheme = {
    domain: [
      '#D80925',
      '#2196F3'
    ]
  };
  
  @Input() profitLossesData: any;

  @Output()
  switchProfitLoseCharts: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() {  

    this.onChangeChartSize(window.innerWidth);
    
  }

  ngOnInit(): void {

  }

  /**
   * 
   * @param event 
   */
  onResize(event: any): void {

    this.onChangeChartSize(event.target.innerWidth);

  }

  /**
   * 
   * @param width 
   */
  onChangeChartSize(width: number): void {

    if(width > 1440) {
      this.view = [800, 450];
    }
    else if (width <= 1440 && width > 960) {

      this.view = [500, 400];     

    } else if (width <= 960 && width > 800) {

      this.view = [430, 350];     

    } else if (width <= 800 && width > 400) {

      this.view = [400,400];
     
    } else if (width <= 400 ) {

      this.view = [250,250];
     
    } 
  }

  /**
   * 
   * @param data 
   */
  onSelect(data): void {

    this.switchProfitLoseCharts.emit(data.name); 
    
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

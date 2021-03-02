import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-ui',
  templateUrl: './statistics.component.html',

})
export class StatisticsComponent implements OnInit {

  tabLoadTimes: Date[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }


  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

}

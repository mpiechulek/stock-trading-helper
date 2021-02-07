import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html'
})
export class DateTimeComponent implements OnInit {

  dayNames: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  dateData: Date;
  time: string;
  date: string;
  dayOfTheWeekTranslate: string;

  //============================================================================

  constructor() { }

  ngOnInit(): void {   
    this.calculateCurrentTime();
    this.getCurrentDate() 
  }

  calculateCurrentTime() {
    setInterval(() => {
      this.dateData = new Date();
      this.time = this.dateData.toLocaleTimeString();      
    }, 1000);
  }

  getCurrentDate() {
    this.dateData = new Date();
    this.date = this.dateData.toLocaleDateString();   
    this.dayOfTheWeekTranslate = this.dayNames[(this.dateData.getDate()) - 1];
  }
}

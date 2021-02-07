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
  dayOfTheWeek: string;

  constructor() { }

  ngOnInit(): void {

    this.dateData = new Date();
    this.date = this.dateData.toLocaleDateString();   
    this.dayOfTheWeek = this.dayNames[(this.dateData.getDate()) - 1];

    this.calculateCurrentTime();
  }

  calculateCurrentTime() {
    setInterval(() => {
      this.dateData = new Date();
      this.time = this.dateData.toLocaleTimeString();      
    }, 1000);
  }
}

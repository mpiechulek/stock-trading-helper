import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { homeDateModel } from 'src/app/data/models/home-date.model';

@Injectable({
  providedIn: 'root'
})

export class DateTimePresenterService {

  private dayNames: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  timeData$ = new Subject<string>();
  dateObject$ = new Subject<homeDateModel>();

  constructor() { }

  ngOnInit(): void {

  }

  getTime(): Observable<string> {
    this.calculateCurrentTime()
    return this.timeData$.asObservable();
  }

  calculateCurrentTime() {
    setInterval(() => {
      const dateData = new Date();
      let time = dateData.toLocaleTimeString();
      this.timeData$.next(time);
    }, 1000);
  }

  getDateData(): Observable<homeDateModel> {
    this.generateDateObject();
    return this.dateObject$.asObservable();
  }

  async generateDateObject() {
    const object = await {
      dayOfWeek: this.getDayOfWeek(),
      date: this.getCurrentDate()
    }

    this.dateObject$.next(object);
  }

  getCurrentDate(): string {
    const dateData = new Date();
    return dateData.toLocaleDateString();
  }

  getDayOfWeek(): string {
    const dateData = new Date();

    if (dateData.getDay() === 0) {
      return this.dayNames[6];
    }
    
    return this.dayNames[dateData.getDay() - 1];
  }

}

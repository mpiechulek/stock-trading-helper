import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { homeDateModel } from 'src/app/data/models/home-date.model';
import { DateTimePresenterService } from './date-time.presenter';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  providers: [DateTimePresenterService]
})
export class DateTimeComponent implements OnInit, OnDestroy {

  time: string;
  dateObject: homeDateModel;

  dateObjectSubscription: Subscription;
  timeSubscription: Subscription;

  constructor(private dateTimePresenterService: DateTimePresenterService) { }

  ngOnInit(): void {
    // Initializing the service   

    // Getting time data from service
    this.timeSubscription = this.dateTimePresenterService.getTime().subscribe((time) => {
      this.time = time;
      console.log(this.time);      
    });
    
    // Getting date data from service
    this.dateObjectSubscription = this.dateTimePresenterService.getDateData().subscribe((dateData) => {
        this.dateObject = dateData;
        console.log(this.dateObject);
        
    });
  }

  ngOnDestroy(): void {

    if (!!this.timeSubscription) {
      this.timeSubscription.unsubscribe();
      console.log('destory time');
    }

    if (!!this.dateObjectSubscription) {
      this.dateObjectSubscription.unsubscribe();
      console.log('destory date');
    }

  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatButtonModule } from '@angular/material/button';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarContainerComponent } from './page/calendar/calendar.container';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalComponentComponent } from './components/calendar/cal-component/cal-component.component';
import { CalendarHeaderComponent } from './components/calendar/cal-component/utils/calendar-header.component';

@NgModule({
  declarations: [
    CalendarContainerComponent,
    CalendarComponent,
    CalComponentComponent,
    CalendarHeaderComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatButtonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class CalendarDateModule { }

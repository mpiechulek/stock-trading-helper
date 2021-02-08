import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarContainerComponent } from './page/calendar/calendar.container';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    CalendarContainerComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }

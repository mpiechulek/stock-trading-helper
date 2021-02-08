import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarContainerComponent } from './page/calendar/calendar.container';

const routes: Routes = [
  {
    path: '',  
    children: [
      {
        path: 'calendar',
        component: CalendarContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }

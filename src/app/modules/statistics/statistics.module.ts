import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsContainerComponent } from './page/statistics/statistics.container';
import { StatisticsComponent } from './components/statistics/statistics.component';


@NgModule({
  declarations: [
    StatisticsContainerComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }

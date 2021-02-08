import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsContainerComponent } from './page/statistics/statistics.container';

const routes: Routes = [
  {
    path: '',  
    children: [
      {
        path: 'trade',
        component: StatisticsContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }

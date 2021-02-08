import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorContainerComponent } from './page/calculator/calculator.container';

const routes: Routes = [
  {
    path: '',  
    children: [
      {
        path: 'calculator',
        component: CalculatorContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorRoutingModule { }

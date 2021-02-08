import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyContainerComponent } from './page/currency/currency.container';

const routes: Routes = [
  {
    path: '',  
    children: [
      {
        path: 'currency',
        component: CurrencyContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }

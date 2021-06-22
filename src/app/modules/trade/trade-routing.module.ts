import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeContainerComponent } from './page/trade/trade.container';

const routes: Routes = [
  {
    path: '',  
    children: [
      {
        path: '',
        component: TradeContainerComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule { }

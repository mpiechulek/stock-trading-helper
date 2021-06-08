import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main/main-layout.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/',
    pathMatch:'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => 
          import('./modules/home/home.module').then(
            m => m.HomeModule
          )
      },
      {
        path: '',
        loadChildren: () => 
          import('./modules/trade/trade.module').then(
            m => m.TradeModule
          )
      },
      {
        path: '',
        loadChildren: () => 
          import('./modules/calculator/calculator.module').then(
            m => m.CalculatorModule
          )
      },
      {
        path: '',
        loadChildren: () => 
          import('./modules/currency/currency.module').then(
            m => m.CurrencyModule
          )
      },
      {
        path: '',
        loadChildren: () => 
          import('./modules/statistics/statistics.module').then(
            m => m.StatisticsModule
          )
      },
      // {
      //   path: '',
      //   loadChildren: () => 
      //     import('./modules/calendar/calendar.module').then(
      //       m => m.CalendarDateModule
      //     )
      // },
      { path: '**', redirectTo: '/', pathMatch: 'full' } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

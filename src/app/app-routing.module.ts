import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './data/enums/role.enum';
import { AuthLayoutComponent } from './layout/auth/auth-layout.component';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { NotFoundPageComponent } from './layout/not-found-page/not-found-page.component';

const routes: Routes = [

	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	{
		path: 'auth',
		component: AuthLayoutComponent,
		loadChildren: () =>
			import('./modules/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'main',
		component: MainLayoutComponent,
		children: [
			{
				path: 'home',
				data: {
					title: 'Home | Stock Helper'
				},
				canActivate: [AuthGuard],
				loadChildren: () =>
					import('./modules/home/home.module').then(
						m => m.HomeModule
					)
			},
			{
				path: 'trade',
				data: {
					title: 'Trade | Stock Helper '
				},
				canActivate: [AuthGuard],
				loadChildren: () =>
					import('./modules/trade/trade.module').then(
						m => m.TradeModule
					)
			},
			{
				path: 'calculator',
				canActivate: [AuthGuard],
				data: {
					roles: Role.Trader,
					title: 'Calculator | Stock Helper'
				},
				loadChildren: () =>
					import('./modules/calculator/calculator.module').then(
						m => m.CalculatorModule
					)
			},
			{
				path: 'currency',
				data: {
					title: 'Currency | Stock Helper'
				},
				canActivate: [AuthGuard],
				loadChildren: () =>
					import('./modules/currency/currency.module').then(
						m => m.CurrencyModule
					)
			},
			{
				path: 'statistics',
				canActivate: [AuthGuard],
				data: { 
					roles: Role.Trader,
					title: 'Statistics | Stock Helper '
				 },
				loadChildren: () =>
					import('./modules/statistics/statistics.module').then(
						m => m.StatisticsModule
					)
			},
			// {
			//   path: 'calendar',
			//   canActivate: [AuthGuard],
			//   loadChildren: () => 
			//     import('./modules/calendar/calendar.module').then(
			//       m => m.CalendarDateModule
			//     )
			// },

		]
	},
	{
		path: '404',
		component: NotFoundPageComponent,
		loadChildren: () =>
			import('./modules/not-found-404/not-found-404.module').then(m => m.NotFound404Module)
	},
	{ path: '**', redirectTo: '404' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

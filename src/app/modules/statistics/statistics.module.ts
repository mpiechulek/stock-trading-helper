import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsContainerComponent } from './page/statistics/statistics.container';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TableComponent } from './components/statistics/table/table.component';
import { LinearChartComponent } from './components/statistics/linear-chart/linear-chart.component';
import { StatChartComponent } from './components/statistics/stat-chart/stat-chart.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdvancedPipeChartComponent } from './components/statistics/stat-chart/advanced-pipe-chart/advanced-pipe-chart.component';
import { PipeGridChartComponent } from './components/statistics/stat-chart/pipe-grid-chart/pipe-grid-chart.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { StatHeaderComponent } from './components/statistics/stat-chart/stat-header/stat-header.component';

@NgModule({
  declarations: [
    StatisticsContainerComponent,
    StatisticsComponent,
    TableComponent,
    LinearChartComponent,
    StatChartComponent,
    AdvancedPipeChartComponent,
    PipeGridChartComponent,
    StatHeaderComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })

  ]
})
export class StatisticsModule { }


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

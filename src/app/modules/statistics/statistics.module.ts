import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsContainerComponent } from './page/statistics/statistics.container';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TableComponent } from './components/statistics/table/table.component';
import { LinearChartComponent } from './components/statistics/linear-chart/linear-chart.component';
import { StatChartComponent } from './components/statistics/stat-chart/stat-chart.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    StatisticsContainerComponent,
    StatisticsComponent,
    TableComponent,
    LinearChartComponent,
    StatChartComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class StatisticsModule { }

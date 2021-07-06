import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFound404RoutingModule } from './not-found-404-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotFoundContainerComponent } from './page/not-found/not-found.container';

@NgModule({
  declarations: [
    NotFoundComponent,
    NotFoundContainerComponent
  ],
  imports: [
    CommonModule,
    NotFound404RoutingModule
  ]
})
export class NotFound404Module { }

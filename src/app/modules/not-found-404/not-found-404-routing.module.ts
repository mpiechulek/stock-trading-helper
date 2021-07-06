import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundContainerComponent } from './page/not-found/not-found.container';

const routes: Routes = [
  {
    path: '',  
    children: [
      {
        path: '',
        component: NotFoundContainerComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFound404RoutingModule { }

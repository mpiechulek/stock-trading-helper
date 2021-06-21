import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainerComponent } from './page/auth/auth.container';
import { AuthComponent } from './components/auth/auth.component';


@NgModule({
  declarations: [
    AuthContainerComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

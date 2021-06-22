import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainerComponent } from './page/auth/auth.container';
import { AuthComponent } from './components/auth/auth.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { SideImageComponent } from './components/auth/side-image/side-image.component';


@NgModule({
  declarations: [
    AuthContainerComponent,
    AuthComponent,
    LoginFormComponent,
    SideImageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

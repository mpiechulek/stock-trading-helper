import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/auth/login.component';
import { LoginContainerComponent } from './page/login/login.container';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';

@NgModule({
  declarations: [
    LoginContainerComponent,
    LoginComponent,
    LoginFormComponent,
   
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

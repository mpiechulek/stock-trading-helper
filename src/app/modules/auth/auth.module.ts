import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/auth/login.component';
import { LoginContainerComponent } from './page/login/login.container';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
@NgModule({
  declarations: [
    LoginContainerComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})

export class AuthModule { }
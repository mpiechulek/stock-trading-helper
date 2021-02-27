import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorContainerComponent } from './page/calculator/calculator.container';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalcDeviceComponent } from './components/calculator/calc-device/calc-device.component';
import { CalcFormComponent } from './components/calculator/calc-form/calc-form.component';
import { ResultBoardComponent } from './components/calculator/result-board/result-board.component';
import { ResultComponent } from './components/calculator/calc-form/result/result.component';
import { HeaderComponent } from './components/calculator/calc-form/header/header.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './../../shared/shared.module';
import { FormComponent } from './components/calculator/calc-form/form/form.component';

@NgModule({
  declarations: [
    CalculatorContainerComponent,
    CalculatorComponent,
    CalcDeviceComponent,
    CalcFormComponent,
    ResultBoardComponent,
    FormComponent,
    ResultComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class CalculatorModule { }

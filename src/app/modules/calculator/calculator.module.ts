import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorContainerComponent } from './page/calculator/calculator.container';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalcDeviceComponent } from './components/calculator/calc-device/calc-device.component';
import { CalcFormComponent } from './components/calculator/calc-form/calc-form.component';
import { ResultBoardComponent } from './components/calculator/result-board/result-board.component';

@NgModule({
  declarations: [
    CalculatorContainerComponent,
    CalculatorComponent,
    CalcDeviceComponent,
    CalcFormComponent,
    ResultBoardComponent
  ],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
  ]
})
export class CalculatorModule { }

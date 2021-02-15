import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorContainerComponent } from './page/calculator/calculator.container';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalcDeviceComponent } from './components/calculator/calc-device/calc-device.component';

@NgModule({
  declarations: [
    CalculatorContainerComponent,
    CalculatorComponent,
    CalcDeviceComponent
  ],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
  ]
})
export class CalculatorModule { }

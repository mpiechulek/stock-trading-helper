import { Component, Input, OnInit } from '@angular/core';
import { AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-calculator-ui',
  templateUrl: './calculator.component.html' 
})
export class CalculatorComponent implements OnInit {

  @Input() calculationResults: AdvanceCalculatorResultDataModel;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html'

})
export class CalcFormComponent implements OnInit {

  private formExpand: number;

  @Input() calculationResults: AdvanceCalculatorResultDataModel;

  constructor() { }

  ngOnInit(): void {
  }

  get getFormExpand(): number {
    return this.formExpand;
  }

  onCalculate() {

  }

}

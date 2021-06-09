import { Component, Input, OnInit } from '@angular/core';
import { AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  // When 0 the expansion panel is default opened, 1 closed
  @Input()
  formExpand: number = 1;

  @Input()
  readonly calculationResults: AdvanceCalculatorResultDataModel;

  constructor() { }

  ngOnInit(): void {
  }

  // Toggle expansion pane 
  setStep() {

  }



}

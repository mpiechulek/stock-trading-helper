import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdvanceCalculatorFormStringDataModel, AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-calculator-ui',
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit {

  @Input() calculationResults: AdvanceCalculatorResultDataModel;

  @Output()
  outputFormData: EventEmitter<AdvanceCalculatorFormStringDataModel> =
    new EventEmitter<AdvanceCalculatorFormStringDataModel>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param calcData 
   */
  calculate(calcData: AdvanceCalculatorFormStringDataModel): void {

    return this.outputFormData.emit(calcData);

  }


}

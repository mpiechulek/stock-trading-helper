import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdvanceCalculatorFormStringDataModel, AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html'

})
export class CalcFormComponent implements OnInit {

  private formExpand: number;

  @Input() calculationResults: AdvanceCalculatorResultDataModel;

  @Output()
  outputFormData: EventEmitter<AdvanceCalculatorFormStringDataModel> =
      new EventEmitter<AdvanceCalculatorFormStringDataModel>();

  constructor() { }

  ngOnInit(): void {
  }

  get getFormExpand(): number {

    return this.formExpand;

  }

  /**
   * 
   * @param calcData 
   */
   calculate(calcData: AdvanceCalculatorFormStringDataModel): void {

    return this.outputFormData.emit(calcData);

   }

}

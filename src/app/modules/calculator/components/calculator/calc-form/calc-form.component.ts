import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdvanceCalculatorFormStringDataModel, AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html'

})
export class CalcFormComponent implements OnInit {

  @Input()
  private formExpand: number;

  @Input() readonly calculationResults: AdvanceCalculatorResultDataModel;

  @Output()
  outputFormData: EventEmitter<AdvanceCalculatorFormStringDataModel> =
    new EventEmitter<AdvanceCalculatorFormStringDataModel>();

  @Output()
  public toggleExpandForm: EventEmitter<any> = new EventEmitter<any>();

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

  /**
   * 
   */
  onToggleExpandForm(): void {    

    this.toggleExpandForm.emit();

  }

}

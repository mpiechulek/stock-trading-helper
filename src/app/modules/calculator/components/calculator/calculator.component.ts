import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvanceCalculatorFormStringDataModel, AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-calculator-ui',
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit {

  @Input()
  readonly calculationResults: AdvanceCalculatorResultDataModel;

  @Input()
  readonly arrayOfResults: Object[];

  @Input()
  readonly chosenResultObservable: Observable<string>;

  @Output()
  outputFormData: EventEmitter<AdvanceCalculatorFormStringDataModel> =
    new EventEmitter<AdvanceCalculatorFormStringDataModel>();

  @Output()
  resultArrayEmitter = new EventEmitter<Object[]>();

  @Output()
  resetResultArray: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  chosenResult: EventEmitter<string> = new EventEmitter<string>();

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

  /**
   * 
   */
  onSaveResultToArray(calculationResultObject: any): void {

    this.resultArrayEmitter.emit(calculationResultObject);

  }

  /**
   * 
   */
  onResetBoardOfResults(): void {

    this.resetResultArray.emit();

  }

  /**
 * 
 */
  onChoseResult(chosenResult: string): void {

    this.chosenResult.emit(chosenResult);

  }


}

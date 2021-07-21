import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvanceCalculatorFormStringDataModel, AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-calculator-ui',
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit {

  public chosenResult$: Observable<string>;

  @Input()
  readonly calculationResults: AdvanceCalculatorResultDataModel;

  @Input()
  readonly arrayOfResults: Object[];

  @Input()
  readonly formExpand: number;

  @Input()
  set setChosenResult$(data) {

      this.chosenResult$ = data;

  }

  @Output()
  outputFormData: EventEmitter<AdvanceCalculatorFormStringDataModel> =
    new EventEmitter<AdvanceCalculatorFormStringDataModel>();

  @Output()
  resultArrayEmitter = new EventEmitter<Object[]>();

  @Output()
  resetResultArray: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  chosenResult: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public toggleExpandForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   */
  get getFormExpand(): number {

    return this.formExpand;

  }  

  /**
   * 
   */
   get getChosenResult(): Observable<string> {

    return this.chosenResult$;

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

    /**
   * 
   */
     onToggleExpandForm(): void {    

      this.toggleExpandForm.emit();
  
    }


}

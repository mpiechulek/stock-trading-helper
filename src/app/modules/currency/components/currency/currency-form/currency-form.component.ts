import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CurrencyApiDataModel } from '../../../../../data/models/currency.model';
import { CurrencyFormService } from '../../../../../core/services/currency-form.service';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html'
})

export class CurrencyFormComponent implements OnInit {

  private currencySelectListContainer: Object[];
  private currencyFormData: FormGroup;

  @Output()
  fetchCurrencyData: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  swapCuriencies = new EventEmitter();

  @Output()
  typeValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  chosenCurrencyLocal: EventEmitter<string> = new EventEmitter<string>();


  @Input()
  readonly currencyData: CurrencyApiDataModel;

  @Input()
  readonly currencyCalcultionResult: number;

  constructor(
    private formBuilder: FormBuilder,
    private currencyFormService: CurrencyFormService
  ) { }

  ngOnInit(): void {

    this.currencySelectListContainer = this.currencyFormService.currencyArr;

    this.currencyFormData = this.formBuilder.group({
      currencyOneQuantity: [1, [
        Validators.required
      ]],
      currencyTwoResult: [1, [
        Validators.required
      ]],
      currencyOneName: [this.currencyFormService.currencyOne, [
        Validators.required
      ]],
      currencyTwoName: [this.currencyFormService.currencyTwo, [
        Validators.required
      ]]
    });

    this.onCalculateResult();
  }

  get currencyForm(): FormGroup {
    return this.currencyFormData;
  }

  set currencyForm(value: FormGroup) {
    this.currencyFormData = value;
  }

  get currencySelectList(): Object[] {
    return this.currencySelectListContainer;
  }

  /**
   * Fetching currency data from backend
   * @param currencyName 
   */
  onSelectCurrencyOne(currencyName: string) {
    this.fetchCurrencyData.emit(currencyName);
  }

  /**
   * 
   */
  onCalculateResult() {

    if (this.currencyFormData.value.currencyOneQuantity === '') return;

    if (this.currencyFormData.value.currencyTwoResult === '') return;

    const result =
      this.currencyFormData.value.currencyOneQuantity *
      this.currencyData.rates[this.currencyFormData.value.currencyTwoName]

    this.currencyFormData.patchValue({ currencyTwoResult: result });
  }

  /**
   * 
   */
  onSwapCurrencies() {

    const currencyOne = this.currencyFormData.value.currencyOneName;
    const currencyTwo = this.currencyFormData.value.currencyTwoName;

    this.currencyFormData.patchValue({
      currencyOneName: currencyTwo,
      currencyTwoName: currencyOne
    });

    this.onSelectCurrencyOne(this.currencyFormData.value.currencyOneName);

    // this.onCalculateResult();
  }

}

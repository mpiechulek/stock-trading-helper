import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyApiDataModel } from '../../../../../data/models/currency.model';
import { CurrencyFormPresenterService } from './currency-form.presenter';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  providers: [CurrencyFormPresenterService]

})
export class CurrencyFormComponent implements OnInit {

  private currencyOneContainer: string;
  private currencyTwoContainer: string;
  private currencySelectListContainer: Object[];

  @Output()
  chosenCurrency: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  readonly currencyData: CurrencyApiDataModel;

  constructor(
    private formBuilder: FormBuilder,
    private currencyFormPresenterService: CurrencyFormPresenterService
  ) { }

  ngOnInit(): void {
    this.currencyOneContainer = this.currencyFormPresenterService.currencyOne;
    this.currencyTwoContainer = this.currencyFormPresenterService.currencyTwo;
    this.currencySelectListContainer = this.currencyFormPresenterService.currencyArr;
  }

  get currencySelectList(): Object[] {
    return this.currencySelectListContainer;
  }

  get currencyTwo(): string {
    return this.currencyOneContainer;
  }

  set currencyTwo(value: string) {
    this.currencyOneContainer = value;
  }

  get currencyOne(): string {
    return this.currencyOneContainer;
  }

  set currencyOne(value: string) {
    this.currencyOneContainer = value;
  }

  /**
   * 
   * @param currencyName 
   */
  onSelectCurrencyOne(currencyName: string) {
    this.chosenCurrency.emit(currencyName);
  }

  /**
   * 
   * @param currencyName 
   */
  onSelectCurrencyTwo(currencyName: string) {

    this.currencyTwo = currencyName;

  }

  onSwapCurrencies() {

  }
}

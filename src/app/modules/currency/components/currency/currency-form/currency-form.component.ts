import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CurrencyApiDataModel } from '../../../../../data/models/currency.model';
import { CurrencyFormService } from '../../../../../core/services/currency-form.service';
import { ifError } from 'assert';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html'
})

export class CurrencyFormComponent implements OnInit {

  private currencySelectListContainer: Object[];
  private currencyFormData: FormGroup;

  private currencyCalculationResultSubscription: Subscription;

  @Output()
  fetchCurrencyData: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  swapCurrencies = new EventEmitter();

  @Output()
  currencyQuantity: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  chosenCurrencyLocal: EventEmitter<string> = new EventEmitter<string>();


  @Input()
  readonly currencyData: CurrencyApiDataModel;

  @Input()
  readonly currencyCalculationResult$: Observable<number>;

  @Input()
  readonly firstCurrencyName: string;

  @Input()
  readonly secondCurrencyName: string;

  constructor(
    private formBuilder: FormBuilder,
    private currencyFormService: CurrencyFormService
  ) { }

  ngOnInit(): void {

    this.currencyCalculationResultSubscription =
      this.currencyCalculationResult$
        .subscribe((res) => {
          this.currencyFormData.patchValue({ currencyTwoResult: res })
        });

    this.currencySelectListContainer = this.currencyFormService.currencyArr;

    this.currencyFormData = this.formBuilder.group({
      currencyOneQuantity: [1, [
        Validators.required
      ]],
      currencyTwoResult: ['', [
        Validators.required
      ]],
      currencyOneName: [this.currencyFormService.currencyOne, [
        Validators.required
      ]],
      currencyTwoName: [this.currencyFormService.currencyTwo, [
        Validators.required
      ]]
    });

  }

  ngOnDestroy() {

    if (this.currencyCalculationResultSubscription) {
      this.currencyCalculationResultSubscription.unsubscribe();
    }

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
  onTypeCurrencyQuantity(event) {
    // if (event.target.value === null || event.target.value === '') return;
    this.currencyQuantity.emit(event.target.value);
  }

  /**
   * 
   */
  onSwapCurrencies() {
    this.swapCurrencies.emit();
  }

  /**
 * 
 */
  onSelectCurrencyTwo(currencyName: string) {
    this.chosenCurrencyLocal.emit();
  }

}

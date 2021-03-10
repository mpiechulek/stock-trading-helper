import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CurrencyApiDataModel } from '../../../../../data/models/currency.model';
import { CurrencyFormService } from '../../../../../core/services/currency-form.service';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html'
})

export class CurrencyFormComponent implements OnInit {

  private currencySelectListContainer: Object[];
  private currencyFormData: FormGroup;

  private currencyCalculationResultSubscription: Subscription;
  private firstCurrencyNameSubscription: Subscription;
  private secondCurrencyNameSubscription: Subscription;

  @Output()
  fetchCurrencyData: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  swapCurrencies = new EventEmitter();

  @Output()
  currencyQuantity: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  choseCurrencyTwo: EventEmitter<string> = new EventEmitter<string>();


  @Input()
  readonly currencyData: CurrencyApiDataModel;

  @Input()
  private currencyCalculationResult$: Observable<number>;

  @Input()
  private secondCurrencyName$: Observable<number>;

  @Input()
  private firstCurrencyName$: Observable<number>;


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


    this.firstCurrencyNameSubscription =
      this.firstCurrencyName$
        .subscribe((res) => {
          this.currencyFormData.patchValue({ currencyOneName: res })
        });


    this.secondCurrencyNameSubscription =
      this.secondCurrencyName$
        .subscribe((res) => {
          this.currencyFormData.patchValue({ currencyTwoName: res })
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
    if (this.firstCurrencyNameSubscription) {
      this.firstCurrencyNameSubscription.unsubscribe();
    }
    if (this.secondCurrencyNameSubscription) {
      this.secondCurrencyNameSubscription.unsubscribe();
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
   * @param event 
   */
  onTypeCurrencyQuantity(event) {
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
   * @param currencyName 
   */
  onSelectCurrencyTwo(currencyName: string) {
    this.choseCurrencyTwo.emit(currencyName);
  }

}

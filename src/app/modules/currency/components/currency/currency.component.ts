import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyApiDataModel } from '../../../../data/models/currency.model';

@Component({
  selector: 'app-currency-ui',
  templateUrl: './currency.component.html'

})
export class CurrencyComponent implements OnInit {

  @Input()
  readonly currencyData: CurrencyApiDataModel;

  @Input()
  readonly currencyCalculationResult$: Observable<number>;

  @Input()
  readonly firstCurrencyName$: Observable<string>;

  @Input()
  readonly secondCurrencyName$: Observable<string>;


  @Output()
  chosenCurrency: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  swapCurrencies = new EventEmitter();

  @Output()
  currencyQuantity: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param currencyName 
   */
  onChoseCurrency(currencyName: string): void {
    this.chosenCurrency.emit(currencyName);
  }

  onSwapCurrencies() {
    this.swapCurrencies.emit();
  }

  onTypeCurrencyQuantity(quantity: number): void { 
    this.currencyQuantity.emit(quantity);
   }

}

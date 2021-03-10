import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyApiDataModel } from '../../../../data/models/currency.model';

@Component({
  selector: 'app-currency-ui',
  templateUrl: './currency.component.html'

})
export class CurrencyComponent implements OnInit {

  @Input()
  readonly currencyData: CurrencyApiDataModel;

  @Output()
  chosenCurrency: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param currencyName 
   */
  onChoseCurrency(currencyName: string): void {
    console.log('fdfdsfsdfsdfsdfdbnv ff');    
    this.chosenCurrency.emit(currencyName);
  }


}

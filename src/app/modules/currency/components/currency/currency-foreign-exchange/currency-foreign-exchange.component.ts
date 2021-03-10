import { Component, Input, OnInit } from '@angular/core';
import { CurrencyApiDataModel } from '../../../../../data/models/currency.model';

@Component({
  selector: 'app-currency-foreign-exchange',
  templateUrl: './currency-foreign-exchange.component.html'  
})
export class CurrencyForeignExchangeComponent implements OnInit {

  @Input()
  readonly currencyData: CurrencyApiDataModel;

  constructor() { }

  ngOnInit(): void {
  }

}

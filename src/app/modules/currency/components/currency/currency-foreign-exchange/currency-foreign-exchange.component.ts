import { Component, Input, OnInit } from '@angular/core';
import { CurrencyFromService } from '../../../../../core/services/currency-form.service';
import { CurrencyApiDataModel } from '../../../../../data/models/currency.model';

@Component({
  selector: 'app-currency-foreign-exchange',
  templateUrl: './currency-foreign-exchange.component.html'  
})
export class CurrencyForeignExchangeComponent implements OnInit {

  @Input()
  readonly currencyData: CurrencyApiDataModel;

  public currenciesList: Object[];

  constructor(private currencyFromService: CurrencyFromService) { }

  ngOnInit(): void {

    this.currenciesList = this.currencyFromService.currencyListArr;
  } 

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyFacadeService } from '../../../../core/services/facades/currency.facade';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.container.html',
 
})
export class CurrencyContainerComponent implements OnInit {

  currencyData$: Observable<any>;

  constructor(private currencyFacadeService: CurrencyFacadeService) { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param currencyName 
   */
  fetchCurrencyData(currencyName: string): void {
    this.currencyData$ = this.currencyFacadeService.getCurrencyData(currencyName);
  }

}

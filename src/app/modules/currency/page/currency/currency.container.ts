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
    this.fetchCurrencyData('USD'); 
  }

  get currencyData(): any {
    return this.currencyData$;
  }

  /**
   * 
   * @param currencyName 
   */
  fetchCurrencyData(currencyName: string): void {
    console.log('fsfdfdfsdfdfsdfsd');
    
    this.currencyData$ = this.currencyFacadeService.getCurrencyData(currencyName);
  }

}

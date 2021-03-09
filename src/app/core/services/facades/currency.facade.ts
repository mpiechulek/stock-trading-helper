import { Injectable } from '@angular/core';
import { CurrencyService } from '../../../data/api/currency.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFacadeService {

  constructor(private currencyService: CurrencyService) { }

  /**
   * 
   * @param currencyName 
   * @returns 
   */
  getCurrencyData(currencyName: string) {
    return this.currencyService.getCurrencyData(currencyName)
      .pipe(
        tap(data => console.log(data))
      )
  }

}

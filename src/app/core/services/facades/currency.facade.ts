import { Injectable } from '@angular/core';
import { CurrencyService } from '../../../data/api/currency.service';
import { tap } from 'rxjs/operators';
import { CurrencyApiDataModel } from '../../../data/models/currency.model';
import { Observable } from 'rxjs';

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
  getCurrencyData(currencyName: string): Observable<CurrencyApiDataModel>{
    return this.currencyService.getCurrencyData(currencyName);    
  }

}

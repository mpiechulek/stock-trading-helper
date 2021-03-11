import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CryptoCurrencyApiModel, CurrencyApiDataModel } from './../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param currencyName 
   * @returns 
   */
  getCurrencyData(currencyName: string): Observable<CurrencyApiDataModel> {
    return this.http.get<CurrencyApiDataModel>(`https://api.exchangerate-api.com/v4/latest/${currencyName}`);
  }

  /**
   * 
   * @param currencyName 
   * @returns 
   */
  getBitCoinData(): Observable<CryptoCurrencyApiModel> {
    return this.http.get<CryptoCurrencyApiModel>(`https://api.cryptonator.com/api/full/btc-usd`);
  }

  /**
   * 
   * @param currencyName 
   * @returns 
   */
  getEthereumData(): Observable<CryptoCurrencyApiModel> {
    return this.http.get<CryptoCurrencyApiModel>(`https://api.cryptonator.com/api/full/eth-usd`);
  }
}

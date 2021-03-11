import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrencyApiDataModel} from './../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencyData(currencyName: string): Observable<CurrencyApiDataModel> {
   return  this.http.get<CurrencyApiDataModel>(`https://api.exchangerate-api.com/v4/latest/${currencyName}`);    
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencyData(currencyName: string): Observable<any> {
   return  this.http.get<any>(`https://api.exchangerate-api.com/v4/latest/${currencyName}`);    
  }
}

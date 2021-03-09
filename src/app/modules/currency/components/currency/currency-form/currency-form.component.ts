import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html'

})
export class CurrencyFormComponent implements OnInit {

  currency = [
    { id: 1, viewValue: 'AED', value: 'AED' },
    { id: 2, viewValue: 'ARS', value: 'ARS' },
    { id: 3, viewValue: 'AUD', value: 'AUD' },
    { id: 4, viewValue: 'BGN', value: 'BGN' },
    { id: 5, viewValue: 'BRL', value: 'BRL' },
    { id: 6, viewValue: 'BSD', value: 'BSD' },
    { id: 7, viewValue: 'CAD', value: 'CAD' },
    { id: 8, viewValue: 'CHF', value: 'CHF' },
    { id: 9, viewValue: 'CLP', value: 'CLP' },
    { id: 10, viewValue: 'CNY', value: 'CNY' },
    { id: 11, viewValue: 'COP', value: 'COP' },
    { id: 12, viewValue: 'CZK', value: 'CZK' },
    { id: 13, viewValue: 'DKK', value: 'DKK' },
    { id: 14, viewValue: 'DOP', value: 'DOP' },
    { id: 15, viewValue: 'EGP', value: 'EGP' },
    { id: 16, viewValue: 'EUR', value: 'EUR' },
    { id: 17, viewValue: 'FJD', value: 'FJD' },
    { id: 18, viewValue: 'GBP', value: 'GBP' },
    { id: 19, viewValue: 'GTQ', value: 'GTQ' },
    { id: 20, viewValue: 'HKD', value: 'HKD' },
    { id: 21, viewValue: 'HRK', value: 'HRK' },
    { id: 22, viewValue: 'HUF', value: 'HUF' },
    { id: 23, viewValue: 'IDR', value: 'IDR' },
    { id: 24, viewValue: 'ILS', value: 'ILS' },
    { id: 25, viewValue: 'INR', value: 'INR' },
    { id: 26, viewValue: 'ISK', value: 'ISK' },
    { id: 27, viewValue: 'JPY', value: 'JPY' },
    { id: 28, viewValue: 'KRW', value: 'KRW' },
    { id: 29, viewValue: 'KZT', value: 'KZT' },
    { id: 30, viewValue: 'MXN', value: 'MXN' },
    { id: 31, viewValue: 'MYR', value: 'MYR' },
    { id: 32, viewValue: 'NOK', value: 'NOK' },
    { id: 33, viewValue: 'NZD', value: 'NZD' },
    { id: 34, viewValue: 'PAB', value: 'PAB' },
    { id: 35, viewValue: 'PEN', value: 'PEN' },
    { id: 36, viewValue: 'PHP', value: 'PHP' },
    { id: 37, viewValue: 'PKR', value: 'PKR' },
    { id: 38, viewValue: 'PLN', value: 'PLN' },
    { id: 39, viewValue: 'PYG', value: 'PYG' },
    { id: 40, viewValue: 'RON', value: 'RON' },
    { id: 41, viewValue: 'RUB', value: 'RUB' },
    { id: 42, viewValue: 'SAR', value: 'SAR' },
    { id: 43, viewValue: 'SEK', value: 'SEK' },
    { id: 44, viewValue: 'SGD', value: 'SGD' },
    { id: 45, viewValue: 'THB', value: 'THB' },
    { id: 46, viewValue: 'TRY', value: 'TRY' },
    { id: 47, viewValue: 'TWD', value: 'TWD' },
    { id: 48, viewValue: 'UAH', value: 'UAH' },
    { id: 49, viewValue: 'USD', value: 'USD' },
    { id: 50, viewValue: 'UYU', value: 'UYU' },
    { id: 51, viewValue: 'VND', value: 'VND' },
    { id: 52, viewValue: 'ZAR', value: 'ZAR' }   
  ]

  defaultCurrencyOne = 'USD';
  defaultCurrencyTwo = 'EUR';

  constructor() { }

  ngOnInit(): void {
  }

  onGetCurrencyData(event) {

    console.log(event);


  }

}

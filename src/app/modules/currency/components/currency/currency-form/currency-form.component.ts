import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html'
 
})
export class CurrencyFormComponent implements OnInit {

  currency = [
    {viewValue:'PLN', value: 'PLN'},
    {viewValue:'USD', value: 'USD'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

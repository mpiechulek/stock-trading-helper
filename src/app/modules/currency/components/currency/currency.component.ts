import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-ui',
  templateUrl: './currency.component.html'
  
})
export class CurrencyComponent implements OnInit {

  @Input() 
  private currencyData; 

  constructor() { }

  ngOnInit(): void {
  }

}

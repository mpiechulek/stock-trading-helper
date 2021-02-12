import { Component, OnInit } from '@angular/core';
import { TradeFormData } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.container.html',

})
export class TradeContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveFormData(formData: TradeFormData): void {
    

  }

}

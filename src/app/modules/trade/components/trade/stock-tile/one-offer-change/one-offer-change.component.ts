import { Component, Input, OnInit } from '@angular/core';
import { StockOfferModel } from 'src/app/data/models/stock-tile.model';

@Component({
  selector: 'app-one-offer-change',
  templateUrl: './one-offer-change.component.html'

})
export class OneOfferChangeComponent implements OnInit {

  @Input()
  private neutralQuote: StockOfferModel;

  constructor() { }

  ngOnInit(): void {
 
  }
  get getNeutralQuote() {
    return this.neutralQuote;
  }

}

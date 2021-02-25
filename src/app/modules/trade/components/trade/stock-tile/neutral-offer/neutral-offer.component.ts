import { Component, Input, OnInit } from '@angular/core';
import { StockOfferModel } from 'src/app/data/models/stock-tile.model';

@Component({
  selector: 'app-neutral-offer',
  templateUrl: './neutral-offer.component.html'

})
export class NeutralOfferComponent implements OnInit {

  @Input()
  private neutralQuote: StockOfferModel;


  constructor() { }

  ngOnInit(): void {
   
  }

  get getNeutralQuote() {
    return this.neutralQuote;
  }

}

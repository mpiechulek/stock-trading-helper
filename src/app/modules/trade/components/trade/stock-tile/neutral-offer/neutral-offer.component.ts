import { Component, Input, OnInit } from '@angular/core';
import { StockOfferModel } from 'src/app/data/models/stock-tile.model';

@Component({
  selector: 'app-neutral-offer',
  templateUrl: './neutral-offer.component.html'

})
export class NeutralOfferComponent implements OnInit {

  @Input()
  private neutralQuote: StockOfferModel;

  @Input()
  private keyId: string;

  constructor() { }

  ngOnInit(): void {
   
  }

  get getNeutralQuote() {
    return this.neutralQuote;
  }

  get getKeyId(): string {
    return this.keyId;
  }

}

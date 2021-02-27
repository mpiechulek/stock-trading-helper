import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { StockOfferModel } from 'src/app/data/models/stock-tile.model';

@Component({
  selector: 'app-one-offer-change',
  templateUrl: './one-offer-change.component.html'

})
export class OneOfferChangeComponent implements OnInit, AfterViewInit {

  @Input()
  private profitQuote: StockOfferModel;

  @Input()
  public keyId: string;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  get getProfitQuote(): StockOfferModel {
    return this.profitQuote;
  }

  get getKeyId(): string {
    return this.keyId;
  }

}

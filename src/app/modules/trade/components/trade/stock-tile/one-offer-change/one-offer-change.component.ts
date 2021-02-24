import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { StockOfferModel } from 'src/app/data/models/stock-tile.model';

@Component({
  selector: 'app-one-offer-change',
  templateUrl: './one-offer-change.component.html'

})
export class OneOfferChangeComponent implements OnInit, AfterViewInit  {

  @Input()
  private neutralQuote: StockOfferModel;

  @Input()
  private profitQuote: StockOfferModel;

  constructor() { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void  {
    console.log(this.profitQuote);  
  }

  get getNeutralQuote() {
    return this.neutralQuote;
  }

  get getProfitQuote() {
    return this.profitQuote;
  }

}

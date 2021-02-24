import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { StockOfferModel } from 'src/app/data/models/stock-tile.model';

@Component({
  selector: 'app-one-offer-change',
  templateUrl: './one-offer-change.component.html'

})
export class OneOfferChangeComponent implements OnInit, AfterViewInit  {

  @Input()
  private profitQuote: StockOfferModel;

  constructor() { }

  ngOnInit(): void {
   console.log(this.profitQuote);   
  }

  ngAfterViewInit(): void  {
    
  }

  get getProfitQuote() {
    return this.profitQuote;
  }

}

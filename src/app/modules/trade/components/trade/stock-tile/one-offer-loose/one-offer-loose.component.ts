import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { StockOfferModel } from 'src/app/data/models/stock-tile.model';

@Component({
  selector: 'app-one-offer-loose',
  templateUrl: './one-offer-loose.component.html'
})
export class OneOfferLooseComponent implements OnInit, AfterViewInit {


  @Input()
  private loseQuote: StockOfferModel;

  constructor() { }

  ngOnInit(): void {

    console.log(this.loseQuote);
    
   
  }

  ngAfterViewInit(): void  {
    
  }

  get getLoseQuote() {
    return this.loseQuote;
  }

}

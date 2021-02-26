import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  CdkVirtualScrollViewport,
  FixedSizeVirtualScrollStrategy,
  VIRTUAL_SCROLL_STRATEGY
} from '@angular/cdk/scrolling';
import {
  HeaderCalculationsModel,
  SelectedOfferMarkerModel,
  StockOfferDictionaryModel,
  StockOfferModel,
  StockTileModel,
  StockTileNumericModel
} from '../../../../../data/models/stock-tile.model';
import { StockTilePresenterService } from './stock-tile.presenter';
import { KeyValue } from '@angular/common';
import { TradeTileOffersState } from 'src/app/data/enums/trade-tile-offer.enum';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html',
  providers: [StockTilePresenterService]
})

export class StockTileComponent implements OnInit {

  private profitQuotes = {} as StockOfferDictionaryModel;
  private loseQuotes = {} as StockOfferDictionaryModel;
  private neutralQuote = {} as StockOfferDictionaryModel;
  private headerCalculations = {} as HeaderCalculationsModel;

  private profitQuotesSubscription: Subscription;
  private loseQuotesSubscription: Subscription;
  private neutralQuoteSubscription: Subscription;
  private headerCalculationsSubscription: Subscription;

  private numericObject = {} as StockTileNumericModel;
  private selectedOfferMarker: SelectedOfferMarkerModel = {
    "profit": null,
    "lose": null,
    "neutral": null
  }

  public tradeTileOffers = TradeTileOffersState;

  @Input()
  private stockElement: StockTileModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private stockTilePresenterService: StockTilePresenterService
  ) { }

  // Angular material CDK virtual scrolling
  @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

  ngOnInit(): void {

    this.profitQuotesSubscription = this.stockTilePresenterService.getProfitQuotes$.subscribe((data) => {
      this.profitQuotes = data;
      console.log('this.profitQuotes');      
    });

    this.loseQuotesSubscription = this.stockTilePresenterService.getLoseQuotes$.subscribe((data) => {
      this.loseQuotes = data;
      console.log('this.profitQuotes');      
    });

    this.neutralQuoteSubscription = this.stockTilePresenterService.getNeutralQuote$.subscribe((data) => {
      this.neutralQuote = data;
      console.log('this.profitQuotes');      
    });

    this.headerCalculationsSubscription = this.stockTilePresenterService.getHeaderCalculations$.subscribe((data) => {
      this.headerCalculations = data;
      console.log('this.profitQuotes');      
    }); 

    this.stockTilePresenterService.convertStringObjectElementsToNumber(this.stockElement);
    this.stockTilePresenterService.generateQuotes();    
  }

  ngAfterViewChecked() {
    // this.cdkVirtualScrollViewport.scrollToIndex(2000);
  }

  /**
  * Returning an object of objects { key1:{...}, key2:{...}}
  */
  get getProfitQuotes() {
    return this.profitQuotes;
  }

  get getLoseQuotes() {
    return this.loseQuotes;
  }

  get getNeutralQuote() {
    return this.neutralQuote;
  }

  get getHeaderCalculations() {
    return this.headerCalculations;
  }

  get getStockElement() {
    return this.stockElement;
  }

  /**
   * This fixes the object sorting pipe bug 
   */
  unsorted() { }

  /**
   * Reverse object sorting of key value
   * @param a 
   * @param b 
   */
  orderbyValueDsc = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value > b.value ? 1 : (a.value > b.value) ? 0 : -1
  }

  /**
   * Angular material scroll event handler
   * @param $event 
   */
  scrollHandler($event) {

  }
  /**
   * 
   * @param event 
   */
  onClickedList(event, listMarker: string): void {

    // Get li tag id 
    let id = this.stockTilePresenterService.getChosenElementId(event);

    this.stockTilePresenterService
      .clearQuoteSelector(
        this.profitQuotes,
        this.selectedOfferMarker.profit
      );

    this.stockTilePresenterService
      .clearQuoteSelector(
        this.loseQuotes,
        this.selectedOfferMarker.lose
      );

    this.stockTilePresenterService
      .clearQuoteSelector(
        this.neutralQuote,
        this.selectedOfferMarker.neutral
      );

    // Next reset the odl marker id
    this.selectedOfferMarker.profit = null;
    this.selectedOfferMarker.lose = null;
    this.selectedOfferMarker.neutral = null;

    // Set new marker
    this.selectedOfferMarker[listMarker] = id;

    // Set list component selector to true
    if (listMarker === this.tradeTileOffers.Profit) {
      this.profitQuotes[id].selected = true;
    }

    if (listMarker === this.tradeTileOffers.Lose) {
      this.loseQuotes[id].selected = true;
    }

    if (listMarker === this.tradeTileOffers.Neutral) {
      this.neutralQuote[0].selected = true;
    }

  }

  /**
   * 
   * @param id 
   */
  onEditTile(id: string): void {
    this.editTile.emit(id);
  }

  /**
   * 
   * @param id 
   */
  onDeleteTile(id: string): void {
    this.deleteTile.emit(id);
  }

}

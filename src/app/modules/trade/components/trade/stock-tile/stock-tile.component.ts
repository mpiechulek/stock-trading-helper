import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
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
  StockMarkerSaveDataModel,
  StockOfferDictionaryModel,
  StockTileModel,
} from '../../../../../data/models/stock-tile.model';
import { StockTilePresenterService } from './stock-tile.presenter';
import { KeyValue } from '@angular/common';
import { TradeTileOffersState } from 'src/app/data/enums/trade-tile-offer.enum';
import { Subscription } from 'rxjs';


export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html',
  providers: [StockTilePresenterService,
    { provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }]
})

export class StockTileComponent implements OnInit, OnDestroy, AfterViewInit {

  private profitQuotes = {} as StockOfferDictionaryModel;
  private loseQuotes = {} as StockOfferDictionaryModel;
  private neutralQuote = {} as StockOfferDictionaryModel;
  private headerCalculations = {} as HeaderCalculationsModel;

  private profitQuotesSubscription: Subscription;
  private loseQuotesSubscription: Subscription;
  private neutralQuoteSubscription: Subscription;
  private headerCalculationsSubscription: Subscription;

  public tradeTileOffers = TradeTileOffersState;
  private offerId: string = null;
  private offerMarker: string = null;

  @Input()
  private stockElement: StockTileModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  savePickedOffer: EventEmitter<StockMarkerSaveDataModel> = new EventEmitter<StockMarkerSaveDataModel>();

  @Output()
  sellStock: EventEmitter<HeaderCalculationsModel> = new EventEmitter<HeaderCalculationsModel>();

  constructor(
    private stockTilePresenterService: StockTilePresenterService
  ) { }

  // Angular material CDK virtual scrolling
  @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

  ngOnInit(): void {

    this.profitQuotesSubscription =
      this.stockTilePresenterService.getProfitQuotes$
        .subscribe((data) => {
          this.profitQuotes = data;
        });

    this.loseQuotesSubscription =
      this.stockTilePresenterService.getLoseQuotes$
        .subscribe((data) => {
          this.loseQuotes = data;
        });

    this.neutralQuoteSubscription =
      this.stockTilePresenterService.getNeutralQuote$
        .subscribe((data) => {
          this.neutralQuote = data;
        });

    this.headerCalculationsSubscription =
      this.stockTilePresenterService.getHeaderCalculations$
        .subscribe((data) => {
          this.headerCalculations = data;
        });

    this.stockTilePresenterService.convertStringObjectElementsToNumber(this.stockElement);
    this.stockTilePresenterService.generateQuotes();  
    
  }

  ngAfterViewInit() {
    // this.cdkVirtualScrollViewport.scrollToIndex(parseInt(this.stockElement.markerOfferValue));
    // this.cdkVirtualScrollViewport.scrollTo({bottom: 0});
  }

  ngOnDestroy() {
    if (this.profitQuotesSubscription) {
      this.profitQuotesSubscription.unsubscribe();
    }

    if (this.loseQuotesSubscription) {
      this.loseQuotesSubscription.unsubscribe();
    }

    if (this.neutralQuoteSubscription) {
      this.neutralQuoteSubscription.unsubscribe();
    }

    if (this.headerCalculationsSubscription) {
      this.headerCalculationsSubscription.unsubscribe();
    }
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

  get getOfferId() {
    return this.offerId;
  }

  get getOfferMarker() {
    return this.offerMarker;
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
  orderbyValueDsc(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return a.value > b.value ? 1 : (a.value > b.value) ? 0 : -1
  } 

  /**
   * Changing the offer selection on the lists
   * @param event 
   */
  onClickedList(event, listMarker: string): void {
    this.stockTilePresenterService.changeSelectedOfferElement(event, listMarker);
    this.offerId = this.stockTilePresenterService.getChosenElementId(event);
    this.offerMarker = listMarker;
  }

  onSavePickedOfferData(): void {
    
    let markerData: StockMarkerSaveDataModel;

    markerData = {
      id: this.stockElement.id,
      markerOfferValue: this.offerId,
      markerOfferType: this.offerMarker
    }

    this.savePickedOffer.emit(markerData)
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

  /**
   * 
   */
  onSellStock(): void {
    this.sellStock.emit(this.headerCalculations);    
  }

  /**
   * 
   */
  onFindSelectedOffer(){

    if(this.offerMarker === 'profit') {
      this.cdkVirtualScrollViewport.scrollToIndex(parseInt(this.offerId));
    }

    if(this.offerMarker === 'lose') {
      this.cdkVirtualScrollViewport.scrollToIndex(parseInt(this.offerId));
    }
  }
}

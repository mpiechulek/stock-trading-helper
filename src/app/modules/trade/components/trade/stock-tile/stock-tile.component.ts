import {
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

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html',
  providers: [StockTilePresenterService]
})

export class StockTileComponent implements OnInit, OnDestroy {

  private profitQuotes = {} as StockOfferDictionaryModel;
  private loseQuotes = {} as StockOfferDictionaryModel;
  private neutralQuote = {} as StockOfferDictionaryModel;
  private headerCalculations = {} as HeaderCalculationsModel;

  private profitQuotesSubscription: Subscription;
  private loseQuotesSubscription: Subscription;
  private neutralQuoteSubscription: Subscription;
  private headerCalculationsSubscription: Subscription;  

  public tradeTileOffers = TradeTileOffersState;

  @Input()
  private stockElement: StockTileModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  savePickedOffer: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    private stockTilePresenterService: StockTilePresenterService
  ) { }

  // Angular material CDK virtual scrolling
  @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

  ngOnInit(): void {

    this.profitQuotesSubscription = this.stockTilePresenterService.getProfitQuotes$.subscribe((data) => {
      this.profitQuotes = data;     
    });

    this.loseQuotesSubscription = this.stockTilePresenterService.getLoseQuotes$.subscribe((data) => {
      this.loseQuotes = data;      
    });

    this.neutralQuoteSubscription = this.stockTilePresenterService.getNeutralQuote$.subscribe((data) => {
      this.neutralQuote = data;    
    });

    this.headerCalculationsSubscription = this.stockTilePresenterService.getHeaderCalculations$.subscribe((data) => {
      this.headerCalculations = data;    
    });

    this.stockTilePresenterService.convertStringObjectElementsToNumber(this.stockElement);
    this.stockTilePresenterService.generateQuotes();
  }

  ngAfterViewChecked() {
    // this.cdkVirtualScrollViewport.scrollToIndex(2000);
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
   * Changing the offer selection on the lists
   * @param event 
   */
  onClickedList(event, listMarker: string): void {
    this.stockTilePresenterService.changeSelectedOfferElement(event, listMarker);
    this.onSavePickedOfferData(event, listMarker);
  }

  onSavePickedOfferData(event, listMarker: string): void {
    let markerData: StockMarkerSaveDataModel;
    const offerId  = this.stockTilePresenterService.getChosenElementId(event);

    markerData =  {
      id: this.stockElement.id,
      markerOfferValue : offerId,
      markerOfferType : listMarker
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

}

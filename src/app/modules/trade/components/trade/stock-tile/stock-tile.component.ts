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
  StockOfferDictionaryModel,
  StockOfferModel,
  StockTileModel,
  StockTileNumericModel
} from '../../../../../data/models/stock-tile.model';
import { StockTilePresenterService } from './stock-tile.presenter';
import { KeyValue } from '@angular/common';
import { TradeTileOffersState } from 'src/app/data/enums/trade-tile-offer.enum';

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
  private numericObject = {} as StockTileNumericModel;
  private selectedOfferMarker = {
    "Profit": null,
    "Lose": null,
    "Neutral": null
  }

  public tradeTileOffers = TradeTileOffersState;

  @Input()
  private stockElement: StockTileModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private stockTilePresenterService: StockTilePresenterService,
    private elRef: ElementRef) { }

  // @HostListener('click', ['$event']) onTileClick(event: MouseEvent){
  //   // const parentEl = this.elRef.nativeElement;
  //   console.log(event);
  // }

  // Angular material CDK virtual scrolling
  @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

  ngOnInit(): void {

    this.numericObject =
      this.stockTilePresenterService
        .convertStringObjectElementsToNumber(this.stockElement);

    this.neutralQuote =
      this.stockTilePresenterService
        .calculateNeutralQuote(this.numericObject);

    this.headerCalculations =
      this.stockTilePresenterService
        .calculateHeader(this.numericObject);

    this.profitQuotes =
      this.stockTilePresenterService
        .generateObjectOfOffers(
          this.numericObject,
          'profit'
        );

    this.loseQuotes =
      this.stockTilePresenterService
        .generateObjectOfOffers(
          this.numericObject,
          'loos'
        );
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
    let id = this.stockTilePresenterService.getChosenElementId(event, listMarker);

    // Reset Marker and offer lists
    // Check if the marker is selected
    if (this.selectedOfferMarker.Profit !== null) { 
      //Overwrite the element in the dictionary, by old marker id
      this.profitQuotes[this.selectedOfferMarker.Profit].selected = false;
      // Next reset the odl marker id
      this.selectedOfferMarker.Profit = null;
    }

    if (this.selectedOfferMarker.Lose !== null) {    
      this.loseQuotes[this.selectedOfferMarker.Lose].selected = false;
      this.selectedOfferMarker.Lose = null;
    }

    if (this.selectedOfferMarker.Neutral !== null) {     
      this.neutralQuote[0].selected = false;
      this.selectedOfferMarker.Neutral = null;
    }

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

  // Przenies do serweisu obliczenia 
  // nasteonie obliczenie według pocentowej smiany hedera
  // zmiana stylu zanaczonej oferty   

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

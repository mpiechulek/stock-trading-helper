import {
  Component,
  EventEmitter,
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

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html',
  providers: [StockTilePresenterService]
})

export class StockTileComponent implements OnInit {
  
  private profitQuotes = {} as StockOfferDictionaryModel;
  private loseQuotes = {} as StockOfferDictionaryModel;
  private neutralQuote = {} as StockOfferModel;
  private headerCalculations = {} as HeaderCalculationsModel;
  private numericObject = {} as StockTileNumericModel;

  @Input()
  private stockElement: StockTileModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor(private stockTilePresenterService: StockTilePresenterService) { }

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
 
  onEditTile(id: string): void {
    this.editTile.emit(id);
  }

  onDeleteTile(id: string): void {
    this.deleteTile.emit(id);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { HeaderCalculationsModel, StockOfferModel, StockTileModel, StockTileNumericModel } from '../../../../../data/models/stock-tile.model';
import { StockTilePresenterService } from './stock-tile.presenter';

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html',
  providers: [StockTilePresenterService]
})

export class StockTileComponent implements OnInit {

  array = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

  private profitQuotes: StockOfferModel[] = [];
  private loosQuotes: StockOfferModel[] = [];
  private neutralQuote: StockOfferModel | {} = {};
  private headerCalculations = {} as HeaderCalculationsModel;
  private numericObject = {} as StockTileNumericModel;

  @Input()
  private stockElement: StockTileModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor(private stockTilePresenterService: StockTilePresenterService) { }

  ngOnInit(): void {
    this.numericObject = this.convertStringObjectElementsToNumber(this.stockElement);

    this.calculateNeutralQuote(this.numericObject);

  }

  /**
   * This method is converting an object with string values to a object wit only 
   * numeric values, and removing everything that is not a number
   * @param object 
   */
  convertStringObjectElementsToNumber(object: StockTileModel): StockTileNumericModel {

    let newObject = {} as StockTileNumericModel;

    for (let [key, value] of Object.entries(object)) {

      if (!isNaN(value) && value !== null) {       
        newObject[key] = parseFloat(value);
      }
    }

    return newObject;
  }

  calculateNeutralQuote(numericObject: StockTileNumericModel) {
    this.headerCalculations.buyValue = this.calculateBuyValue(numericObject);      
  }

  calculateBuyValue(numericObject: StockTileNumericModel): number {     
    let result = parseFloat((numericObject.amountOfShares * numericObject.buyPrice).toFixed(4));  
    return result;    
  }

  calculateCurrentPrice(object: Object) {

  }

  calculateCurrentValue(object: Object) {

  }

  calculateProfitBeforeTax(object: Object) {

  }

  calculateProfitAfterTax(object: Object) {

  }

  calculatePercentageChange(object: Object) {

  }

  addNewPositionToObject(object: Object, key: string, value: number) {

  }

  // ===========================================================================



  // ===========================================================================

  get getProfitQuotes() {
    return this.profitQuotes;
  }

  get getLoosQuotes() {
    return this.loosQuotes;
  }

  get getNeutralQuotes() {
    return this.neutralQuote;
  }

  get getStockElement() {
    return this.stockElement;
  }


  onEditTile(id: string): void {
    this.editTile.emit(id);
  }

  onDeleteTile(id: string): void {
    this.deleteTile.emit(id);
  }

}

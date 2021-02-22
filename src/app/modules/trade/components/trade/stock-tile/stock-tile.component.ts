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

  array = [
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
  ]

  selectedPercentageChange: number = 0;

  private profitQuotes: StockOfferModel[] = [];
  private loosQuotes: StockOfferModel[] = [];
  private neutralQuote = {} as StockOfferModel;

  private headerCalculations = {} as HeaderCalculationsModel;
  private numericObject = {} as StockTileNumericModel;
  private buyCommission: number = 0;

  @Input()
  private stockElement: StockTileModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor(private stockTilePresenterService: StockTilePresenterService) { }

  ngOnInit(): void {
    this.numericObject = this.convertStringObjectElementsToNumber(this.stockElement);
    this.neutralQuote = this.calculateNeutralQuote(this.numericObject);
    this.headerCalculations = this.calculateHeader(this.numericObject);

  }

  /**
   * This method is converting an object with string values to a object wit only 
   * numeric values, and removing everything that is not a number
   * @param object 
   */
  convertStringObjectElementsToNumber(object: StockTileModel): StockTileNumericModel {

    let newObject = {} as StockTileNumericModel;

    for (let [key, value] of Object.entries(object)) {

      if (!isNaN(value)) {        
        newObject[key] = parseFloat(value);
      }
    }
    return newObject;
  }

  calculateNeutralQuote(numericObject: StockTileNumericModel): StockOfferModel {
    let result = {} as StockOfferModel;

    const buyValue: number = this.calculateBuyValue(numericObject.amountOfShares, numericObject.buyPrice);

    const commissionValue = numericObject.commission;

    const commission = this.calculateCommissionValue(buyValue, commissionValue);

    if (commission > numericObject.minCommission) {
      result.profit = commission;
    } else {
      result.profit = numericObject.minCommission;
    }

    this.buyCommission = result.profit

    result.percentageChange = 0;
    result.valueChange = 0;    

    return result;
  }

  setBuyCommission(commission: number, minCommission: number): number {

    let resultCommission: number;

    if (commission > minCommission) {
      resultCommission = commission;
    } else {
      resultCommission = minCommission;
    }

    return resultCommission;
  }

  calculateHeader(numericObject: StockTileNumericModel): HeaderCalculationsModel {
    const result = {} as HeaderCalculationsModel;

    result.buyValue =
      this.calculateBuyValue(numericObject.amountOfShares, numericObject.buyPrice);
    
    console.log(numericObject);

    result.currentPrice =
      this.calculateCurrentPrice(numericObject.buyPrice, numericObject.percentageChange);

    result.currentValue =
      this.calculateCurrentValue(this.headerCalculations.currentPrice, numericObject.amountOfShares);

    // Current Commission
    const commission = this.calculateCommissionValue(this.headerCalculations.currentValue, numericObject.commission);

    result.profitBeforeTax =
      this.calculateProfitBeforeTax(this.headerCalculations.currentValue, commission);

    result.profitAfterTax =
      this.calculateProfitAfterTax(this.headerCalculations.profitBeforeTax, numericObject.taxRate);

    result.percentageChange =
      this.calculatePercentageChange(this.headerCalculations.currentPrice, numericObject.buyPrice);

    return result;
  }

  calculateBuyValue(shareAmount: number, buyPrice: number): number {
    return parseFloat((shareAmount * buyPrice).toFixed(4));
  }

  calculateCommissionValue(buyValue: number, commissionValue: number): number {
    return buyValue * (commissionValue / 100);
  }

  calculateCurrentPrice(buyPrice: number, percentageChange: number): number {
    return buyPrice * percentageChange;
  }

  calculateCurrentValue(currentPrice: number, shareAmount: number): number {
    return currentPrice * shareAmount;
  }

  calculateProfitBeforeTax(currentValue: number, commission: number) {
    return currentValue - (commission + this.buyCommission);
  }

  calculateProfitAfterTax(profitBeforeTax: number, taxRate: number): number {
    return profitBeforeTax - (profitBeforeTax * (taxRate / 100));
  }

  calculatePercentageChange(buyPrice, currentPrice) {
    return (buyPrice * 100) / currentPrice;
  }

  addNewPositionToObject(object: Object, key: string, value: number) {

  }

  get getProfitQuotes() {
    return this.profitQuotes;
  }

  get getLoosQuotes() {
    return this.loosQuotes;
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


  onEditTile(id: string): void {
    this.editTile.emit(id);
  }

  onDeleteTile(id: string): void {
    this.deleteTile.emit(id);
  }

}

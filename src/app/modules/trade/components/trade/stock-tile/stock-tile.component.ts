import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { HeaderCalculationsModel, StockOfferDictionaryModel, StockOfferModel, StockTileModel, StockTileNumericModel } from '../../../../../data/models/stock-tile.model';
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

  private numberOfRepeats: number = 200;
  private percentageChange: number = 0.5;
  private numberOfDecimalPlaces: number = 2;

  profitQuotes = {} as StockOfferDictionaryModel;
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

  ngOnInit(): void {

    this.numericObject = this.convertStringObjectElementsToNumber(this.stockElement);

    this.neutralQuote = this.calculateNeutralQuote(this.numericObject);

    this.headerCalculations = this.calculateHeader(this.numericObject);

    this.profitQuotes =
      this.generateObjectOfOffers(
        this.numberOfRepeats,
        this.percentageChange,
        this.numericObject
      );

    console.log(this.profitQuotes);

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

  /**
   * 
   * @param numericObject 
   */
  calculateNeutralQuote(numericObject: StockTileNumericModel): StockOfferModel {
    let result = {} as StockOfferModel;

    const buyValue: number =
      this.calculateBuyValue(
        numericObject.amountOfShares,
        numericObject.buyPrice
      );

    const commission: number =
      this.calculateCommissionValue(
        buyValue,
        numericObject.commission,
        numericObject.minCommission
      );

    const selBuyCommission = commission * 2;

    result.profit = selBuyCommission
    result.percentageChange = 0;
    result.newPrice = 0;

    return result;
  }

  /**
   * 
   * @param repeats 
   * @param percentageChange 
   * @param numericObject 
   */
  generateObjectOfOffers(
    repeats: number,
    percentageChange: number,
    numericObject: StockTileNumericModel
  ): StockOfferDictionaryModel {

    let result = {} as StockOfferDictionaryModel;
    let percentageStep: number = 0.5;
    let currentPrice: number;
    let profit: number;
    let sellValue: number;
    let sellCommission: number;
    let totalCommission: number;

    let buyValue: number =
      this.calculateBuyValue(
        numericObject.amountOfShares,
        numericObject.buyPrice
      );

    let buyCommission: number =
      this.calculateCommissionValue(
        buyValue,
        numericObject.commission,
        numericObject.minCommission
      );

    for (let i = 0; repeats > i; i++) {

      currentPrice = this.calculateCurrentPrice(numericObject.buyPrice, percentageStep);
      sellValue = currentPrice * numericObject.amountOfShares;

      sellCommission =
        this.calculateCommissionValue(
          sellValue,
          numericObject.commission,
          numericObject.minCommission
        );

      totalCommission =
        this.calculateTotalCommissionValue(
          buyCommission,
          sellCommission
        );

      profit =
        this.calculateProfitBeforeTax(
          sellValue,
          buyValue,
          totalCommission
        );

      result[i] = {
        percentageChange: percentageStep,
        newPrice: currentPrice,
        profit: profit
      }

      percentageStep += percentageChange;
    }

    return result;
  }

  // ===========================================================================

  /**
   * 
   * @param numericObject 
   */
  calculateHeader(numericObject: StockTileNumericModel): HeaderCalculationsModel {
    const result = {} as HeaderCalculationsModel;
    let buyCommission: number;
    let sellCommission: number;
    let totalCommission: number;

    result.buyValue =
      this.calculateBuyValue(numericObject.amountOfShares, numericObject.buyPrice);

    result.currentPrice =
      this.calculateCurrentPrice(numericObject.buyPrice, numericObject.percentageChange);

    result.currentValue =
      this.calculateCurrentValue(result.currentPrice, numericObject.amountOfShares);

    buyCommission =
      this.calculateCommissionValue(
        result.buyValue,
        numericObject.commission,
        numericObject.minCommission
      );

    sellCommission
    this.calculateCommissionValue(
      result.currentValue,
      numericObject.commission,
      numericObject.minCommission
    );

    totalCommission =
      this.calculateTotalCommissionValue(
        sellCommission,
        buyCommission
      );

    result.profitBeforeTax =
      this.calculateProfitBeforeTax(
        result.currentValue,
        result.buyValue,
        totalCommission
      );

    // When the current stock price is less or equal the buy price you don't 
    // pay tax from losses
    if (result.currentPrice <= numericObject.buyPrice) {
      result.profitAfterTax = result.profitBeforeTax;
    } else {

      result.profitAfterTax =
        this.calculateProfitAfterTax(
          result.profitBeforeTax,
          numericObject.taxRate
        );
    }

    result.percentageChange =
      this.calculatePercentageChange(
        result.currentPrice,
        numericObject.buyPrice
      );

    return result;
  }

  // ===========================================================================

  calculateBuyValue(shareAmount: number, buyPrice: number): number {
    return parseFloat((shareAmount * buyPrice).toFixed(this.numberOfDecimalPlaces));
  }

  calculateCommissionValue(buyValue: number, commissionValue: number, minCommissionValue: number): number {
    const calcCommission = parseFloat((buyValue * (commissionValue / 100)).toFixed(this.numberOfDecimalPlaces));

    // The brokers commission can't by less than the min. commission
    if (calcCommission < minCommissionValue) return minCommissionValue;
    return calcCommission;
  }

  calculateTotalCommissionValue(sellCommission: number, buyCommission: number): number {
    return sellCommission + buyCommission;
  }

  calculateCurrentPrice(buyPrice: number, percentageChange: number): number {
    if (percentageChange === 0) return buyPrice;
    return parseFloat((buyPrice + (buyPrice * (percentageChange / 100))).toFixed(this.numberOfDecimalPlaces));
  }

  calculateCurrentValue(currentPrice: number, shareAmount: number): number {
    return parseFloat((currentPrice * shareAmount).toFixed(this.numberOfDecimalPlaces));
  }

  calculateProfitBeforeTax(currentValue: number, buyValue: number, totalCommission: number): number {
    return parseFloat(((currentValue - buyValue) - totalCommission).toFixed(this.numberOfDecimalPlaces));
  }

  calculateProfitAfterTax(profitBeforeTax: number, taxRate: number): number {
    return parseFloat((profitBeforeTax - (profitBeforeTax * (taxRate / 100))).toFixed(this.numberOfDecimalPlaces));
  }

  calculatePercentageChange(buyPrice, currentPrice): number {
    let percentage: number;

    if (buyPrice === currentPrice) return 0;

    percentage = (buyPrice * 100) / currentPrice;

    if (buyPrice > currentPrice) return percentage * -1;

    return (buyPrice * 100) / currentPrice;
  }

  // ==========================================================================

  /**
   * Returning an object of objects { key1:{...}, key2:{...}}
   */
  get getProfitQuotes() {
    return this.profitQuotes;
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

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StockPriceCalculatorService } from 'src/app/core/services/stock-price-calculator.service';
import {
  HeaderCalculationsModel,
  SelectedOfferMarkerModel,
  StockOfferDictionaryModel,
  StockOfferModel,
  StockTileModel,
  StockTileNumericModel
} from 'src/app/data/models/stock-tile.model';

@Injectable()

export class StockTilePresenterService {

  private numberOfRepeats: number = 200;
  private percentageChange: number = 0.5;


  private loseQuotes = new Subject<StockOfferDictionaryModel>();
  private loseQuotes$ = this.loseQuotes.asObservable();

  private profitQuotes = new Subject<StockOfferDictionaryModel>();
  private profitQuotes$ = this.profitQuotes.asObservable();

  private neutralQuotes = new Subject<StockOfferDictionaryModel>();
  private neutralQuotes$ = this.neutralQuotes.asObservable();

  private headerCalculations = new Subject<HeaderCalculationsModel>();
  private headerCalculations$ = this.headerCalculations.asObservable();

  private numericObject = {} as StockTileNumericModel;

  private selectedOfferMarker: SelectedOfferMarkerModel = {
    "profit": null,
    "lose": null,
    "neutral": null
  }

  constructor(private stockPriceCalculatorService: StockPriceCalculatorService) { }

  ngOnInit() {

  }

  get getProfitQuotes$() {
    return this.profitQuotes$;
  }

  get getLoseQuotes$() {
    return this.loseQuotes$;
  }

  get getNeutralQuote$() {
    return this.neutralQuotes$;
  }

  get getHeaderCalculations$() {
    return this.headerCalculations$;
  }

  /**
   * This method is converting an object with string values to a object with only 
   * numeric values, and removing everything that is not a number
   * @param object 
   */
  convertStringObjectElementsToNumber(object: StockTileModel) {

    let newObject = {} as StockTileNumericModel;

    for (let [key, value] of Object.entries(object)) {

      if (!isNaN(value)) {
        newObject[key] = parseFloat(value);
      }
    }

    this.numericObject = newObject;
  }

  generateQuotes() {
    this.calculateNeutralQuote(this.numericObject);
    this.generateObjectOfOffers(this.numericObject, 'profit', this.numberOfRepeats, this.percentageChange);
    this.generateObjectOfOffers(this.numericObject, 'lose', this.numberOfRepeats, this.percentageChange);
    this.calculateHeader(this.numericObject);
  }

  /**
   * 
   * @param numericObject 
   */
  calculateNeutralQuote(numericObject: StockTileNumericModel): void {
    let result = {} as StockOfferDictionaryModel;

    const buyValue: number =
      this.stockPriceCalculatorService.calculateBuyValue(
        numericObject.amountOfShares,
        numericObject.buyPrice
      );

    const commission: number =
      this.stockPriceCalculatorService.calculateCommissionValue(
        buyValue,
        numericObject.commission,
        numericObject.minCommission
      );

    result[0] = {
      profit: (commission * 2).toFixed(2),
      percentageChange: (0).toFixed(2),
      newPrice: numericObject.buyPrice.toString(),
      selected: false
    }

    this.neutralQuotes.next(result);
  }

  /**
   * 
   * @param repeats 
   * @param percentageChange 
   * @param numericObject 
   */
  generateObjectOfOffers(
    numericObject: StockTileNumericModel,
    profitLoos?: string,
    repeats: number = this.numberOfRepeats,
    percentageChange: number = this.percentageChange
  ): void {

    let result = {} as StockOfferDictionaryModel;
    let percentageStep: number = 0;
    let currentPrice: number;
    let profit: number;
    let sellValue: number;
    let sellCommission: number;
    let totalCommission: number;

    // Different value of percentageChange for profit/lose
    if (profitLoos !== 'profit') {
      percentageChange = percentageChange * -1;
    }

    let buyValue: number =
      this.stockPriceCalculatorService.calculateBuyValue(
        numericObject.amountOfShares,
        numericObject.buyPrice
      );

    let buyCommission: number =
      this.stockPriceCalculatorService.calculateCommissionValue(
        buyValue,
        numericObject.commission,
        numericObject.minCommission
      );

    for (let i = 0; repeats > i; i++) {

      percentageStep += percentageChange;

      currentPrice = this.stockPriceCalculatorService.calculateCurrentPrice(numericObject.buyPrice, percentageStep);
      sellValue = currentPrice * numericObject.amountOfShares;

      sellCommission =
        this.stockPriceCalculatorService.calculateCommissionValue(
          sellValue,
          numericObject.commission,
          numericObject.minCommission
        );

      totalCommission =
        this.stockPriceCalculatorService.calculateTotalCommissionValue(
          buyCommission,
          sellCommission
        );

      profit =
        this.stockPriceCalculatorService.calculateProfitBeforeTax(
          sellValue,
          buyValue,
          totalCommission
        );

      result[i] = {
        percentageChange: percentageStep.toFixed(this.stockPriceCalculatorService.getNumberOfDecimalPlaces),
        newPrice: currentPrice.toFixed(this.stockPriceCalculatorService.getNumberOfDecimalPlaces),
        profit: profit.toFixed(this.stockPriceCalculatorService.getNumberOfDecimalPlaces),
        selected: false
      }
    }

    if (profitLoos === 'profit') {
      this.profitQuotes.next(result);
    }

    if (profitLoos === 'lose') {
      this.loseQuotes.next(result);
    }
    return;
  }

  /**
   * 
   * @param numericObject 
   */
  calculateHeader(numericObject: StockTileNumericModel): void {

    const result = {} as HeaderCalculationsModel;
    let buyCommission: number;
    let sellCommission: number;
    let totalCommission: number;

    result.buyValue =
      this.stockPriceCalculatorService.calculateBuyValue(numericObject.amountOfShares, numericObject.buyPrice);

    result.currentPrice =
      this.stockPriceCalculatorService.calculateCurrentPrice(numericObject.buyPrice, numericObject.percentageChange);

    result.currentValue =
      this.stockPriceCalculatorService.calculateCurrentValue(result.currentPrice, numericObject.amountOfShares);

    buyCommission =
      this.stockPriceCalculatorService.calculateCommissionValue(
        result.buyValue,
        numericObject.commission,
        numericObject.minCommission
      );

    sellCommission =
      this.stockPriceCalculatorService.calculateCommissionValue(
        result.currentValue,
        numericObject.commission,
        numericObject.minCommission
      );

    totalCommission =
      this.stockPriceCalculatorService.calculateTotalCommissionValue(
        sellCommission,
        buyCommission
      );
    result.profitBeforeTax =
      this.stockPriceCalculatorService.calculateProfitBeforeTax(
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
        this.stockPriceCalculatorService.calculateProfitAfterTax(
          result.profitBeforeTax,
          numericObject.taxRate
        );
    }

    result.percentageChange =
      this.stockPriceCalculatorService.calculatePercentageChange(
        result.currentPrice,
        numericObject.buyPrice
      );

    this.headerCalculations.next(result);
  }

  /**
   * 
   * @param event  
   */
  getChosenElementId(event): number {
    let id: string;

    if (event.target.classList.contains('trade-tile-stock-change-container')) {
      return id = event.target.id;
    } else if (event.target.parentElement.classList.contains('trade-tile-stock-change-container')) {
      return id = event.target.parentElement.id;
    } else if (event.target.parentElement.parentElement.classList.contains('trade-tile-stock-change-container')) {
      return id = event.target.parentElement.parentElement.id;
    }

    return null;
  }

  /**
   * 
   * @param quote 
   * @param selectorMarker 
   */
  clearQuoteSelector(quote: StockOfferDictionaryModel, selectorMarker: number): StockOfferDictionaryModel {
    // Check if the marker is selected
    if (selectorMarker !== null) {
      //Overwrite the element in the dictionary, is set to false by old marker id
      //selectorMarker holds the previous id of the selected offer
      quote[selectorMarker].selected = false;
    }
    return quote;
  };
}
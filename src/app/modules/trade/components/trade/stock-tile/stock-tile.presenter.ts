import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StockPriceCalculatorService } from 'src/app/core/services/stock-price-calculator.service';
import { TradeTileOffersState } from 'src/app/data/enums/trade-tile-offer.enum';
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
  private loseQuotesHolder = {} as StockOfferDictionaryModel;

  private profitQuotes = new Subject<StockOfferDictionaryModel>();
  private profitQuotes$ = this.profitQuotes.asObservable();
  private profitQuotesHolder = {} as StockOfferDictionaryModel;

  private neutralQuotes = new Subject<StockOfferDictionaryModel>();
  private neutralQuotes$ = this.neutralQuotes.asObservable();
  private neutralQuotesHolder = {} as StockOfferDictionaryModel;

  private headerCalculations = new Subject<HeaderCalculationsModel>();
  private headerCalculations$ = this.headerCalculations.asObservable();

  private numericObject = {} as StockTileNumericModel;

  private selectedOfferMarker: SelectedOfferMarkerModel = {
    "profit": null,
    "lose": null,
    "neutral": null
  }

  private chosenOfferMarkerHolder: string = 'neutral';
  private chosenOfferIdHolder: string = '0';

  public tradeTileOffers = TradeTileOffersState;

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
  convertStringObjectElementsToNumber(stockTileData: StockTileModel) {
    let newObject = {} as StockTileNumericModel;

    for (let [key, value] of Object.entries(stockTileData)) {

      if (value === null) {
        newObject[key] = value;
      } else if (!isNaN(value)) {
        newObject[key] = parseFloat(value);
      }
    }

    // when first loaded the change is zero
    newObject.percentageChange = 0;

    this.numericObject = newObject;

    this.setOfferListGenerationProperties(this.numericObject, stockTileData);
  }

  /**
   * 
   * @param newObject 
   */
  setOfferListGenerationProperties(newObject: StockTileNumericModel, stockTileData: StockTileModel) {

    if (newObject.calcStepCount !== null && newObject.calcStepValue !== null) {
      this.numberOfRepeats = newObject.calcStepCount;
      this.percentageChange = newObject.calcStepValue;
    }

    if (stockTileData.markerOfferType !== null && newObject.markerOfferValue !== null) {
      this.selectedOfferMarker[stockTileData.markerOfferType] = newObject.markerOfferValue
      this.chosenOfferMarkerHolder = stockTileData.markerOfferType;
      this.chosenOfferIdHolder = newObject.markerOfferValue;
    }
  }

  /**
   * 
   */
  generateQuotes() {

    this.calculateNeutralQuote(this.numericObject);

    this.generateObjectOfOffers(this.numericObject,
      'profit',
      this.numberOfRepeats,
      this.percentageChange
    );

    this.generateObjectOfOffers(
      this.numericObject,
      'lose',
      this.numberOfRepeats,
      this.percentageChange
    );

    // Setting the chosen quote offer
    this.checkWitchQuoteToUpdate( this.chosenOfferMarkerHolder,   this.chosenOfferIdHolder);

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

    this.neutralQuotesHolder = result;
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
      this.stockPriceCalculatorService
        .calculateBuyValue(
          numericObject.amountOfShares,
          numericObject.buyPrice
        );

    let buyCommission: number =
      this.stockPriceCalculatorService
        .calculateCommissionValue(
          buyValue,
          numericObject.commission,
          numericObject.minCommission
        );

    for (let i = 0; repeats > i; i++) {

      percentageStep += percentageChange;

      currentPrice =
        this.stockPriceCalculatorService
          .calculateCurrentPrice(
            numericObject.buyPrice,
            percentageStep);

      sellValue =
        currentPrice * numericObject.amountOfShares;

      sellCommission =
        this.stockPriceCalculatorService
          .calculateCommissionValue(
            sellValue,
            numericObject.commission,
            numericObject.minCommission
          );

      totalCommission =
        this.stockPriceCalculatorService
          .calculateTotalCommissionValue(
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
        percentageChange:
          percentageStep
            .toFixed(
              this.stockPriceCalculatorService.getNumberOfDecimalPlaces
            ),
        newPrice:
          currentPrice
            .toFixed(
              this.stockPriceCalculatorService.getNumberOfDecimalPlaces
            ),
        profit:
          profit
            .toFixed(
              this.stockPriceCalculatorService.getNumberOfDecimalPlaces
            ),
        selected: false
      }
    }

    if (profitLoos === 'profit') {
      this.profitQuotesHolder = result;
      this.profitQuotes.next(result);
    }

    if (profitLoos === 'lose') {
      this.loseQuotesHolder = result;
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
      this.stockPriceCalculatorService
        .calculateBuyValue(
          numericObject.amountOfShares,
          numericObject.buyPrice
        );

    result.currentPrice =
      this.stockPriceCalculatorService
        .calculateCurrentPrice(
          numericObject.buyPrice,
          numericObject.percentageChange
        );

    result.currentValue =
      this.stockPriceCalculatorService
        .calculateCurrentValue(
          result.currentPrice,
          numericObject.amountOfShares
        );

    buyCommission =
      this.stockPriceCalculatorService
        .calculateCommissionValue(
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
   * @param listMarker 
   */
  changeSelectedOfferElement(event, listMarker: string): void {
    let id = this.getChosenElementId(event);

    this.clearQuoteSelector(
      this.profitQuotesHolder,
      this.selectedOfferMarker.profit
    );

    this.clearQuoteSelector(
      this.loseQuotesHolder,
      this.selectedOfferMarker.lose
    );

    this.clearQuoteSelector(
      this.neutralQuotesHolder,
      this.selectedOfferMarker.neutral
    );

    // Reset the old marker id
    this.selectedOfferMarker.profit = null;
    this.selectedOfferMarker.lose = null;
    this.selectedOfferMarker.neutral = null;

    // Set new marker
    this.selectedOfferMarker[listMarker] = id;

    this.checkWitchQuoteToUpdate(listMarker, id);
  }

  /**
  * 
  * @param event  
  */
  getChosenElementId(event): string {
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
   * @param offerMarkerValue 
   */
  clearQuoteSelector(
    quoteListHolder: StockOfferDictionaryModel,
    offerMarkerValue: number
  ): StockOfferDictionaryModel {
    // Check if the marker is selected
    if (offerMarkerValue !== null) {
      //Overwrite the element in the dictionary, is set to false by old marker id
      //selectorMarker holds the previous id of the selected offer
      quoteListHolder[offerMarkerValue].selected = false;
    }
    return quoteListHolder;
  };

  checkWitchQuoteToUpdate(
    groupMarker: string,
    selectedId: string
  ): void {

    if (groupMarker === this.tradeTileOffers.profit) {
      this.setSelectorInQuotes(
        this.profitQuotes,
        this.profitQuotesHolder,
        selectedId
      );
    }

    if (groupMarker === this.tradeTileOffers.lose) {
      this.setSelectorInQuotes(
        this.loseQuotes,
        this.loseQuotesHolder,
        selectedId
      );
    }

    if (groupMarker === this.tradeTileOffers.neutral) {
      this.setSelectorInQuotes(
        this.neutralQuotes,
        this.neutralQuotesHolder,
        selectedId
      );
    }
  }

  /**
   *  
   * @param quoteListSubject 
   * @param quoteListHolder 
   * @param offerStatus 
   */
  setSelectorInQuotes(
    quoteListSubject: any,
    quoteListHolder: StockOfferDictionaryModel,
    selectedId: string
  ): void {
    quoteListHolder[selectedId].selected = true;
    quoteListSubject.next(quoteListHolder);
    this.setNewPercentageChange(quoteListHolder[selectedId].percentageChange);
  }

  /**
   * 
   * @param value 
   */
  setNewPercentageChange(value: string): void {
    this.numericObject.percentageChange = parseFloat(value);
    this.calculateHeader(this.numericObject);
  }

}
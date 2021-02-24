import { Injectable } from '@angular/core';

@Injectable()

export class StockTilePresenterService {

  constructor() { }

  //  /**
  //  * This method is converting an object with string values to a object wit only 
  //  * numeric values, and removing everything that is not a number
  //  * @param object 
  //  */
  // convertStringObjectElementsToNumber(object: StockTileModel): StockTileNumericModel {

  //   let newObject = {} as StockTileNumericModel;

  //   for (let [key, value] of Object.entries(object)) {

  //     if (!isNaN(value)) {
  //       newObject[key] = parseFloat(value);
  //     }
  //   }
  //   return newObject;
  // }

  // /**
  //  * 
  //  * @param numericObject 
  //  */
  // calculateNeutralQuote(numericObject: StockTileNumericModel): StockOfferModel {
  //   let result = {} as StockOfferModel;

  //   const buyValue: number =
  //     this.calculateBuyValue(
  //       numericObject.amountOfShares,
  //       numericObject.buyPrice
  //     );

  //   const commission: number =
  //     this.calculateCommissionValue(
  //       buyValue,
  //       numericObject.commission,
  //       numericObject.minCommission
  //     );

  //   const selBuyCommission = commission * 2;
  //   const numberZero = 0;

  //   result.profit = selBuyCommission.toFixed(2);
  //   result.percentageChange = numberZero.toFixed(2);
  //   result.newPrice = numberZero.toFixed(2);

  //   return result;
  // }

  // /**
  //  * 
  //  * @param repeats 
  //  * @param percentageChange 
  //  * @param numericObject 
  //  */
  // generateObjectOfOffers(
  //   repeats: number,
  //   percentageChange: number,
  //   numericObject: StockTileNumericModel
  // ): StockOfferDictionaryModel {

  //   let result = {} as StockOfferDictionaryModel;
  //   let percentageStep: number = 0.5;
  //   let currentPrice: number;
  //   let profit: number;
  //   let sellValue: number;
  //   let sellCommission: number;
  //   let totalCommission: number;

  //   let buyValue: number =
  //     this.calculateBuyValue(
  //       numericObject.amountOfShares,
  //       numericObject.buyPrice
  //     );

  //   let buyCommission: number =
  //     this.calculateCommissionValue(
  //       buyValue,
  //       numericObject.commission,
  //       numericObject.minCommission
  //     );

  //   for (let i = 0; repeats > i; i++) {

  //     currentPrice = this.calculateCurrentPrice(numericObject.buyPrice, percentageStep);
  //     sellValue = currentPrice * numericObject.amountOfShares;

  //     sellCommission =
  //       this.calculateCommissionValue(
  //         sellValue,
  //         numericObject.commission,
  //         numericObject.minCommission
  //       );

  //     totalCommission =
  //       this.calculateTotalCommissionValue(
  //         buyCommission,
  //         sellCommission
  //       );

  //     profit =
  //       this.calculateProfitBeforeTax(
  //         sellValue,
  //         buyValue,
  //         totalCommission
  //       );

  //     result[i] = {
  //       percentageChange: percentageStep.toFixed(this.numberOfDecimalPlaces),
  //       newPrice: currentPrice.toFixed(this.numberOfDecimalPlaces),
  //       profit: profit.toFixed(this.numberOfDecimalPlaces)
  //     }

  //     percentageStep += percentageChange;
  //   }

  //   return result;
  // }

  // // ===========================================================================

  // /**
  //  * 
  //  * @param numericObject 
  //  */
  // calculateHeader(numericObject: StockTileNumericModel): HeaderCalculationsModel {
  //   const result = {} as HeaderCalculationsModel;
  //   let buyCommission: number;
  //   let sellCommission: number;
  //   let totalCommission: number;

  //   result.buyValue =
  //     this.calculateBuyValue(numericObject.amountOfShares, numericObject.buyPrice);

  //   result.currentPrice =
  //     this.calculateCurrentPrice(numericObject.buyPrice, numericObject.percentageChange);

  //   result.currentValue =
  //     this.calculateCurrentValue(result.currentPrice, numericObject.amountOfShares);

  //   buyCommission =
  //     this.calculateCommissionValue(
  //       result.buyValue,
  //       numericObject.commission,
  //       numericObject.minCommission
  //     );

  //   sellCommission =
  //     this.calculateCommissionValue(
  //       result.currentValue,
  //       numericObject.commission,
  //       numericObject.minCommission
  //     );

  //   totalCommission =
  //     this.calculateTotalCommissionValue(
  //       sellCommission,
  //       buyCommission
  //     );
  //   result.profitBeforeTax =
  //     this.calculateProfitBeforeTax(
  //       result.currentValue,
  //       result.buyValue,
  //       totalCommission
  //     );

  //   // When the current stock price is less or equal the buy price you don't 
  //   // pay tax from losses
  //   if (result.currentPrice <= numericObject.buyPrice) {
  //     result.profitAfterTax = result.profitBeforeTax;
  //   } else {

  //     result.profitAfterTax =
  //       this.calculateProfitAfterTax(
  //         result.profitBeforeTax,
  //         numericObject.taxRate
  //       );
  //   }

  //   result.percentageChange =
  //     this.calculatePercentageChange(
  //       result.currentPrice,
  //       numericObject.buyPrice
  //     );

  //   return result;
  // }
}

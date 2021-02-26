import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockPriceCalculatorService {

  private numberOfDecimalPlaces: number = 2;

  constructor() { }

  get getNumberOfDecimalPlaces(): number {
    return this.numberOfDecimalPlaces;
  }

  /**
   * 
   * @param shareAmount 
   * @param buyPrice 
   */
  calculateBuyValue(shareAmount: number, buyPrice: number): number {
    let result = shareAmount * buyPrice;
    return this.roundingNumberFloorTwoDecimalPlaces(result);
  }

  /**
   * 
   * @param buyValue 
   * @param commissionValue 
   * @param minCommissionValue 
   */
  calculateCommissionValue(buyValue: number, commissionValue: number, minCommissionValue: number): number {
    let calcCommission: number;

    // The brokers commission can't by less than the min. commission
    if (calcCommission < minCommissionValue) return minCommissionValue;

    calcCommission = buyValue * (commissionValue / 100);

    return this.roundingNumberFloorTwoDecimalPlaces(calcCommission);
  }

  /**
   * 
   * @param sellCommission 
   * @param buyCommission 
   */
  calculateTotalCommissionValue(sellCommission: number, buyCommission: number): number {
    return sellCommission + buyCommission;
  }

  /**
   * 
   * @param buyPrice 
   * @param percentageChange 
   */
  calculateCurrentPrice(buyPrice: number, percentageChange: number): number {
    let result: number;

    if (percentageChange === 0) return buyPrice;

    result = buyPrice + (buyPrice * (percentageChange / 100));

    return this.roundingNumberFloorTwoDecimalPlaces(result);
  }

  /**
   * 
   * @param currentPrice 
   * @param shareAmount 
   */
  calculateCurrentValue(currentPrice: number, shareAmount: number): number {
    let result: number;

    result = currentPrice * shareAmount;

    return this.roundingNumberFloorTwoDecimalPlaces(result);
  }

  /**
   * 
   * @param currentValue 
   * @param buyValue 
   * @param totalCommission 
   */
  calculateProfitBeforeTax(currentValue: number, buyValue: number, totalCommission: number): number {
    let result: number;

    result = (currentValue - buyValue) - totalCommission;  

    return this.roundingNumberFloorTwoDecimalPlaces(result);
  }

  /**
   * 
   * @param profitBeforeTax 
   * @param taxRate 
   */
  calculateProfitAfterTax(profitBeforeTax: number, taxRate: number): number {
    let result: number;

    result = profitBeforeTax - (profitBeforeTax * (taxRate / 100));  
      
    return this.roundingNumberFloorTwoDecimalPlaces(result);
  }

  /**
   * 
   * @param buyPrice 
   * @param currentPrice 
   */
  calculatePercentageChange(currentPrice: number, buyPrice: number): number {
    let percentage: number;

    if (buyPrice === currentPrice) return 0;

    if (currentPrice === 0) return -100;

    percentage = (currentPrice * 100) / buyPrice;

    console.log((currentPrice * 100) / buyPrice);

    return this.roundingNumberFloorTwoDecimalPlaces(percentage);
  }

  /**
   * 
   * @param value 
   */
  roundingNumberFloorTwoDecimalPlaces(value: number): number {
    return Math.floor((value) * 100) / 100;
  }
}

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
    return parseFloat((shareAmount * buyPrice).toFixed(this.numberOfDecimalPlaces));
  }

  /**
   * 
   * @param buyValue 
   * @param commissionValue 
   * @param minCommissionValue 
   */
  calculateCommissionValue(buyValue: number, commissionValue: number, minCommissionValue: number): number {
    const calcCommission = parseFloat((buyValue * (commissionValue / 100)).toFixed(this.numberOfDecimalPlaces));

    // The brokers commission can't by less than the min. commission
    if (calcCommission < minCommissionValue) return minCommissionValue;
    return calcCommission;
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
    if (percentageChange === 0) return buyPrice;
    return parseFloat((buyPrice + (buyPrice * (percentageChange / 100))).toFixed(this.numberOfDecimalPlaces));
  }

  /**
   * 
   * @param currentPrice 
   * @param shareAmount 
   */
  calculateCurrentValue(currentPrice: number, shareAmount: number): number {
    return parseFloat((currentPrice * shareAmount).toFixed(this.numberOfDecimalPlaces));
  }

  /**
   * 
   * @param currentValue 
   * @param buyValue 
   * @param totalCommission 
   */
  calculateProfitBeforeTax(currentValue: number, buyValue: number, totalCommission: number): number {
    return parseFloat(((currentValue - buyValue) - totalCommission).toFixed(this.numberOfDecimalPlaces));
  }

  /**
   * 
   * @param profitBeforeTax 
   * @param taxRate 
   */
  calculateProfitAfterTax(profitBeforeTax: number, taxRate: number): number {
    return parseFloat((profitBeforeTax - (profitBeforeTax * (taxRate / 100))).toFixed(this.numberOfDecimalPlaces));
  }

  /**
   * 
   * @param buyPrice 
   * @param currentPrice 
   */
  calculatePercentageChange(buyPrice, currentPrice): number {
    let percentage: number;

    if (buyPrice === currentPrice) return 0;

    percentage = (buyPrice * 100) / currentPrice;

    if (buyPrice > currentPrice) return percentage * -1;

    return (buyPrice * 100) / currentPrice;
  }
}

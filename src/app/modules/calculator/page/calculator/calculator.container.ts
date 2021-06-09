import { Component, OnInit } from '@angular/core';
import { StockPriceCalculatorService } from 'src/app/core/services/stock-price-calculator.service';
import { AdvanceCalculatorFormDataModel, AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.container.html',
})

export class CalculatorContainerComponent implements OnInit {

  private calculatorResult: AdvanceCalculatorResultDataModel;

  constructor(private stockPriceCalculatorService: StockPriceCalculatorService) { }

  ngOnInit(): void {
  }

  /**
 
   * !Obliczanie formy 
   * ! expand box zamkniety , po obliczaniu sie otwiera
   * ! tablica wyników  click event na wartos wyniku
   * ! poprawic kalkulator by liczył dobrze  
   */

  get getCalculationResults(): AdvanceCalculatorResultDataModel {

    return this.calculatorResult;
    
  }

  calculate(calcData: AdvanceCalculatorFormDataModel): void {

    const result: AdvanceCalculatorResultDataModel = {

      netBuyValue: 1,
      grossBuyValue: 1,
      buyCommission: 1,
      sellCommission: 1,
      grossSellValue: 1,
      netSellValue: 1,
      profitBeforeTax: 1,
      profitAfterTax: 1

    };

    // this.stockPriceCalculatorService;
    this.calculatorResult = result;

  }



}

import { Component, OnInit } from '@angular/core';
import { StockPriceCalculatorService } from 'src/app/core/services/stock-price-calculator.service';
import {
	AdvanceCalculatorFormNumberDataModel,
	AdvanceCalculatorFormStringDataModel,
	AdvanceCalculatorResultDataModel
} from 'src/app/data/models/form.model';

@Component({
	selector: 'app-calculator',
	templateUrl: './calculator.container.html',
})

export class CalculatorContainerComponent implements OnInit {

	private calculatorResult: AdvanceCalculatorResultDataModel;

	//==========================================================================

	constructor(private stockPriceCalculatorService: StockPriceCalculatorService) { }

	//==========================================================================

	ngOnInit(): void {


	}

	//==========================================================================

	get getCalculationResults(): AdvanceCalculatorResultDataModel {

		return this.calculatorResult;

	}

	// =============================================================================
	// ============================ Calculation methods ============================
	// =============================================================================

	/**
	 * 
	 * @param calcData 
	 */
	calculate(calcData: AdvanceCalculatorFormStringDataModel): void {

		// converting string object to numeric object
		const numericObject: AdvanceCalculatorFormNumberDataModel =
			this.convertStringObjectValuesToNumber(calcData);

		//======================================================================	

		const netBuyValue: number = this.stockPriceCalculatorService
			.calculateBuyValue(numericObject.amountOfShares, numericObject.buyPrice);

		const percentageBuyCommissionValue: number = this.stockPriceCalculatorService
			.calculatePercentageCommission(netBuyValue, numericObject.commission);

		const buyCommission: number = this.stockPriceCalculatorService
			.calculateCommissionValue(netBuyValue, percentageBuyCommissionValue, numericObject.minCommission);

		const grossBuyValue: number = netBuyValue + buyCommission;

		const grossSellValue: number = this.stockPriceCalculatorService
			.calculateCurrentValue(numericObject.sellPrice, numericObject.amountOfShares);

		const percentageSellCommissionValue: number = this.stockPriceCalculatorService
			.calculatePercentageCommission(grossSellValue, numericObject.commission);

		const sellCommission: number = this.stockPriceCalculatorService
			.calculateCommissionValue(grossSellValue, percentageSellCommissionValue, numericObject.minCommission);

		const totalCommission = this.stockPriceCalculatorService
			.calculateTotalCommissionValue(sellCommission, buyCommission);

		const netSellValue: number = grossSellValue - sellCommission;

		const profitBeforeTax = this.stockPriceCalculatorService.
			calculateProfitBeforeTax(grossSellValue, netBuyValue, totalCommission);

		const profitAfterTax = this.stockPriceCalculatorService.
			calculateProfitAfterTax(profitBeforeTax, numericObject.taxRate);

		const result: AdvanceCalculatorResultDataModel = {

			netBuyValue: netBuyValue,
			buyCommission: buyCommission,
			grossBuyValue: grossBuyValue,
			sellCommission: sellCommission,
			grossSellValue: grossSellValue,
			netSellValue: netSellValue,
			profitBeforeTax: profitBeforeTax,
			profitAfterTax: profitAfterTax

		};

		console.log(result);

		this.calculatorResult = result;

	}

	/**
	 * Convert object key string values to numbers
	 * @param object 
	 * @returns 
	 */
	convertStringObjectValuesToNumber(object: AdvanceCalculatorFormStringDataModel): AdvanceCalculatorFormNumberDataModel {

		let newObject: AdvanceCalculatorFormNumberDataModel = {} as AdvanceCalculatorFormNumberDataModel;

		for (let key in object) {

			newObject[key] = parseFloat(object[key]);

		}

		return newObject;

	}





}

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

		const numericObject: AdvanceCalculatorFormNumberDataModel =
			this.convertStringObjectValuesToNumber(calcData);

			console.log('calculate');
			

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

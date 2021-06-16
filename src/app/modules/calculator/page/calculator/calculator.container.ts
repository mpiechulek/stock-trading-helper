import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
	private arrayOfResults: Object[] = [];

	// =========================================================================

	private chosenResultSubject = new BehaviorSubject<string>('0');
	private chosenResultSubject$: Observable<string> = this.chosenResultSubject.asObservable();

	//==========================================================================

	constructor(private stockPriceCalculatorService: StockPriceCalculatorService) { }

	//==========================================================================

	ngOnInit(): void {

	}
	

	//==========================================================================

	/**
	 * 
	 */
	get getCalculationResults(): AdvanceCalculatorResultDataModel {

		return this.calculatorResult;

	}

	/**
	 * 
	 */
	get getArrayOfResults(): Object {

		return this.arrayOfResults;

	}

	/**
	 * 
	 */
	get getChosenResult$(): Observable<string> {

		return this.chosenResultSubject$;

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

		const profitBeforeTax: number = this.stockPriceCalculatorService.
			calculateProfitBeforeTax(grossSellValue, netBuyValue, totalCommission);

		let profitAfterTax: number;

		// We don't pay taxes from losses
		if (profitBeforeTax < 0) {

			profitAfterTax = profitBeforeTax;

		} else {

			profitAfterTax = this.stockPriceCalculatorService.
				calculateProfitAfterTax(profitBeforeTax, numericObject.taxRate);

		}

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

	/**
	  * 
	  */
	onSaveResultToArray(arrayOfResults: any): void {	

		this.arrayOfResults.push(arrayOfResults);

	}	
	
	/**
	  * 
	  */
	onResetBoardOfResults(): void {

		this.arrayOfResults = [];

	}

	/**
	 * 
	 * @param result 
	 */
	onChoseResult(result: string): void {		

		this.chosenResultSubject.next(result);

	}

}

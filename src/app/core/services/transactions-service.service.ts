import { Injectable } from '@angular/core';
import { StockSellModel } from 'src/app/data/models/stock-tile.model';

@Injectable({
	providedIn: 'root'
})

export class TransactionsServiceService {

	constructor() { }

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	generateTransactionsProfitArray(data: StockSellModel[]): any[] {

		let profitArray = [];

		data.forEach((trans) => {

			profitArray.push(

				{
					profitBeforeTax: trans.profitBeforeTax,
					sellDate: trans.sellDate
				}

			);

		});

		return profitArray;
	}

	/**
	 * 
	 */
	generateProfitLossInfo() {

	}

}

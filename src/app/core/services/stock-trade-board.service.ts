import { Injectable } from '@angular/core';
import { TradeFormData } from '../../data/models/form.model';
import { StockMarkerSaveDataModel, StockTileModel } from '../../data/models/stock-tile.model';
import * as uuid from 'uuid';
import { Observable, Subject } from 'rxjs';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';
import { SnackBarService } from './snack-bar.service';

@Injectable({
	providedIn: 'root'
})

export class StockTradeBoardService {

	private storageTradeBoardKeyName: string = 'tradeBoardData';
	private storageTradeTransactionKeyName: string = 'transactionData';

	private stockBoardArraySubject = new Subject<StockTileModel[]>();
	private stockBoardArray$ = this.stockBoardArraySubject.asObservable();

	private transactionsArraySubject = new Subject<StockSellModel[]>();
	private transactionsArraySubject$ = this.transactionsArraySubject.asObservable();

	private transactionsProfitArray = new Subject<StockSellModel[]>();
	private transactionsProfitArray$ = this.transactionsProfitArray.asObservable();

	constructor(private snackBarService: SnackBarService) { }

	// =========================================================================

	/**
	 * 
	 */
	get getStockBoardArray() {
		return this.stockBoardArray$;
	}

	/**
	 * 
	 */
	get getTransactionsArray(): Observable<StockSellModel[]> {
		return this.transactionsArraySubject$;
	}


	// =============================================================================
	// ========================= Trade board local storage =========================
	// =============================================================================

	/**
	 * 
	 */
	checkIfTradeBoardDataInLocalStorage(): boolean {

		return localStorage.getItem(this.storageTradeBoardKeyName) === null;

	}

	/**
	 * 
	 */
	getTradeBoardDataFromLocalStorage(): StockTileModel[] {

		let tradeBoardDataArray: StockTileModel[];

		if (this.checkIfTradeBoardDataInLocalStorage()) {

			tradeBoardDataArray = [];

		} else {

			tradeBoardDataArray = JSON.parse(localStorage.getItem(this.storageTradeBoardKeyName));
		}



		return [...tradeBoardDataArray];
	}

	/**
	 * 
	 * @param data 
	 */
	saveTradeBoardDataToLocalStorage(data: StockTileModel[]): void {

		localStorage.setItem(this.storageTradeBoardKeyName, JSON.stringify(data));

	}

	/**
	 * 
	 */
	fetchTradeBoardData(): void {

		let boardData = this.getTradeBoardDataFromLocalStorage();

		this.stockBoardArraySubject.next(boardData);
		
	}


	// =============================================================================
	// ==================== Trade board data manipulator logic =====================
	// =============================================================================

	/**
	 *  Creating a new object from the received form data, adding to it an id, also 
	 *  setting the selectedPrice to default value
	 * @param formData 
	 */
	creatingNewPosition(formData: TradeFormData): void {

		let tradeBoardArr: StockTileModel[];
		let newStockTile: StockTileModel;

		// Creating a new stock trade tile object
		newStockTile = {
			...formData,
			id: uuid.v4(),
			markerOfferType: null,
			markerOfferValue: null
		};

		// Getting the tile object list form local storage
		tradeBoardArr = this.getTradeBoardDataFromLocalStorage();

		// appending the list with the new position
		tradeBoardArr.push(newStockTile);

		// Save to storage 
		this.saveTradeBoardDataToLocalStorage(tradeBoardArr);

		// Informing subscribers
		this.stockBoardArraySubject.next(tradeBoardArr);

		// checking if the stock is saved in local storage
		const createdStock = this.findStockInArray(newStockTile.id);

		// Displaying proper snack bar message
		if (newStockTile.id === createdStock.id) {

			this.snackBarService.onDisplaySuccess('Success created new position');

		} else {

			this.snackBarService.onDisplayError('Failed to create position');

		}

	}

	/**
	 * Updating a position in the stock trade board array
	 * @param objectEdit 
	 */
	editTradeBoardArrayData(objectEdit: TradeFormData, stockId: string): void {
		let tradeBoardArr: StockTileModel[] = this.getTradeBoardDataFromLocalStorage();

		const elementsIndex = this.findStockArrayIndex(stockId);

		tradeBoardArr[elementsIndex] = {
			...objectEdit,
			id: stockId,
			markerOfferType: null,
			markerOfferValue: null
		};

		this.saveTradeBoardDataToLocalStorage(tradeBoardArr);

		this.stockBoardArraySubject.next(tradeBoardArr);

		// checking if the stock is saved in local storage
		const editedStock = this.findStockInArray(tradeBoardArr[elementsIndex].id);

		// Displaying proper snack bar message
		if (stockId === editedStock.id) {

			this.snackBarService.onDisplaySuccess('Success edited position');

		} else {

			this.snackBarService.onDisplayError('Failed to edit position');

		}

	}

	/**
	 * Saving the picked stock offer
	 *  @param value
	 */
	savePickedOfferToStockData(value: StockMarkerSaveDataModel): void {

		let tradeBoardArr: StockTileModel[] = this.getTradeBoardDataFromLocalStorage();

		const stockToEdit: StockTileModel = this.findStockInArray(value.id);

		const elementsIndex = this.findStockArrayIndex(value.id);

		tradeBoardArr[elementsIndex] = {
			...stockToEdit,
			markerOfferType: value.markerOfferType,
			markerOfferValue: value.markerOfferValue
		};

		this.stockBoardArraySubject.next(tradeBoardArr);

		this.saveTradeBoardDataToLocalStorage(tradeBoardArr);

		// checking if the stock is saved in local storage
		const savedStock = this.findStockInArray(value.id);

		// Displaying proper snack bar message
		if (value.id === savedStock.id) {

			this.snackBarService.onDisplaySuccess('Success saved position offer');

		} else {

			this.snackBarService.onDisplayError('Failed to save position offer');

		}
	}

	/**
	 * 
	 * @param stockId 
	 */
	deletePositionFromBoard(stockId: string): void {

		let tradeBoardArr: StockTileModel[] = this.getTradeBoardDataFromLocalStorage();

		let newArr = [...tradeBoardArr];

		newArr = newArr.filter((element) => {
			return element.id !== stockId;
		});

		// Updating ui
		this.stockBoardArraySubject.next(newArr);

		this.saveTradeBoardDataToLocalStorage(newArr);

		// checking if the stock is saved in local storage
		const deleteStock = this.findStockInArray(stockId);

		// Displaying proper snack bar message
		if (deleteStock === null) {

			this.snackBarService.onDisplaySuccess('Position was deleted successfully');

		} else {

			this.snackBarService.onDisplayError('Failed to delete position');

		}

	}

	/**
	* 
	* @param stockId 
	*/
	findStockInArray(stockId: string): StockTileModel {

		let tradeBoardArr: StockTileModel[] = this.getTradeBoardDataFromLocalStorage();

		const elementIndex: number = this.findStockArrayIndex(stockId);

		if (elementIndex === null || elementIndex === -1) return null;

		return tradeBoardArr[elementIndex];
	}

	/**
	 * 
	 * @param stockId 
	 */
	findStockArrayIndex(stockId: string): number {

		let tradeBoardArr: StockTileModel[] = this.getTradeBoardDataFromLocalStorage();

		let elementIndex: number = null;

		elementIndex = tradeBoardArr.findIndex((element) => {

			return element.id === stockId;

		});

		return elementIndex;
	}

	// =========================================================================
	// =================== Sold stock transactions local storage  ==============
	// =========================================================================

	/**
	 * 
	 * @returns 
	 */
	checkIfTransactionsInLocalStorage() {

		return localStorage.getItem(this.storageTradeTransactionKeyName) === null;

	}

	/**
	 * 
	 * @returns 
	 */
	getTransactionsFromLocalStorage(): StockSellModel[] {

		let transactions: StockSellModel[];

		if (this.checkIfTransactionsInLocalStorage()) {

			transactions = [];

		} else {

			transactions = JSON.parse(localStorage.getItem(this.storageTradeTransactionKeyName));

		}

		return [...transactions];

	}

	/**
	 * 
	 * @param data 
	 */
	saveTransactionToLocalStorage(data: StockSellModel[]): void {

		localStorage.setItem(this.storageTradeTransactionKeyName, JSON.stringify(data));

	}

	/**
	 * 
	 */
	fetchTransactions(): void {

		const transactions = this.getTransactionsFromLocalStorage();

		this.transactionsArraySubject.next(transactions);

	}

	// =========================================================================
	// ==================== Transactions data manipulator logic ================
	// =========================================================================

	/**
	 * Selling the chosen stock, and deleting it form the board list
	 */
	sellStock(stockSellData: StockSellModel): void {

		this.createNewSellTransaction(stockSellData);

		this.deletePositionFromBoard(stockSellData.id);

		// checking if the stock is saved in local storage
		const soldStock = this.findTransactionInArray(stockSellData.id);

		// Displaying proper snack bar message
		if (soldStock.id === stockSellData.id) {

			this.snackBarService.onDisplaySuccess('Position was sold successfully');

		} else {

			this.snackBarService.onDisplayError('Failed to sell position');

		}
	}

	/**
	 * 
	 * @param stockSellData 
	 */
	createNewSellTransaction(stockSellData: StockSellModel) {

		const currentDate = new Date();

		const transactions: StockSellModel[] = this.getTransactionsFromLocalStorage();

		const newTransaction: StockSellModel = {

			sellDate: currentDate,
			...stockSellData

		}

		transactions.push(newTransaction);

		this.saveTransactionToLocalStorage(transactions);

		this.transactionsArraySubject.next(transactions);

	}

	/**
	 * 
	 * @param tradeId 
	 */
	deleteTransaction(tradeId: string): void {

		let transactionArr: StockSellModel[] = this.getTransactionsFromLocalStorage();

		let newTransactionArr = [...transactionArr];

		newTransactionArr = newTransactionArr.filter((element) => {

			return element.id !== tradeId;

		});

		// Updating ui
		this.transactionsArraySubject.next(newTransactionArr);

		this.saveTransactionToLocalStorage(newTransactionArr);

		// checking if the stock is saved in local storage
		const deleteTransaction = this.findTransactionInArray(tradeId);

		// Displaying proper snack bar message
		if (deleteTransaction === null) {

			this.snackBarService.onDisplaySuccess('Transaction was deleted');

		} else {

			this.snackBarService.onDisplayError('Failed to delete transaction');

		}

	}

	/**
	 * 
	 */
	editTransaction(): void {

	}


	/**
	* 
	* @param stockId 
	*/
	findTransactionInArray(stockId: string): StockSellModel {

		let transactionArr: StockSellModel[] = this.getTransactionsFromLocalStorage();

		const elementIndex: number = this.findStockArrayIndex(stockId);

		if (elementIndex === null || elementIndex === -1) return null;

		return transactionArr[elementIndex];
	}

	/**
	 * 
	 * @param stockId 
	 */
	findTransactionIndex(stockId: string): number {

		let transactionArr: StockSellModel[] = this.getTransactionsFromLocalStorage();

		let elementIndex: number = null;

		elementIndex = transactionArr.findIndex((element) => {

			return element.id === stockId;

		});

		return elementIndex;
	}

	/**
	 * Removing trade board and transactions data dorm local storage
	 */
	clearLocalStorageData(): void {

		localStorage.removeItem(this.storageTradeBoardKeyName);
		localStorage.removeItem(this.storageTradeTransactionKeyName);

	}

}

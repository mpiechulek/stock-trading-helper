import { Injectable } from '@angular/core';
import { TradeFormData } from '../../data/models/form.model';
import { StockMarkerSaveDataModel, StockTileModel } from '../../data/models/stock-tile.model';
import * as uuid from 'uuid';
import { Subject } from 'rxjs';
import { StockSellModel, TransactionProfitModel } from 'src/app/data/models/statistics-section.model';

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

  private transactionsProfitArray = new Subject<TransactionProfitModel[]>();
  private transactionsProfitArray$ = this.transactionsProfitArray.asObservable();

  constructor() { }

  /**
   * 
   */
  get getStockBoardArray() {
    return this.stockBoardArray$;
  }

  /**
   * 
   */
  get getTransactionsArray() {
    return this.transactionsArraySubject$;
  }

  /**
   * 
   */
  get getTransactionsProfitArray() {
    return this.transactionsProfitArray$;
  }

  // ===========================================================================

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

    this.stockBoardArraySubject.next(tradeBoardDataArray);

    return [...tradeBoardDataArray];
  }

  /**
   * 
   * @param data 
   */
  saveTradeBoardDataToLocalStorage(data: StockTileModel[]): void {
    localStorage.setItem(this.storageTradeBoardKeyName, JSON.stringify(data));
  }

  // ===========================================================================

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
  }

  /**
   * 
   * @param stockId 
   */
  findStockInArray(stockId: string): StockTileModel {
    let tradeBoardArr: StockTileModel[] = this.getTradeBoardDataFromLocalStorage();
    let elementsIndex: number = null;

    elementsIndex = tradeBoardArr.findIndex((element) => {
      return element.id === stockId;
    });

    if (elementsIndex === null) return null;

    return tradeBoardArr[elementsIndex];
  }

  /**
   * 
   * @param stockId 
   */
  findStockArrayIndex(stockId: string): number {
    let tradeBoardArr: StockTileModel[] = this.getTradeBoardDataFromLocalStorage();

    const elementIndex = tradeBoardArr.findIndex((element) => {
      return element.id === stockId;
    });

    return elementIndex;
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
  }

  /**
   * Editing the stock offer
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
  }


  /**
   * Selling the chosen stock, and deleting it form the board list
   */
  sellStock(stockSellData: StockSellModel): void {

    this.createNewSellTransaction(stockSellData);

    this.deletePositionFromBoard(stockSellData.id);
  }


  // =============================================================================
  // ============================== Sold stock data ==============================
  // =============================================================================

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

    // Informing all subscribers
    this.transactionsArraySubject.next(transactions);

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

    this.generateTransactionsProfitArray(transactions)

  }

  	/**
	 * Creating an array of objects [{profitBeforeTax: 223, sellDate:"2021-05-30T09:26:32.081Z" }]
   * This will not be saved in localStorage, it wil by generated form transaction sell data array
	 * @param data 
	 * @returns 
	 */
	generateTransactionsProfitArray(data: StockSellModel[]) {

		let profitArray = [];

		data.forEach((trans) => {

			profitArray.push(

				{
					profitBeforeTax: trans.profitBeforeTax,
					sellDate: trans.sellDate
				}

			);

		});

    this.transactionsProfitArray.next();
	
	}



  deleteTransaction() {

  }

  editTransaction() {

  }


}

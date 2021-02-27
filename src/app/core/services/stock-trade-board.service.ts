import { Injectable } from '@angular/core';
import { TradeFormData } from '../../data/models/form.model';
import { StockMarkerSaveDataModel, StockTileModel } from '../../data/models/stock-tile.model';
import * as uuid from 'uuid';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockTradeBoardService {

  private storageTradeBoardKeyName: string = 'tradeBoardData';
  private stockBoardArraySubject = new Subject<StockTileModel[]>();
  private stockBoardArray$ = this.stockBoardArraySubject.asObservable();

  constructor() { }

  get getStockBoardArray() {
    return this.stockBoardArray$;
  }

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
   *  @param value
   */
  savePickedOfferToStockData(value:StockMarkerSaveDataModel): void {
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
}

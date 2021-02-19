import { Injectable } from '@angular/core';
import { TradeFormData } from '../../data/models/form.model';
import { StockTileModel } from '../../data/models/stock-tile.model';
import * as uuid from 'uuid';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockTradeBoardService {

  private storageTradeBoardKeyName: string = 'tradeBoardData';

  private stockBoardArray: StockTileModel[];
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
    return localStorage.getItem(this.storageTradeBoardKeyName) !== null;
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

    return tradeBoardDataArray;
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
    newStockTile = { ...formData, id: uuid.v4(), selectedPrice: null };

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
   * Updating a position in the stock trade board array
   * @param objectEdit 
   */
  editTradeBoardData(objectEdit: StockTileModel): void {
    let tradeBoardArr: StockTileModel[] = this.getTradeBoardDataFromLocalStorage();
    let newArr: StockTileModel[];

    const elementsIndex = tradeBoardArr.findIndex((element) => {
      return element.id == objectEdit.id;
    });

    newArr = [...tradeBoardArr];

    newArr[elementsIndex] = objectEdit;

    this.saveTradeBoardDataToLocalStorage(newArr);
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

    this.saveTradeBoardDataToLocalStorage(newArr);
  }
}

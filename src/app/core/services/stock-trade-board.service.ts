import { Injectable } from '@angular/core';
import { TradeFormData } from '../../data/models/form.model';
import { StockTileModel } from '../../data/models/stock-tile.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StockTradeBoardService {

  private storageTradeBoardKeyName: string = 'tradeBoardData';

  constructor() { }

  // =============================================================================
  // =================== Saving/Reading the trade board data  ====================
  // =============================================================================

  checkIfTradeBoardDataInLocalStorage(): boolean {
    return localStorage.getItem(this.storageTradeBoardKeyName) === null;
  }

  getTradeBoardDataFromLocalStorage() {
    let tradeBoardDataArray: [];
    if (this.checkIfTradeBoardDataInLocalStorage()) {
      tradeBoardDataArray = [];
    } else {
      tradeBoardDataArray = JSON.parse(localStorage.getItem(this.storageTradeBoardKeyName));
    }
    return tradeBoardDataArray;
  }

  addTradeBoardDataToLocalStorage(formData: TradeFormData): void {
    let tradeBoardArr: StockTileModel[];
    let newStockTile: StockTileModel;

    // Creating a new stock trade tile object
    newStockTile = { ...formData, id: uuid.v4(), selectedPrice: null };

    // Getting the tile object list form local storage
    tradeBoardArr = this.getTradeBoardDataFromLocalStorage();

    // appending the list with the new position
    tradeBoardArr.push(newStockTile);

    // Updating the storage 
    localStorage.setItem(this.storageTradeBoardKeyName, JSON.stringify(tradeBoardArr));
  }
}

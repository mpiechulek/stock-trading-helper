import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TradeFormData } from './../../data/models/form.model';
import * as uuid from 'uuid';
import { StockTileModel } from '../../data/models/stock-tile.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private storageFormKeyName: string = 'entreFormData';
  private storageTradeBoardKeyName: string = 'tradeBoardData';
  private entreFormSubject = new Subject<TradeFormData>();
  // private entreFormSubject$: Observable<TradeFormData> = this.entreFormSubject.asObservable();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  get getEntreFormSubject(): Observable<TradeFormData> {
    return this.entreFormSubject.asObservable();
  }

  // =============================================================================
  // ====== Saving to local storage the last state of the stock entry form =======
  // =============================================================================


  checkIfEntreFormDataInLocalStorage(): boolean {
    return localStorage.getItem(this.storageFormKeyName) === null;
  }

  getEntreFormDataFromLocalStorage() {
    let formData: TradeFormData;
    if (this.checkIfEntreFormDataInLocalStorage()) {
      formData = JSON.parse(localStorage.getItem(this.storageFormKeyName));
      this.entreFormSubject.next(formData);
    }
  }

  saveEntreFormDataToLocalStorage(enteredObject: TradeFormData): void {
    localStorage.setItem(this.storageFormKeyName, JSON.stringify(enteredObject));
  }

  // =============================================================================
  // ==== Bug fix, the form data comes with a number with too many decimal pl- ===
  // ====================== aces, when your typing to fast =======================
  // =============================================================================

  fixeNumberDecimalPlaces(value: string) {
    let arr: string[];

    if (!value.includes('.')) return value;

    arr = value.split('.');

    if (arr[1].length > 4) return arr[0] + '.' + arr[1].slice(0, -2);

    return value;
  }

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

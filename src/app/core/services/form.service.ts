import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TradeFormData } from './../../data/models/form.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private storageFormKeyName: string = 'entreFormData';
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
    enteredObject.id = uuid.v4();
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

  //1 get postions form local storage

  // 2 append position to array

  // 3 save position to local sotrage

  // saveStockPositionToLocalStorage(enteredPosition: TradeFormData): void {
  //   localStorage.setItem(this.storageFormKeyName, JSON.stringify(enteredObject));
  // }


}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TradeFormData } from './../../data/models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formData: TradeFormData = null;

  private storageFormKeyName: string = 'entreFormData';

  private entreFormSubject = new Subject<TradeFormData>();
  private entreFormSubject$ = this.entreFormSubject.asObservable();

  constructor(
  ) { }

  ngOnInit(): void {

  }

  // =============================================================================
  // ====== Saving to local storage the last state of the stock entry form =======
  // =============================================================================


  checkIfEntreFormDataInLocalStorage(): boolean {
    return localStorage.getItem(this.storageFormKeyName) !== null;
  }

  getEntreFormDataFromLocalStorage(): void {   
    if (this.checkIfEntreFormDataInLocalStorage()) {
      this.formData = JSON.parse(localStorage.getItem(this.storageFormKeyName));          
      this.entreFormSubject.next(this.formData);
    }
  }

  getEntreFormSubject() {
    return this.entreFormSubject;
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

    if (arr[1].length > 4) return arr[0] + '.' + arr[1].slice(0, 4);

    return value;
  }
}

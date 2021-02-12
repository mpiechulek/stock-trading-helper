import { Injectable } from '@angular/core';
import { TradeFormData } from 'src/app/data/models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private storageFormKeyName: string = 'entreFormData';

  constructor(
  ) { }

  ngOnInit(): void {
  }

  checkIfEntreFormDataInLocalStorage(): boolean {
    return localStorage.getItem(this.storageFormKeyName) === null;
  }

  getEntreFormDataFromLocalStorage(): TradeFormData {
    if (this.checkIfEntreFormDataInLocalStorage()) {
      return JSON.parse(localStorage.getItem(this.storageFormKeyName));
    }
    return null;
  }

  saveEntreFormDataToLocalStorage(enteredObject: TradeFormData): void {
    localStorage.setItem(this.storageFormKeyName, JSON.stringify(enteredObject));
  }

  fixeNumberDecimalPlaces(value: string) {
    let arr: string[];
    if (value.includes('.')) {
      arr = value.split('.');
      return arr[0] + '.' + arr[1].slice(0, -2);
    }
    return value;
  }

}

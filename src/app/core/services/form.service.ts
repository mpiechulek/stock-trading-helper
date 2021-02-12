import { Injectable } from '@angular/core';
import { TradeFormData } from 'src/app/data/models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  storageFormKeyName: string = 'entreFormData';  

  constructor(
   
  ) { }

  checkIfEntreFormDataInLocalStorage(): boolean {

    return;

  }

  getEntreFormDataFromLocalStorage(): TradeFormData {

    if(this.checkIfEntreFormDataInLocalStorage()){

    }

    return;
  }

  saveEntreFormDataToLocalStorage() {
    
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

import { Injectable } from '@angular/core';
import { TransactionWalletModel } from 'src/app/data/models/statistics-section.model';

@Injectable({
  providedIn: 'root'
})
export class AdvancedPipeChartPresenter {

  constructor() { }

  /**
   * 
   * @param width 
   */
   onChangeChartSize(width: number, transactionWalletData: TransactionWalletModel[] ): number[] {

    let multiplier: number;
    let setHeight: number = 100;
    let view:number[] =[600, 800];

    if(transactionWalletData === undefined) return view;

    multiplier = transactionWalletData.length;

    setHeight = (setHeight * multiplier); 

    if(setHeight <= 400) {

      setHeight=400
      
    }

    if (width > 1440) {

      view = [600, setHeight];

    } else if (width <= 1440 && width > 960) {

      view = [450, setHeight];

    } else if (width <= 960 && width > 800) {

      view = [350, setHeight];

    } else if (width <= 800 && width > 400) {

      view = [340, setHeight * 1.5];

    } else if (width <= 400) {

      view = [200, setHeight * 1.5];

    }

    console.log(view);    

    return view;
  }

}

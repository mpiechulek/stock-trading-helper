import { Injectable } from '@angular/core';
import { StockSellModel } from 'src/app/data/models/stock-tile.model';
import { forEachChild } from 'typescript';

@Injectable({
  providedIn: 'root'
})

export class TransactionsServiceService {

  constructor() { }

  generateTransactionsProfitArray(data: StockSellModel[]) {

    let profitArray = [];

    data.forEach((transaction)=> {

      profitArray.push({});

    })


  }

  generateProfitLossInfo() {

  }

}

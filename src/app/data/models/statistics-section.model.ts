import { HeaderCalculationsModel } from "./stock-tile.model";

export interface TradeTableDataModel {
    position: number;
    stockName: string;
    quantity: string;
    buyPrice: string;
    sellPrice: string;
    profitBeforeTax: string;
    profitAfterTax: string;   
    date: string;
  }

  export interface StockSellModel extends HeaderCalculationsModel{
    id: string;
    companyName: string;   
    sellDate?: Date;
}

export interface TransactionProfitModel {
    value: number;
    sellDate: string;
}
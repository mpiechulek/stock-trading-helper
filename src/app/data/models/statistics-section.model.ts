import { HeaderCalculationsModel } from "./stock-tile.model";

export interface StockSellModel extends HeaderCalculationsModel { 
    companyName: string;
    sellDate?: Date;
}

export interface TransactionProfitArrayModel {
    value: number | string;   
    name: string;  
}

export interface TransactionProfitModel {    
    name: string;
    series: any[];
}
import { HeaderCalculationsModel } from "./stock-tile.model";

export interface StockSellModel extends HeaderCalculationsModel { 
    companyName: string;
    sellDate?: Date | string;
}

export interface TransactionProfitArrayModel {
    value: number | string;   
    name: string;  
}

export interface TransactionProfitModel {    
    name: string;
    series: any[];
}

export interface TransactionWalletModel {
    name: string;
    value: number;
}

// export interface TradeLinearChartData {

// }


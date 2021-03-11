export interface CurrencyApiDataModel {
    base: string;
    date: string;
    time_last_updated: number;
    rates: CurrencyList;
}

export interface CurrencyList {
    [key: string]: number;  
}
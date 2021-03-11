export interface CurrencyApiDataModel {
    base: string;
    date: string;
    time_last_updated: number;
    rates: CurrencyList;
}

export interface CurrencyList {
    [key: string]: number;
}

export interface CryptoCurrencyApiModel {
    ticker: CryptoCurrencyApiTickerModel;
}

export interface CryptoCurrencyApiTickerModel {
    base: string;
    target: string;
    price: string;
    volume: string;
    change: string;
    markets: Object[];
    timestamp: number
    success: boolean;
    error: string
}
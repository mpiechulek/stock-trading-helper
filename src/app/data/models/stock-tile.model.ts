export interface StockTileModel {
    id: string;
    companyName: string;
    amountOfShares: string;
    buyPrice: string;
    taxRate: string;
    commission: string;
    minCommission: string;
    percentageChange?: string;
}

export interface HeaderCalculationsModel {
    buyValue: number;
    currentPrice: number;
    currentValue: number;
    profitBeforeTax: number;
    profitAfterTax: number;
    percentageChange: number;
}

export interface StockOfferModel {
    percentageChange: number;
    newPrice: number;
    profit: number;   
}

export interface StockOfferDictionaryModel {
    [ index: string ]: StockOfferModel ; 
}


export interface StockTileNumericModel {
    amountOfShares: number;
    buyPrice: number;
    taxRate: number;
    commission: number;
    minCommission: number;
    percentageChange?: number;
}


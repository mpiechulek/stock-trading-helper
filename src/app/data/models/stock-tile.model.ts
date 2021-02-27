export interface StockTileModel {
    id: string;
    companyName: string;
    amountOfShares: string;
    buyPrice: string;
    taxRate: string;
    commission: string;
    minCommission: string;
    percentageChange?: string;
    markerOfferType?: string;
    markerOfferValue?: number;
    calcStepCount?: number;
    calcStepValue?: number;
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
    percentageChange: string;
    newPrice: string;
    profit: string;  
    selected?: boolean;  
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

export interface SelectedOfferMarkerModel {
    profit: number;
    lose: number;
    neutral:number;
}



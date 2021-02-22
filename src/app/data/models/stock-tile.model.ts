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
    valueChange: number;
    profit: number;
    changeSymbol?: string; 
}

export interface StockTileNumericModel {
    amountOfShares: number;
    buyPrice: number;
    taxRate: number;
    commission: number;
    minCommission: number;
    percentageChange?: number;
}


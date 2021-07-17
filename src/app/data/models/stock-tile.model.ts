export interface StockTileModel {
    id: string;
    companyName: string;
    amountOfShares: string;
    buyPrice: string;
    taxRate: string;
    commission: string;
    minCommission: string;
    markerOfferType?: string;
    markerOfferValue?: string;
    calcStepCount?: number;
    calcStepValue?: string;
}
export interface HeaderCalculationsModel {
    id?: string;
    amountOfShares: number;
    buyPrice: number;
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

// object of objects
export interface StockOfferDictionaryModel {
    [index: string]: StockOfferModel;
}

export interface StockTileNumericModel {
    amountOfShares: number;
    buyPrice: number;
    taxRate: number;
    commission: number;
    minCommission: number;
    percentageChange?: number;
    markerOfferType?: string;
    markerOfferValue?: string;
    calcStepCount?: number;
    calcStepValue?: number;
}

export interface SelectedOfferMarkerModel {
    profit: number;
    lose: number;
    neutral: number;
}

export interface StockMarkerSaveDataModel {
    id: string;
    markerOfferValue: string;
    markerOfferType: string;
}

export interface OfferClickEventEmitDataModel {
    event: MouseEvent,
    listMarker: string
}






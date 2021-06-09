export interface TradeFormData {
    companyName: string;
    amountOfShares: string;
    buyPrice: string;
    taxRate: string;
    commission: string;
    minCommission: string;
    calcStepCount?: number;
    calcStepValue?: string;
}

export interface AdvanceCalculatorFormDataModel {

    buyPrice: string;
    amountOfShares: string;
    sellPrice: string;
    taxRate: string;
    commission: string;
    minCommission: string;

}

export interface AdvanceCalculatorResultDataModel {

    netBuyValue: number;
    grossBuyValue: number;
    buyCommission: number;
    sellCommission: number;
    grossSellValue: number;
    netSellValue: number;
    profitBeforeTax: number;
    profitAfterTax: number;
    
}
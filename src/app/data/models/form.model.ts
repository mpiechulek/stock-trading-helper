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
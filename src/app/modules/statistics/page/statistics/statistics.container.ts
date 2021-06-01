import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { StockTradeBoardService } from 'src/app/core/services/stock-trade-board.service';
import { StockSellModel, TransactionProfitModel, TransactionWalletModel } from 'src/app/data/models/statistics-section.model';
import { StockTileModel } from 'src/app/data/models/stock-tile.model';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.container.html'

})
export class StatisticsContainerComponent implements OnInit {

    private transactionsSubscription: Subscription;
    private transactionsData: StockSellModel[];

    private profitLossesData;
    private linearChartData;
    private transactionWallet:TransactionWalletModel[];

    constructor(private stockTradeBoardService: StockTradeBoardService) { }

    ngOnInit(): void {


        this.transactionsSubscription =

            this.stockTradeBoardService.getTransactionsArray

                .subscribe((data) => {

                    this.transactionsData = data;

                    this.profitLossesData = this.calculateProfitLosses(data);

                    this.linearChartData = this.calculateLinearChart(data);

                    this.transactionWallet = this.generateTransactionsWallet(data);
                    
                });

        this.stockTradeBoardService.getTransactionsFromLocalStorage();

    }

    ngOnDestroy(): void {

        if (this.transactionsSubscription) {

            this.transactionsSubscription.unsubscribe();

        }

    }

    //==========================================================================

    /**
     * 
     */
    get getProfitLossesData() {

        return this.profitLossesData;

    }

    /**
   * 
   */
    get getLinearChartData() {

        return this.linearChartData;

    }

    /**
    * 
    */
    get getTransactionWallet(): TransactionWalletModel[] {

        return this.transactionWallet;

    }

    /**
     * 
     */
    get getTransactionsData(): StockSellModel[] {

        return this.transactionsData;

    }

     //==========================================================================

    /**
     * Calculating total profits value, total loses value and total trade balance
     * @param tradeData 
     * @returns 
     */
    calculateLinearChart(tradeData: StockSellModel[]) {

        let dataArray = [
            { 
               name: 'Profit/Lose' ,
               series: []
            }
        ];

        let profitTotalValue: number = 0;

        tradeData.forEach((trade) => {

            profitTotalValue = profitTotalValue + trade.profitBeforeTax;

            dataArray[0].series.push(

                {

                    name: trade.sellDate,
                    value: profitTotalValue.toFixed(2)

                }

            )

        });          

        return dataArray;

    }

    /**
     * Calculating total profits value, total loses value and total trade balance
     * @param tradeData 
     * @returns 
     */
    calculateProfitLosses(tradeData: StockSellModel[]) {

        let profitValue: number = 0;
        let lossValue: number = 0;

        tradeData.forEach((trade) => {

            if (trade.profitBeforeTax > 0) {

                profitValue = profitValue + trade.profitBeforeTax;

            } else {

                lossValue = lossValue - trade.profitBeforeTax;

            }

        });

        let profitLossesData = [

            {
                "name": "Lose",
                "percentage": (((lossValue) * 100) / (profitValue + lossValue)).toFixed(2),
                "value": lossValue.toFixed(2)
            },
            {
                "name": "Profit",
                "percentage": (((profitValue) * 100) / (profitValue + lossValue)).toFixed(2),
                "value": profitValue.toFixed(2)
            }

        ];

        return profitLossesData;

    }

    /**
     * 
     * @param tradeData 
     * @returns 
     */
    generateTransactionsWallet(tradeData: StockSellModel[]): any {

        let dataArray: TransactionWalletModel[] = [];

        tradeData.forEach((trade) => {

            dataArray.push({

                name: trade.companyName,
                value: trade.profitBeforeTax

            });

        });

        return dataArray;

    }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { id } from '@swimlane/ngx-charts';
import { Observable, Subject, Subscription } from 'rxjs';
import { StockTradeBoardService } from 'src/app/core/services/stock-trade-board.service';
import { StatisticTypeMarker } from 'src/app/data/enums/statistics-markers.enum';
import { StockSellModel, TransactionWalletModel } from 'src/app/data/models/statistics-section.model';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.container.html'

})
export class StatisticsContainerComponent implements OnInit, OnDestroy {


    private chosenTypeOfDataForDisplay = StatisticTypeMarker;

    private loseProfitDataMarker: string = this.chosenTypeOfDataForDisplay.profit

    private chartColorPallet = {
        domain: [
            '#00A8FF'
        ]
    };

    private transactionsSubscription: Subscription;
    private transactionsData: StockSellModel[];

    private transactionsDataSubject = new Subject<StockSellModel[]>();
    private transactionsDataSubject$: Observable<StockSellModel[]> = this.transactionsDataSubject.asObservable();

    private profitLossesData: any;
    private linearChartData: any;
    private transactionWallet: TransactionWalletModel[];

    constructor(private stockTradeBoardService: StockTradeBoardService) { }

    ngOnInit(): void {

        this.transactionsSubscription =

            this.stockTradeBoardService.getTransactionsArray

                .subscribe((data) => {

                    this.makeCalculationsForDisplay(data);

                });

        this.stockTradeBoardService.fetchTransactions();

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
    get getProfitLossesData(): any {

        return this.profitLossesData;

    }

    /**
   * 
   */
    get getLinearChartData(): any {

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

    /**
      * 
      */
    get getChartColorPallet(): Object {

        return this.chartColorPallet;

    }

    /**
      * 
      */
    get getLoseProfitDataMarker(): string {

        return this.loseProfitDataMarker;

    }

    //==========================================================================

    /**
     * 
     * @param data 
     */
    makeCalculationsForDisplay(data: StockSellModel[]): void {

        this.transactionsData = this.fixDateInArrayOfObjects(data);

        // informing the subscriber that the data has changed
        this.transactionsDataSubject.next(this.transactionsData);

        this.profitLossesData = this.calculateProfitLosses(this.transactionsData);

        this.linearChartData = this.calculateLinearChart(this.transactionsData);

        this.transactionWallet = this.generateTransactionsWallet(this.transactionsData);

    }

    /**
     * Calculating total profits value, total loses value and total trade balance
     * @param tradeData 
     * @returns 
     */
    calculateLinearChart(tradeData: StockSellModel[]) {

        let dataArray = [
            {
                name: 'Profit/Lose',
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
    generateTransactionsWallet(tradeData: StockSellModel[]) {

        let dataArray: TransactionWalletModel[] = [];

        tradeData.forEach((trade) => {

            if (trade.profitBeforeTax > 0 && this.loseProfitDataMarker === this.chosenTypeOfDataForDisplay.profit) {

                dataArray.push({

                    name: trade.companyName,
                    value: trade.profitBeforeTax

                });

            } else if (trade.profitBeforeTax < 0 && this.loseProfitDataMarker === this.chosenTypeOfDataForDisplay.lose) {

                dataArray.push({

                    name: trade.companyName,
                    value: trade.profitBeforeTax * -1

                });
            }

        });

        return dataArray;

    }

    /**
     * 
     * @param data 
     * @returns 
     */
    fixDateInArrayOfObjects(data: StockSellModel[]): StockSellModel[] {

        const newData = data;

        newData.forEach((trade) => {

            trade.sellDate = this.generateDateAndTimeForDisplay(trade.sellDate);

        });

        return newData;

    }

    /**
     * 
     * @param data 
     */
    generateDateAndTimeForDisplay(data: Date | string): string {

        if (typeof data === 'string') {

            data = new Date(data);

        }

        let day: string | number = data.getDate();

        // Be careful! January is 0, not 1
        let month: string | number = data.getMonth() + 1;

        const year: number = data.getFullYear();

        const time: string = data.toLocaleTimeString();

        if (month.toString().length < 2) {

            month = '0' + month;

        }

        if (day.toString().length < 2) {

            day = '0' + day;

        }

        const dateTime = `${year}-${month}-${day} ${time}`;

        return dateTime;

    }

    /**
     * 
     * @param marker 
     */
    switchProfitLoseCharts(marker: string): void {

        if( this.loseProfitDataMarker === marker) return;

        //overWriting the marker
        this.loseProfitDataMarker = marker;

        // changing the color of the charts profit or lose
        if (marker === this.chosenTypeOfDataForDisplay.profit) {

            this.chartColorPallet = {

                domain: [

                    '#00A8FF'
                ]

            };

        } else if (marker === this.chosenTypeOfDataForDisplay.lose) {

            this.chartColorPallet = {

                domain: [

                    '#f30625'
                ]

            };

        }

        // generating new list of trades profit or lose
        this.transactionWallet = this.generateTransactionsWallet(this.transactionsData);

    }

    /**
     * 
     * @param id 
     */
    deletePositionFromTable(id: string): void {

        this.stockTradeBoardService.deleteTransaction(id);

    }

}

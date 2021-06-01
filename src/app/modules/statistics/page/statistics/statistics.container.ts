import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { StockTradeBoardService } from 'src/app/core/services/stock-trade-board.service';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.container.html'

})
export class StatisticsContainerComponent implements OnInit {

    private transactionsSubscription: Subscription;
    private transactionsData: StockSellModel[];

    private transactionsDataSubject = new Subject<StockSellModel[]>();
    private transactionsDataSubject$ = this.transactionsDataSubject.asObservable();

    private transactionsDataSubject2 = new Subject<StockSellModel[]>();
    private transactionsDataSubject2$ = this.transactionsDataSubject2.asObservable();

    private profitLossesData;
    private linearChartData;

    constructor(private stockTradeBoardService: StockTradeBoardService) { }

    ngOnInit(): void {


        this.transactionsSubscription =

            this.stockTradeBoardService.getTransactionsArray.subscribe((data) => {

                this.transactionsData = data;

                // Calculating chart display data
                [this.profitLossesData, this.linearChartData] = this.calculateLinearChartObject(data);

            });

        this.stockTradeBoardService.getTransactionsFromLocalStorage();
    }

    ngOnDestroy(): void {

        if (this.transactionsSubscription) {
            this.transactionsSubscription.unsubscribe();
        }

    }

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
    get getTransactionsData(): StockSellModel[] {

        return this.transactionsData;

    }

    /**
     * Calculating total profits value, total loses value and total trade balance
     * @param tradeData 
     * @returns 
     */
    calculateLinearChartObject(tradeData) {

        let dataArray = [

            {
                name: "Profit/Lose",
                "series": []
            }

        ];

        let profitTotalValue: number = 0;
        let profitValue: number = 0;
        let lossValue: number = 0;

        //==========================

        tradeData.forEach((trade) => {                     

            if (trade.profitBeforeTax > 0) {

                profitValue = profitValue + trade.profitBeforeTax;

            } else {

                lossValue = lossValue - trade.profitBeforeTax;

            }

            profitTotalValue = profitTotalValue + trade.profitBeforeTax;           
            
            console.log(profitTotalValue);                    

            dataArray[0].series.push({

                name: trade.sellDate,
                value: profitTotalValue.toFixed(2)

            })

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

        return [profitLossesData, dataArray];

    }

}

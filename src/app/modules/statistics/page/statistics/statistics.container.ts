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
    private linearChartData;

    private transactionsDataSubject = new Subject<StockSellModel[]>();
    private transactionsDataSubject$ = this.transactionsDataSubject.asObservable();

    private transactionsDataSubject2 = new Subject<StockSellModel[]>();
    private transactionsDataSubject2$ = this.transactionsDataSubject2.asObservable();

    constructor(private stockTradeBoardService: StockTradeBoardService) { }

    ngOnInit(): void {


        this.transactionsSubscription =

            this.stockTradeBoardService.getTransactionsArray.subscribe((data) => {

                this.transactionsData = data;

                this.linearChartData = this.calculateLinearChartObject(data);

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

        let profitLossesData = [
            {
              "name": "Lose",
              "value": 135.65
            },
            {
              "name": "Profit",
              "value": 245.32
            }

          ];

        let walletValue = [
            
            {
              "name": "JSW",
              "value": 1356.58
            }
        ]

        let profitTotalValue: number = 0;
        let profitValue: number = 0;
        let lossValue: number = 0;

        tradeData.forEach((trade) => {

            if (trade.profitBeforeTax > 0) {

                profitValue = profitValue + trade.profitBeforeTax;

            } else {

                lossValue = profitValue - trade.profitBeforeTax;

            }

            profitTotalValue = profitValue + trade.profitBeforeTax;

            dataArray[0].series.push({

                name: trade.sellDate,
                value: profitTotalValue.toFixed(2)

            })

        });

        console.log(dataArray);
        console.log(lossValue);
        console.log(profitValue);

        return dataArray;

    }

}

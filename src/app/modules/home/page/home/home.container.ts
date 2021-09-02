import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CookiesService } from 'src/app/core/services/cookies.service';
import { StockTradeBoardService } from 'src/app/core/services/stock-trade-board.service';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';
import { StockTileModel } from 'src/app/data/models/stock-tile.model';
import { GlobalDialogComponent } from 'src/app/shared/components/global-dialog/global-dialog.component';
@Component({
    selector: 'app-home',
    templateUrl: './home.container.html'
})

export class HomeContainerComponent implements OnInit {

    constructor(
        private stockTradeBoardService: StockTradeBoardService,
        private matDialog: MatDialog,
        private httpClient: HttpClient,
        private cookiesService: CookiesService
    ) { }

    ngOnInit(): void {

        /**
         * checking if the cookie value is false, i fo so open dialog      */

        if (
            !this.cookiesService.getCookieValue(this.cookiesService.homeDialogCookieName)

        ) {

            this.openFormDialogDummyData();

        }

    }


    /**
     * 
     */
    openFormDialogDummyData(): void {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;

        dialogConfig.id = "modal-component";

        dialogConfig.data = {
            header: 'home.dialogDummyDataHeader',
            description: 'home.dialogDummyDataText',
            checkBoxInfo: 'home.dialogCheckboxInfo',
            buttonColor: 'primary',
            showCheckBox: true
        }

        // Initializing dialog
        const modalDialog = this.matDialog

            .open(GlobalDialogComponent, dialogConfig);

        // Receive data from dialog
        modalDialog
            .afterClosed()
            .subscribe(result => {

                // when true the the cookie is set to true and DUMMY DATA IS FETCHED FORM MOCKS
                if (result) {

                    this.cookiesService.setCookie(this.cookiesService.homeDialogCookieName, true);

                    this.getDummyTradeBoardData();

                    this.getDummyTransactionsData();

                }

                this.cookiesService.setCookie(this.cookiesService.homeDialogCookieName, false);

            });

    }

    /**
   * 
   */
    getDummyTradeBoardData(): void {

        this.httpClient

            .get<StockTileModel[]>('./assets/mocks/board-dummy-data.json')

            .subscribe((data: StockTileModel[]) => {

                this.addDummyDataToTradeBoard(data);

            });
    }

    /**
     * 
     * @param data 
     */
    addDummyDataToTradeBoard(data: StockTileModel[]): void {

        this.stockTradeBoardService.saveTradeBoardDataToLocalStorage(data);

        // lets know the subscribers
        this.stockTradeBoardService.fetchTradeBoardData();

    }

    /**
     * 
     */
    getDummyTransactionsData(): void {

        this.httpClient

            .get<StockSellModel[]>('./assets/mocks/transactions-dummy-data.json')

            .subscribe((data: StockSellModel[]) => {

                this.addDummyTransactionsDataToStatistics(data);

            });
    }

    /**
    * 
    * @param data 
    */
    addDummyTransactionsDataToStatistics(data: StockSellModel[]): void {

        this.stockTradeBoardService.saveTransactionToLocalStorage(data);

        // lets know the subscribers
        this.stockTradeBoardService.fetchTransactions();

    }
}
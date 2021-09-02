import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StockTradeBoardService } from 'src/app/core/services/stock-trade-board.service';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';
import { StockTileModel } from 'src/app/data/models/stock-tile.model';
import { GlobalDialogComponent } from 'src/app/shared/components/global-dialog/global-dialog.component';
@Component({
    selector: 'app-home',
    templateUrl: './home.container.html'
})

export class HomeContainerComponent implements OnInit {
  
    private cookieName: string = 'dummyDataDialog';
    
    constructor(
        private stockTradeBoardService: StockTradeBoardService,
        private matDialog: MatDialog,
        private httpClient: HttpClient
    ) { }

    ngOnInit(): void {

        /**
         * checking if the cookie value is false, i fo so open dialog 
         */

        if (!this.getCookieValue(this.cookieName)) {

            this.openFormDialogDummyData();

        }

    }

    /**
    * 
    */
    getCookieValue(cookieName: string): string {

        const name = cookieName + "=";

        const decodedCookie = decodeURIComponent(document.cookie);

        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {

            let cookie = cookieArray[i];

            while (cookie.charAt(0) == ' ') {

                cookie = cookie.substring(1);

            }

            if (cookie.indexOf(name) == 0) {

                return cookie.substring(name.length, cookie.length);

            }

        }

        return "";

    }

    /**
     * 
     */
    openFormDialogDummyData(): void {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;

        dialogConfig.id = "modal-component";

        dialogConfig.data = {
            header: 'trade.sellConfirmDialogHeader',
            description: 'trade.sellConfirmDialogText'
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

                    this.setCookie(this.cookieName, true);

                    this.getDummyTradeBoardData();

                    this.getDummyTransactionsData();

                }

            });

    }

    /**
     * 
     */
    setCookie(cookieName: string, value: boolean): void {

        document.cookie = `${cookieName}=${value}`;

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

    }
}
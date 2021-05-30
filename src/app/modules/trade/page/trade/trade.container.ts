import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/core/services/form.service';
import { TradeFormData } from 'src/app/data/models/form.model';
import { StockTradeBoardService } from '../../../../core/services/stock-trade-board.service';
import { StockMarkerSaveDataModel, StockTileModel } from '../../../../data/models/stock-tile.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeDialogComponent } from '../../components/trade/trade-dialog/trade-dialog.component';
import { FormState } from '../../../../data/enums/form-state.enum';
import { GlobalDialogComponent } from '../../../../shared/components/global-dialog/global-dialog.component';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.container.html',

})
export class TradeContainerComponent implements OnInit {

  // form state edit or add
  private formState = FormState;

  // Last entered form data 
  private previousFormDataSubscription: Subscription;
  private previousFormData: TradeFormData;

  //The array of all stock tiles to render on the trade board
  private stockBoardDataSubscription: Subscription;
  private stockBoardArray: StockTileModel[] | [] = [];

  constructor(
    private formService: FormService,
    private stockTradeBoardService: StockTradeBoardService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.previousFormDataSubscription = this.formService.getEntreFormSubject()
      .subscribe((data) => {
        this.previousFormData = data;
      });

    this.getLastFormEntre();

    this.stockBoardDataSubscription = this.stockTradeBoardService.getStockBoardArray
      .subscribe((data) => {
        this.stockBoardArray = data;
      });

    this.fetchStockBoardArray();
  }

  ngOnDestroy(): void {
    if (this.previousFormDataSubscription) {
      this.previousFormDataSubscription.unsubscribe();
    }

    if (this.stockBoardDataSubscription) {
      this.stockBoardDataSubscription.unsubscribe();
    }
  }

  get getStockBoardArray(): StockTileModel[] {
    return this.stockBoardArray;
  }

  /**
   * Saving the entered data to, local storage trade array
   * @param formData 
   */
  saveStockToBoardArray(formData: TradeFormData): void {
    this.stockTradeBoardService.creatingNewPosition(formData);
    this.saveEntreFormDataToLocalStorage(formData);
  }

  /**
   * Saving the entered data , for future reuse if we want to 
   * open the form and it will by filled with the last session
   * @param formData  
   */
  saveEntreFormDataToLocalStorage(formData: TradeFormData): void {
    this.formService.saveEntreFormDataToLocalStorage(formData);
  }

  /**
   * 
   */
  fetchStockBoardArray(): void {
    this.stockTradeBoardService.getTradeBoardDataFromLocalStorage();
  }

  /**
   * 
   * @param value 
   */
  savePickedOffer(value: StockMarkerSaveDataModel):void {
    this.stockTradeBoardService.savePickedOfferToStockData(value);
  }

  /**
   * 
   */
  sellStock(stockSellData: StockSellModel):void {   
    this.stockTradeBoardService.sellStock(stockSellData);

  }


  // ===========================================================================
  // ==================== Angular material form dialog triggering ==============
  // ===========================================================================
  /**
   * Dialog trigger for adding new stocks
   */
  openFormDialogAdd(): void {

    this.getLastFormEntre();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.data = {
      formData: this.previousFormData,
      state: this.formState.Add
    };

    // Initializing dialog
    const modalDialog = this.matDialog
      .open(TradeDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.saveStockToBoardArray(result);
      }
    });
  }

  /**
 * Getting the last form entre
 */
  getLastFormEntre(): void {
    this.formService.getEntreFormDataFromLocalStorage();
  }

  // ==========================================================================

  /**
   * Dialog trigger for editing stocks
   */
  openFormDialogEdit(stockId: string): Promise<void> {

    const stockData: StockTileModel = this.fetchStockDataToEdit(stockId);

    if (stockData === null) return;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.data = {
      formData: stockData,
      state: this.formState.Edit
    };

    // Initializing dialog
    const modalDialog = this.matDialog
      .open(TradeDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed()
      .subscribe(result => {
        if (result) {
          this.updateStockBoardArray(result, stockId);
        }
      });
  }

  /**
   * 
   * @param stockToEdit 
   */
  fetchStockDataToEdit(stockId: string): StockTileModel {
    return this.stockTradeBoardService.findStockInArray(stockId);
  }

  /**
   * 
   * @param result 
   * @param stockId 
   */
  updateStockBoardArray(result: TradeFormData, stockId: string): void {
    this.stockTradeBoardService.editTradeBoardArrayData(result, stockId);
  }

  // ===========================================================================

  /**
   * Deleting a stock by id 
   * Opening global dialog to confirm the deletion
   * if true then call the delete method
   * @param tileId 
   */
  openFormDialogDelete(tileId: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";

    // How to translate this :/??   
    // dialogConfig.data = {
    //   header: "Delete Stock",     
    //   description: "Are you sure, you want to delete the stock?"  
    // }

    // Initializing dialog
    const modalDialog = this.matDialog
      .open(GlobalDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStockTileData(tileId);
      }
    });
  }

  /**
   * 
   * @param tileId 
   */
  deleteStockTileData(tileId: string): void {
    this.stockTradeBoardService.deletePositionFromBoard(tileId);
  }

}

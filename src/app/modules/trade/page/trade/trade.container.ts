import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/core/services/form.service';
import { TradeFormData } from 'src/app/data/models/form.model';
import { StockTradeBoardService } from '../../../../core/services/stock-trade-board.service';
import { StockTileModel } from '../../../../data/models/stock-tile.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeDialogComponent } from '../../components/trade/trade-dialog/trade-dialog.component';
import { FormState } from '../../../../data/enums/form-state.enum';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.container.html',

})
export class TradeContainerComponent implements OnInit {

  private formState: FormState;
  private formDataToEdit: TradeFormData;
  private previousFormData: TradeFormData;
  private formDataSubscription: Subscription;
  private stockBoardArray: StockTileModel[] | [] = [];

  constructor(
    private formService: FormService,
    private stockTradeBoardService: StockTradeBoardService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.formDataSubscription = this.formService.getEntreFormSubject().subscribe((data) => {
      this.previousFormData = data;
    });

    this.getLastFormEntre();
  }

  ngOnDestroy(): void {
    if (this.formDataSubscription) {
      this.formDataSubscription.unsubscribe();
    }
  }

  get getStockBoardArray(): StockTileModel[] {
    return this.stockBoardArray;
  }

  /**
   * Getting the last form entre
   */
  getLastFormEntre(): void  {
    this.formService.getEntreFormDataFromLocalStorage();
  }

  /**
   * Saving the entered data to, local storage trade array
   * @param formData 
   */
  saveStockToBoardArray(formData: TradeFormData): void  {
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

  // =============================================================================
  // ==================== Angular material form dialog triggering ================
  // =============================================================================

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
      state: 'ADD'
    };

    // Initializing dialog
    const modalDialog = this.matDialog.open(TradeDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.saveStockToBoardArray(result);
      }
    });
  }

  /**
   * Dialog trigger for editing stocks
   */
  openFormDialogEdit(tileId: string): void {

    // Get Stock data to update

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.data = {
      formData: this.formDataToEdit,
      state: 'EDIT'
    };

    // Initializing dialog
    const modalDialog = this.matDialog.open(TradeDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.editStockTileData(result, tileId);
      }
    });
  }

  editStockTileData(result, tileId) {

  }

  openFormDialogDelete(tileId: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.data = {
      formData: this.formDataToEdit,
      state: 'DELETE'
    };

    // Initializing dialog
    const modalDialog = this.matDialog.open(TradeDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStockTileData(tileId);
      }
    });

  }

  deleteStockTileData(tileId: string):void{

  }

}

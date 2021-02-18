import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/core/services/form.service';
import { TradeFormData } from 'src/app/data/models/form.model';
import { StockTradeBoardService } from '../../../../core/services/stock-trade-board.service';
import { StockTileModel } from '../../../../data/models/stock-tile.model';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.container.html',

})
export class TradeContainerComponent implements OnInit {

  private formDataToEdit: TradeFormData;
  private stockBoardArray: StockTileModel[] | [] = [];

  constructor(
    private formService: FormService,
    private stockTradeBoardService: StockTradeBoardService
  ) { }

  ngOnInit(): void {
    this.stockBoardArray = this.stockTradeBoardService.getTradeBoardDataFromLocalStorage();
    console.log('from local storage',this.stockBoardArray);    
  }

  get getDataToEdit(): TradeFormData {
    return this.formDataToEdit;
  }

  get getStockBoardArray(): StockTileModel[] {
    return this.stockBoardArray;
  }

  /**
   * Saving the entered data to, local storage trade array
   * @param formData 
   */

  saveStockToBoardArray(formData: TradeFormData) {
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

  editStockTileData() {

  }

  deleteStockTileData() {

  }

}

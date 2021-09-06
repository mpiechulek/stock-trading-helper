import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';
import { StockMarkerSaveDataModel, StockTileModel } from '../../../../data/models/stock-tile.model';

@Component({
  selector: 'app-trade-ui',
  templateUrl: './trade.component.html'
})
export class TradeComponent implements OnInit {

  @Input()
  stockBoardArray: StockTileModel[];

  @Output()
  addNewStock: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  savePickedOffer: EventEmitter<Object> = new EventEmitter<Object>();

  @Output()
  sellStock: EventEmitter<StockSellModel> = new EventEmitter<StockSellModel>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   */
  onAddNewStock(): void {
    this.addNewStock.emit();
  }

  /**
   * 
   * @param id 
   */
  onEditTile(id: string): void {
    this.editTile.emit(id);
  }

  /**
   * 
   * @param id 
   */
  onDeleteTile(id: string): void {
    this.deleteTile.emit(id);
  }

  /**
   * 
   * @param value 
   */
  onSavePickedOffer(value: StockMarkerSaveDataModel): void {
    this.savePickedOffer.emit(value);
  }

  /**
   * 
   * @param stockSellData 
   */
  onSellStock(stockSellData: StockSellModel): void {
    this.sellStock.emit(stockSellData);
  }

//   /**
//    * 
//    * @param index 
//    * @param item 
//    * @returns 
//    */
//   identify(index: number, item: StockTileModel): string {       
//     return item.id;
//   }
}

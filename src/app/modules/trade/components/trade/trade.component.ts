import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  onAddNewStock(): void {
    this.addNewStock.emit();
  }

  onEditTile(id: string): void {
    this.editTile.emit(id);
  }

  onDeleteTile(id: string): void {
    this.deleteTile.emit(id);
  }

  onSavePickedOffer(value: StockMarkerSaveDataModel): void {
    this.savePickedOffer.emit(value);
  }
}

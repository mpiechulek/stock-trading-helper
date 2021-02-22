import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderCalculationsModel, StockTileModel } from '../../../../../../data/models/stock-tile.model';

@Component({
  selector: 'app-tile-header',
  templateUrl: './tile-header.component.html'
})
export class TileHeaderComponent implements OnInit {

  @Input()
  stockElement: StockTileModel;
  
  @Input()
  headerCalculations: HeaderCalculationsModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onEditTile(): void {
    this.editTile.emit(this.stockElement.id);
  }

  onDeleteTile(): void {
    this.deleteTile.emit(this.stockElement.id);
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html'

})
export class StockTileComponent implements OnInit {

  array = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onEditTile(id:string): void {
    this.editTile.emit(id);
  }

  onDeleteTile(id:string): void {
    this.deleteTile.emit(id);
  }

}

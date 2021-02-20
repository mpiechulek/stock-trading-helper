import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { StockTileModel } from '../../../../../data/models/stock-tile.model';
import { StockTilePresenterService } from './stock-tile.presenter';

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html',
  providers:[StockTilePresenterService]

})
export class StockTileComponent implements OnInit {

  array = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

  @Input()
  stockElement: StockTileModel;

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor(private stockTilePresenterService:StockTilePresenterService) { }

  ngOnInit(): void {


  }

  onEditTile(id:string): void {
    this.editTile.emit(id);
  }

  onDeleteTile(id:string): void {
    this.deleteTile.emit(id);
  }

}

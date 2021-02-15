import { Component, OnInit } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html'

})
export class StockTileComponent implements OnInit {

  array = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

  constructor() { }

  ngOnInit(): void {
  }

}

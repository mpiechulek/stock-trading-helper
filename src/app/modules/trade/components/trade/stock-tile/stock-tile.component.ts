import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-tile',
  templateUrl: './stock-tile.component.html'

})
export class StockTileComponent implements OnInit {

  array = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

  constructor() { }

  ngOnInit(): void {
  }

}

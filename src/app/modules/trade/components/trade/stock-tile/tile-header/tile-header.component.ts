import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tile-header',
  templateUrl: './tile-header.component.html'
})
export class TileHeaderComponent implements OnInit {

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

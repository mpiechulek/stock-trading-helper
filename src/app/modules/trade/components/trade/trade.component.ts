import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-trade-ui',
  templateUrl: './trade.component.html'
})
export class TradeComponent implements OnInit {

  @Output()
  addNewStock: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  deleteTile: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editTile: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddNewStock():void {
    this.addNewStock.emit();
  }

  onEditTile(id:string): void {
    this.editTile.emit(id);
  }

  onDeleteTile(id:string): void {
    this.deleteTile.emit(id);
  }

  // openFormDialogAdd(): void {

  //   // Get last entered form data
  //   this.triggerAdd.emit();

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = false;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.data = this.formDataToEdit;

  //   // Initializing dialog
  //   const modalDialog = this.matDialog.open(TradeDialogComponent, dialogConfig);

  //   // Receive data from dialog
  //   modalDialog.afterClosed().subscribe(result => {

  //     const dialogData = result;

  //     if (dialogData !== undefined) {
  //       this.dataFromForm.emit(dialogData);
  //     }

  //   });
  // }  

  // openFormDialogEdit(tileId: string): void {

  //   this.triggerEdit.emit(tileId);

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = false;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.data = this.formDataToEdit;

  //   // Initializing dialog
  //   const modalDialog = this.matDialog.open(TradeDialogComponent, dialogConfig);

  //   // Receive data from dialog
  //   modalDialog.afterClosed().subscribe(result => {

  //     const dialogData = result;

  //     if (dialogData !== undefined) {
  //       this.dataFromForm.emit(dialogData);
  //     }

  //   });
  // }  
}

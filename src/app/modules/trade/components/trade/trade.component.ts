import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeFormData } from 'src/app/data/models/form.model';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-trade-ui',
  templateUrl: './trade.component.html'
})
export class TradeComponent implements OnInit {

  dialogData;
  lastTypedData;

  private dataFromForm: EventEmitter<TradeFormData> = new EventEmitter<TradeFormData>();

  @Output()
  get getDataFromForm() {
    return this.dataFromForm;
  }



  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openFormDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.data = this.lastTypedData;

    // Initializing dialog
    const modalDialog = this.matDialog.open(TradeDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {
      this.dialogData = result;
      if (this.dialogData !== undefined) {
        this.dataFromForm.emit(this.dialogData);
      }
    });
  }
}

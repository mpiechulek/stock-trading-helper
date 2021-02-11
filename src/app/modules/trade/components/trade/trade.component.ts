import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-trade-ui',
  templateUrl: './trade.component.html'
})
export class TradeComponent implements OnInit {

  dialogData;
  lastTypedData;

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
      console.log(this.dialogData);
    });
  }
}

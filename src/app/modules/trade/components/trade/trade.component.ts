import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-trade-ui',
  templateUrl: './trade.component.html'
})
export class TradeComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal() {

    const dialogConfig = new MatDialogConfig();
   
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";  
    dialogConfig.data = {};   
    
    const modalDialog = this.matDialog.open(TradeDialogComponent, dialogConfig);
  }

}

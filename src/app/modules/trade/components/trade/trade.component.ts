import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeFormData } from 'src/app/data/models/form.model';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-trade-ui',
  templateUrl: './trade.component.html'
})
export class TradeComponent implements OnInit {

  private lastTypedData: TradeFormData;

  @Input()
  private formDataToEdit: TradeFormData

  @Output()
  dataFromForm: EventEmitter<TradeFormData> = new EventEmitter<TradeFormData>();


  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openFormDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.data = this.formDataToEdit;

    // Initializing dialog
    const modalDialog = this.matDialog.open(TradeDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {

      const dialogData = result;

      if (dialogData !== undefined) {
        this.dataFromForm.emit(dialogData);
      }

    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TradeDialogComponent } from '../../../modules/trade/components/trade/trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html'
})
export class GlobalDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}

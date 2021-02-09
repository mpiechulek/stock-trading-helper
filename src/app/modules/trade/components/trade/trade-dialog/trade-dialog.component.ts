import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html' 
})

export class TradeDialogComponent implements OnInit {

  myForm:  FormGroup;
  
  constructor(public dialogRef: MatDialogRef<TradeDialogComponent>) { }

  ngOnInit(): void {
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onClearDialog() {

  }

  onSubmitDialog() {
    this.onCloseDialog();
  }


}

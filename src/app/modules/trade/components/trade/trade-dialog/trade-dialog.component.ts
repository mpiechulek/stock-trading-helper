import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html' 
})

export class TradeDialogComponent implements OnInit {

  myForm:  FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({

    })
  }  

  onSubmitDialog() {
    this.onCloseDialog();
  }
  
  onClearDialog() {
    
  }
    
  onCloseDialog() {
    this.dialogRef.close('dsfdsfdsfsd');
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html'
})

export class TradeDialogComponent implements OnInit {

  entryStockForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.entryStockForm = this.formBuilder.group({
      companyName: ['', [
        Validators.required
      ]],
      amountOfShares: ['', [
        Validators.required
      ]],
      buyPrice: ['', [
        Validators.required
      ]],
      taxRate: ['', []],
      commission: ['', []],
      minCommission: ['', []]
    });
  }

  get companyName() {
    return this.entryStockForm.get('companyName');
  }

  get amountOfShares() {
    return this.entryStockForm.get('amountOfShares');
  }

  get buyPrice() {
    return this.entryStockForm.get('buyPrice');
  }
  get taxRate() {
    return this.entryStockForm.get('taxRate');
  }

  get commission() {
    return this.entryStockForm.get('commission');
  }

  get minCommission() {
    return this.entryStockForm.get('minCommission');
  }

  onSubmitDialog() {
    this.onCloseDialog();
  }

  onClearDialog() {

  }

  onCloseDialog() {
    this.dialogRef.close(this.entryStockForm);
  }

}

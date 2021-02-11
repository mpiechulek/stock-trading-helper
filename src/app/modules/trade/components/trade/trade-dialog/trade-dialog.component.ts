import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TradeFormData } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html'
})

export class TradeDialogComponent implements OnInit {

  formData: TradeFormData | null = {
    companyName: 'JSW',
    amountOfShares: '4',
    buyPrice: '462.6700',
    taxRate: '19.000',
    commission: '0.300',
    minCommission: '3.000'
  };

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
      amountOfShares: ['1', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
        Validators.min(1)
      ]],
      buyPrice: ['0', [
        Validators.required,
        Validators.min(0)
      ]],
      taxRate: ['0.000', [
        Validators.min(0)

      ]],
      commission: ['0.000', [
        Validators.min(0)
      ]],
      minCommission: [0.000, [
        Validators.min(0)
      ]]
    });

    if (this.formData) {
      this.entryStockForm.patchValue({
        companyName: this.formData.companyName,
        amountOfShares: this.formData.amountOfShares,
        buyPrice: this.formData.buyPrice,
        taxRate: this.formData.taxRate,
        commission: this.formData.commission,
        minCommission: this.formData.minCommission,
      });
    }
  }

  // ===========================================================================

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

  // =============================================================================

  fixeNumberDecimalPlaces(value: string) {
    let arr: string[];

    if (value.includes('.')) {
      arr = value.split('.');
      return arr[0] + '.' + arr[1].slice(0, -2);
    }
    return value;
  }

  onSubmitDialog() {
    if (this.entryStockForm.invalid) {
      return;
    } 

    this.entryStockForm.patchValue({
      companyName: this.formData.companyName,
      amountOfShares: this.formData.amountOfShares,
      buyPrice: this.fixeNumberDecimalPlaces(this.entryStockForm.value.buyPrice),
      taxRate: this.fixeNumberDecimalPlaces(this.entryStockForm.value.taxRate),
      commission: this.fixeNumberDecimalPlaces(this.entryStockForm.value.commission),
      minCommission: this.fixeNumberDecimalPlaces(this.entryStockForm.value.minCommission),
    });   

    this.dialogRef.close(this.entryStockForm.value);
  }

  onClearField(event) {
    console.log(event);
  }

  onClearForm() {
    this.entryStockForm.reset();
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

}

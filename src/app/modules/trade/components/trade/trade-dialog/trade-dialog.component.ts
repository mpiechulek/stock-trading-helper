import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormService } from './../../../../../core/services/form.service';
import { TradeFormData } from './../../../../../../../src/app/data/models/form.model';
import { FormState } from '../../../../../data/enums/form-state.enum';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html'
})

export class TradeDialogComponent implements OnInit {

   public entryStockForm: FormGroup;
   public dialogState: string;
   public formState = FormState;

  constructor(
    private formService: FormService,
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
        // Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$'),
        Validators.min(0)
      ]],
      taxRate: ['0.0000', [
        Validators.min(0)
      ]],
      commission: ['0.0000', [
        Validators.min(0)
      ]],
      minCommission: ['0.0000', [
        Validators.min(0)
      ]]
    });    

    // The state of the dialog box
    this.dialogState = this.data.state

    // Overwriting the form value with received data
    if (this.data.formData) {      
      this.entryStockForm.patchValue(this.data.formData);
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

  onSubmitDialog() {
    if (this.entryStockForm.invalid) {
      return;
    }

    console.log(this.entryStockForm.value);

    this.entryStockForm.patchValue({
      companyName: this.entryStockForm.value.companyName,
      amountOfShares: this.entryStockForm.value.amountOfShares,
      buyPrice: this.formService.fixeNumberDecimalPlaces(this.entryStockForm.value.buyPrice),
      taxRate: this.formService.fixeNumberDecimalPlaces(this.entryStockForm.value.taxRate),
      commission: this.formService.fixeNumberDecimalPlaces(this.entryStockForm.value.commission),
      minCommission: this.formService.fixeNumberDecimalPlaces(this.entryStockForm.value.minCommission)
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

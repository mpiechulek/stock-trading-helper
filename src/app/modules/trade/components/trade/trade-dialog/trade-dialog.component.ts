import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormService } from './../../../../../core/services/form.service';
import { TradeFormData } from './../../../../../../../src/app/data/models/form.model';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html'
})

export class TradeDialogComponent implements OnInit {

  formData: TradeFormData;
  entryStockForm: FormGroup;
  formDataSubscription: Subscription;

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {    

    // this.formService.getEntreFormDataFromLocalStorage();

    // this.formDataSubscription = this.formService.getEntreFormSubject.subscribe((formData) => {
    //   this.formData = formData;
        
    //   if (this.formData) {

    //     this.entryStockForm.patchValue({
    //       companyName: this.formData.companyName,
    //       amountOfShares: this.formData.amountOfShares,
    //       buyPrice: this.formData.buyPrice,
    //       taxRate: this.formData.taxRate,
    //       commission: this.formData.commission,
    //       minCommission: this.formData.minCommission
    //     });
    //   }
    // });

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

  }

  ngOnDestroy(): void {
    if( this.formDataSubscription) {
      this.formDataSubscription.unsubscribe();
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

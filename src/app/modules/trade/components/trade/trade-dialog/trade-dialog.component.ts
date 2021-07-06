import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from './../../../../../core/services/form.service';
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
        Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$'),
        Validators.min(0.0001)
      ]],
      taxRate: ['0.0000', [
        Validators.min(0),
        Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')
      ]],
      commission: ['0.0000', [
        Validators.min(0),
        Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')
      ]],
      minCommission: ['0.0000', [
        Validators.min(0),
        Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')
      ]],
      calcStepCount: ['200', [
        Validators.min(1),
        Validators.pattern('^[1-9][0-9]*$')
      ]],
      calcStepValue: ['0.5', [
        Validators.min(0.1),
        Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')
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

  get companyName(): AbstractControl {
    return this.entryStockForm.get('companyName');
  }

  get amountOfShares(): AbstractControl {
    return this.entryStockForm.get('amountOfShares');
  }

  get buyPrice(): AbstractControl {
    return this.entryStockForm.get('buyPrice');
  }

  get taxRate(): AbstractControl {
    return this.entryStockForm.get('taxRate');
  }

  get commission(): AbstractControl {
    return this.entryStockForm.get('commission');
  }

  get minCommission(): AbstractControl {
    return this.entryStockForm.get('minCommission');
  }

  get calcStepCount(): AbstractControl  {
    return this.entryStockForm.get('calcStepCount');
  }

  get calcStepValue(): AbstractControl  {
    return this.entryStockForm.get('calcStepValue');
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
      minCommission: this.formService.fixeNumberDecimalPlaces(this.entryStockForm.value.minCommission),
      calcStepCount: this.entryStockForm.value.calcStepCount,
      calcStepValue: this.formService.fixeNumberDecimalPlaces(this.entryStockForm.value.calcStepValue),

    });

    this.dialogRef.close(this.entryStockForm.value);
  }

  /**
   * updating the form position triggered by event emitted from numeric directive
   * @param event 
   * @param inputName 
   */
  onOverwriteFormPosition(event, inputName)  {

    this.entryStockForm.patchValue({
      [inputName]: event
    });
    
  }

  onClearField(event) {
    // console.log(event);
  }

  onClearForm() {
    this.entryStockForm.reset();
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdvanceCalculatorFormStringDataModel } from 'src/app/data/models/form.model';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

    public calculatorForm: FormGroup;

    //==========================================================================

    @Output()
    outputFormData: EventEmitter<AdvanceCalculatorFormStringDataModel> =
        new EventEmitter<AdvanceCalculatorFormStringDataModel>();

    //==========================================================================

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.calculatorForm = this.formBuilder.group({

            buyPrice: ['10', [
                Validators.required,
            ]],
            amountOfShares: ['100', [
                Validators.required,
                Validators.pattern('^[1-9][0-9]*$'),
                Validators.min(1)
            ]],
            sellPrice: ['12', [
                Validators.required
            ]],
            taxRate: ['19', [
                Validators.required,
                Validators.min(0)
            ]],
            commission: ['0.3', [
                Validators.required,
                Validators.min(0)

            ]],
            minCommission: ['3', [
                Validators.required,
                Validators.min(0)
            ]]
        });

    }

    //==========================================================================

    /**
     * 
     */
    get getCalculatorForm(): FormGroup {

        return this.calculatorForm;

    }

    /**
     * 
     */
    get buyPrice() {

        return this.calculatorForm.get('buyPrice');

    }

    /**
    * 
    */
    get amountOfShares() {

        return this.calculatorForm.get('amountOfShares');

    }

    /**
    * 
    */
    get sellPrice() {

        return this.calculatorForm.get('sellPrice');

    }

    /**
    * 
    */
    get taxRate() {

        return this.calculatorForm.get('taxRate');

    }

    /**
    * 
    */
    get commission() {

        return this.calculatorForm.get('commission');

    }

    /**
     * 
     */
    get minCommission() {

        return this.calculatorForm.get('minCommission');

    }

    // =============================================================================

    /**
     * 
     * @returns 
     */
    onCalculate(): void {

        this.calculatorForm.patchValue(

            {

                buyPrice: this.calculatorForm.value.buyPrice,
                amountOfShares: this.calculatorForm.value.amountOfShares,
                sellPrice: this.calculatorForm.value.sellPrice,
                taxRate: this.calculatorForm.value.taxRate,
                commission: this.calculatorForm.value.commission,
                minCommission: this.calculatorForm.value.minCommission

            },
            { emitEvent: false }
        );        

        this.outputFormData.emit(this.calculatorForm.value);

    }


    /**
     * 
     */
    onClearForm(): void {

        this.calculatorForm.reset();

    }

}

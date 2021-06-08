import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

    public calculatorForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.calculatorForm = this.formBuilder.group({

            buyPrice: ['1', [
                Validators.required,
            ]],
            amountOfShares: ['1', [
                Validators.required,
                Validators.pattern('^[1-9][0-9]*$'),
                Validators.min(1)
            ]],
            sellPrice: ['1', [
                Validators.required
            ]],
            taxRate: ['1', [
                Validators.required,
                Validators.min(0)
            ]],
            commission: ['0.1', [
                Validators.required,
                Validators.min(0)

            ]],
            minCommission: ['1', [
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

        // for(let element in this.calculatorForm.value) {

        //     element : parseInt(this.calculatorForm.value[element]);

        // }       

        // this.formPresenterService

        return;

    }


    /**
     * 
     */
    onClearForm(): void {

        this.calculatorForm.reset();

    }

}

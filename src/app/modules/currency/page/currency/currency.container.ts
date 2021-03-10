import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyFormService } from '../../../../core/services/currency-form.service';
import { CurrencyFacadeService } from '../../../../core/services/facades/currency.facade';
import { CurrencyApiDataModel } from '../../../../data/models/currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.container.html',

})
export class CurrencyContainerComponent implements OnInit {

  currencyData$: Observable<CurrencyApiDataModel>;

  constructor(
    private currencyFacadeService: CurrencyFacadeService,
    private currencyFormService: CurrencyFormService
  ) { }

  ngOnInit(): void {
    this.fetchCurrencyData(this.currencyFormService.currencyOne);
  }

  get currencyData(): any {
    return this.currencyData$;
  }

  /**
   * 
   * @param currencyName 
   */
  fetchCurrencyData(currencyName: string): void {
    this.currencyData$ = this.currencyFacadeService.getCurrencyData(currencyName);
  }

  /**
   * 
   */
   onCalculateResult() {

    // if (this.currencyFormData.value.currencyOneQuantity === '') return;

    // if (this.currencyFormData.value.currencyTwoResult === '') return;

    // const result =
    //   this.currencyFormData.value.currencyOneQuantity *
    //   this.currencyData.rates[this.currencyFormData.value.currencyTwoName]

    // this.currencyFormData.patchValue({ currencyTwoResult: result });
  }

  /**
   * 
   */
  onSwapCurrencies() {

    // const currencyOne = this.currencyFormData.value.currencyOneName;
    // const currencyTwo = this.currencyFormData.value.currencyTwoName;

    // this.currencyFormData.patchValue({
    //   currencyOneName: currencyTwo,
    //   currencyTwoName: currencyOne
    // });

    // this.onSelectCurrencyOne(this.currencyFormData.value.currencyOneName);

    // // this.onCalculateResult();
  }


}

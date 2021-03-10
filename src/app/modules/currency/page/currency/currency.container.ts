import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrencyFormService } from '../../../../core/services/currency-form.service';
import { CurrencyFacadeService } from '../../../../core/services/facades/currency.facade';
import { CurrencyApiDataModel } from '../../../../data/models/currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.container.html',

})
export class CurrencyContainerComponent implements OnInit {

  private currencyDataContainer: CurrencyApiDataModel;
  private currencyQuantity: number = 1;
  private firstCurrencyName: string;
  private secondCurrencyName: string;

  private currencyResultSubject = new Subject<number>();
  private currencyResult$ = this.currencyResultSubject.asObservable();

  constructor(
    private currencyFacadeService: CurrencyFacadeService,
    private currencyFormService: CurrencyFormService
  ) { }

  ngOnInit(): void {
    this.firstCurrencyName  = this.currencyFormService.currencyOne
    this.secondCurrencyName = this.currencyFormService.currencyTwo;
    this.fetchCurrencyData(this.firstCurrencyName);
  }

  get currencyData(): any {
    return this.currencyDataContainer;
  }

  get getCurrencyResult(): any {
    return this.currencyResult$;
  }

  /**
   * 
   * @param currencyName 
   */
  fetchCurrencyData(currencyName: string): void {
    this.currencyFacadeService.getCurrencyData(currencyName).subscribe((res) => {
      if (!!res) {
        this.currencyDataContainer = res;
        this.calculateResult();
      }
    });
  }

  /**
   * 
   * @param quantity 
   */
  enterCurrencyQuantity(quantity: number): void {
    this.currencyQuantity = quantity;
    this.calculateResult();
  }

  /**
   * 
   */
  swapCurrencies() {
    const firstCurr: string = this.firstCurrencyName;
    const secondCurr: string = this.firstCurrencyName;

    this.firstCurrencyName = secondCurr;
    this.secondCurrencyName = firstCurr;

    this.fetchCurrencyData(this.firstCurrencyName);  
  }

  /**
   * 
   */
  calculateResult(): void {

    let name: string;

    if (this.firstCurrencyName === null) {
      name = this.currencyFormService.currencyOne;
    }

    const result =
      this.currencyQuantity *
      this.currencyData.rates[this.secondCurrencyName]

    this.currencyResultSubject.next(result);
  }

}

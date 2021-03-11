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

  private currencyResultSubject = new Subject<number>();
  private currencyResult$ = this.currencyResultSubject.asObservable();

  private firstCurrencyName: string;
  private firstCurrencyNameSubject = new Subject<string>();
  private firstCurrencyName$ = this.firstCurrencyNameSubject.asObservable();

  private secondCurrencyName: string;
  private secondCurrencyNameSubject = new Subject<string>();
  private secondCurrencyName$ = this.secondCurrencyNameSubject.asObservable();

  private bitCoinPriceData$: Observable<string>;
  private ethereumPriceData$: Observable<string>;

  constructor(
    private currencyFacadeService: CurrencyFacadeService,
    private currencyFormService: CurrencyFormService
  ) { }

  ngOnInit(): void {
    this.firstCurrencyName = this.currencyFormService.currencyOne
    this.secondCurrencyName = this.currencyFormService.currencyTwo;
    
    this.fetchCurrencyData(this.firstCurrencyName);
    this.getCryptoCurrencyData();
  }

  get currencyData(): CurrencyApiDataModel {
    return this.currencyDataContainer;
  }

  get getCurrencyResult(): Observable<number> {
    return this.currencyResult$;
  }

  get getSecondCurrencyName(): Observable<string> {
    return this.firstCurrencyName$;
  }

  get getFirstCurrencyName(): Observable<string> {
    return this.secondCurrencyName$;
  }

  get bitCoinPriceData(): Observable<string> {
    return this.bitCoinPriceData$;
  }

  get ethereumPriceData(): Observable<string> {
    return this.ethereumPriceData$;
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
   * fettjing the crypto currency data every 30seconds
   */
  getCryptoCurrencyData() {

    this.bitCoinPriceData$ = this.fetchBitCoinData();
    this.ethereumPriceData$ = this.fetchEthereumData();

    setInterval(()=> {
      this.bitCoinPriceData$ = this.fetchBitCoinData();
      this.ethereumPriceData$ = this.fetchEthereumData();
    },30000);

  }

  /**
   * 
   */
  fetchBitCoinData(): Observable<string> {
    return this.currencyFacadeService.getBitCoinData();
  }

  /**
   * 
   */
  fetchEthereumData(): Observable<string> {
    return this.currencyFacadeService.getEthereumData();
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
    const secondCurr: string = this.secondCurrencyName;

    this.firstCurrencyName = secondCurr;
    this.secondCurrencyName = firstCurr;

    this.firstCurrencyNameSubject.next(this.firstCurrencyName);
    this.secondCurrencyNameSubject.next(this.secondCurrencyName);

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

  /**
   * 
   * @param currencyName 
   */
  choseSecondCurrency(currencyName: string): void {
    console.log(currencyName);

    this.secondCurrencyName = currencyName;
    this.secondCurrencyNameSubject.next(this.secondCurrencyName);
    this.calculateResult();
  }

}

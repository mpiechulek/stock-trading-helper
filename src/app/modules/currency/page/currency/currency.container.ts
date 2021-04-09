import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrencyFromService } from '../../../../core/services/currency-form.service';
import { CurrencyFacadeService } from '../../../../core/services/facades/currency.facade';
import { CurrencyApiDataModel } from '../../../../data/models/currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.container.html'
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
    private currencyFromService: CurrencyFromService
  ) { }

  ngOnInit(): void {

    if (this.currencyFromService.checkIfCurrencyInLocalStorage()) {
      this.currencyFromService.getCurrencyNameFromLocalStorage();
    }

    this.firstCurrencyName = this.currencyFromService.currencyOne
    this.secondCurrencyName = this.currencyFromService.currencyTwo;

    this.fetchCurrencyData(this.firstCurrencyName);
    this.getCryptoCurrencyData();
  }

  /**
   * !zapisaywanie wybranych walut jako default 
   * !zaokraglanie inputu 
   */

  get currencyData(): CurrencyApiDataModel {
    return this.currencyDataContainer;
  }

  get getCurrencyResult(): Observable<number> {
    return this.currencyResult$;
  }

  get getSecondCurrencyName(): Observable<string> {
    return this.secondCurrencyName$;
  }

  get getFirstCurrencyName(): Observable<string> {
    return this.firstCurrencyName$;
  }

  get bitCoinPriceData(): Observable<string> {
    return this.bitCoinPriceData$;
  }

  get ethereumPriceData(): Observable<string> {
    return this.ethereumPriceData$;
  }

  // ===========================================================================

  /**
   * Fetching the crypto currency data every 30seconds
   */
  getCryptoCurrencyData() {

    this.bitCoinPriceData$ = this.fetchBitCoinData();
    this.ethereumPriceData$ = this.fetchEthereumData();

    setInterval(() => {
      this.bitCoinPriceData$ = this.fetchBitCoinData();
      this.ethereumPriceData$ = this.fetchEthereumData();
    }, 30000);

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

  // ===========================================================================

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
  * @param currencyName 
  */
  choseFirstCurrency(currencyName: string): void {      

    this.currencyFromService.saveDefaultCurrencyNameToLocalStorage(currencyName, this.secondCurrencyName)

    this.currencyFromService.getCurrencyNameFromLocalStorage();

    this.firstCurrencyName = this.currencyFromService.currencyOne

    this.firstCurrencyNameSubject.next(this.firstCurrencyName);

    this.fetchCurrencyData(currencyName);
  }

  /**
 * 
 * @param currencyName 
 */
  choseSecondCurrency(currencyName: string): void {   

    this.currencyFromService.saveDefaultCurrencyNameToLocalStorage(this.firstCurrencyName, currencyName)

    this.currencyFromService.getCurrencyNameFromLocalStorage();

    this.secondCurrencyName = this.currencyFromService.currencyTwo;

    this.secondCurrencyNameSubject.next(this.secondCurrencyName);

    this.calculateResult();
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

    const firstCurr: string = this.secondCurrencyName;
    const secondCurr: string = this.firstCurrencyName;

    this.currencyFromService.saveDefaultCurrencyNameToLocalStorage(firstCurr, secondCurr);
    this.currencyFromService.getCurrencyNameFromLocalStorage();

    this.firstCurrencyName = this.currencyFromService.currencyOne
    this.secondCurrencyName = this.currencyFromService.currencyTwo;

    console.log(this.firstCurrencyName, this.secondCurrencyName);

    this.firstCurrencyNameSubject.next(this.firstCurrencyName);
    this.secondCurrencyNameSubject.next(this.secondCurrencyName);

    this.fetchCurrencyData(this.firstCurrencyName);
  }

  /**
   * 
   */
  calculateResult(): void {

    const result =
      this.currencyQuantity *
      this.currencyData.rates[this.secondCurrencyName]

    this.currencyResultSubject.next(result);
  }

}

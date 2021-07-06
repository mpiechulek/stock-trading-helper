import { Injectable } from '@angular/core';
import { CurrencyService } from '../../../data/api/currency.service';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { CurrencyApiDataModel } from '../../../data/models/currency.model';
import { Observable, throwError } from 'rxjs';
import { SnackBarService } from '../snack-bar.service';
import { LanguageService } from '../language.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFacadeService {

  constructor(
    private currencyService: CurrencyService,
    private snackBarService: SnackBarService,
    private languageService: LanguageService
  ) { }

  /**
   * 
   * @param currencyName 
   * @returns 
   */
  getCurrencyData(currencyName: string): Observable<CurrencyApiDataModel> {

    return this.currencyService.getCurrencyData(currencyName)

      .pipe(

        catchError((err) => {

          this.snackBarService.onDisplayError(this.languageService.getLanguageData.snackBar.snackBarFailFetchCurrency);

          return throwError(err);

        }),

        shareReplay()

      );
  }

  /**
   * 
   * @returns 
   */
  getBitCoinData(): Observable<string> {
    return this.currencyService.getBitCoinData()
      .pipe(

        map((res) =>

          res.ticker.price

        ),
        catchError((err) => {

          this.snackBarService.onDisplayError(this.languageService.getLanguageData.snackBar.snackBarFailFetchCryptoBtc);

          return throwError(err);

        }),

        shareReplay()
      );
  }

  /**
   * 
   * @returns 
   */
  getEthereumData(): Observable<string> {

    return this.currencyService.getEthereumData()

      .pipe(

        map((res) =>

          res.ticker.price

        ),

        catchError((err) => {

          this.snackBarService.onDisplayError(this.languageService.getLanguageData.snackBar.snackBarFailFetchCryptoEthereum);

          return throwError(err);

        }),

        shareReplay()

      );
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../../core/services/theme.service';

@Component({
  selector: 'app-currency-crypto',
  templateUrl: './currency-crypto.component.html'
})
export class CurrencyCryptoComponent implements OnInit {

  public themeState: boolean;
  private themeStateSubscription: Subscription;

  constructor(private themeService: ThemeService) { }

  @Input()
  readonly bitCoinPriceData: string;
  
  @Input()
  readonly ethereumPriceData: string;

  ngOnInit(): void {   

    this.themeStateSubscription = this.themeService.themeState.subscribe((res) => {
      this.themeState = res;
    })

    this.themeService.getThemeStateFormLocalStorage();
  }

  ngOnDestroy(): void {
    if (this.themeStateSubscription) {
      this.themeStateSubscription.unsubscribe();
    }
  }
}

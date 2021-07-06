import { viewClassName } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TransactionWalletModel } from 'src/app/data/models/statistics-section.model';
import { AdvancedPipeChartPresenter } from './advanced-pipe-chart.presenter';
@Component({
  selector: 'app-advanced-pipe-chart',
  templateUrl: './advanced-pipe-chart.component.html'
})
export class AdvancedPipeChartComponent implements OnInit, OnDestroy {

  public view: number[] = [];
  private windowWidth: number;

  private profitLossesDataSubscription: Subscription;

  @Input()
  readonly colorScheme: Object;

  @Input()

  public transactionWallet: TransactionWalletModel[];

  @Input()
  private profitLossesData$: Observable<TransactionWalletModel[]>;

  constructor(private advancedPipeChartPresenter: AdvancedPipeChartPresenter) {

  }

  ngOnInit(): void {


    this.windowWidth = window.innerWidth;

    this.getViewData(this.windowWidth, this.transactionWallet);

    this.profitLossesDataSubscription = this.profitLossesData$.subscribe((data) => {
     
      this.transactionWallet = data;

      this.getViewData(this.windowWidth, this.transactionWallet);

    });

  }

  ngOnDestroy(): void {

    if (!!this.profitLossesDataSubscription) {

      this.profitLossesDataSubscription.unsubscribe();

    }

  }

  /**
   * 
   * @param event 
   */
  onResize(event): void {

    this.getViewData(event.target.innerWidth, this.transactionWallet);

  }

  /**
   * 
   * @param width 
   * @param transactionWallet 
   */
  getViewData(width: number, transactionWallet: TransactionWalletModel[]): void {
console.log(width);

    this.view = this.advancedPipeChartPresenter.onChangeChartSize(width, transactionWallet);

  }

}

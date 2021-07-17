import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { StockTradeBoardService } from 'src/app/core/services/stock-trade-board.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalDialogComponent } from '../global-dialog/global-dialog.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
@Component({
  selector: 'app-side-nav-ui',
  templateUrl: './side-nav.component.html'
})

export class SideNavComponent implements OnInit, OnDestroy {

  sliderChecked: boolean;
  selectedLanguage: string;
  sideNavVisible: boolean;
  sideNavVisibleSubscription: Subscription;
  languages: string[];

  public disableBoardButton: boolean = false;
  public disableTransactionsButton: boolean = false;
  public panelOpenState: boolean = false;

  private stockTradeBoardSubscription: Subscription;
  private stockTransactionsSubscription: Subscription;

  //============================================================================

  constructor(
    private themeService: ThemeService,
    private sideNavService: SideNavService,
    public translate: TranslateService,
    private languageService: LanguageService,
    private stockTradeBoardService: StockTradeBoardService,
    public matDialog: MatDialog
  ) { }

  //============================================================================

  ngOnInit(): void {


    // Subscribing to trade board data
    this.stockTradeBoardSubscription =

      this.stockTradeBoardService

        .getStockBoardArray

        .subscribe((data) => {

          // checking if there is some data to by deleted
          if (data.length === 0) {

            this.disableBoardButton = true;

          }

        });

    // Getting the data to subscription 
    this.stockTradeBoardService.fetchTradeBoardData();

    this.stockTransactionsSubscription =

      this.stockTradeBoardService

        .getTransactionsArray

        .subscribe((data) => {

          // checking if there is some data to by deleted
          if (data.length === 0) {

            this.disableTransactionsButton = true;

          }

        });

    // Getting the data to subscription 
    this.stockTradeBoardService.fetchTransactions()

    // Setting the slider position
    this.sliderChecked = this.themeService.checkLocaleStorage();

    // Getting the list of languages to display in the select tag 
    this.languages = this.translate.getLangs();

    // Setting on start the chosen language form local storage or default 'en'
    this.selectedLanguage = this.languageService.getFromLocalStorage();

    // Setting the component visibility
    this.sideNavVisibleSubscription =

      this.sideNavService
        .sideNavOpen()
        .subscribe((value) => {

          this.sideNavVisible = value;

        });

  }

  ngOnDestroy(): void {

    if (!!this.sideNavVisibleSubscription) {

      this.sideNavVisibleSubscription.unsubscribe();

    }

    if (!!this.stockTradeBoardSubscription) {

      this.stockTradeBoardSubscription.unsubscribe();

    }

    if (!!this.stockTransactionsSubscription) {

      this.stockTransactionsSubscription.unsubscribe();

    }
  }

  //============================================================================
  /**
   * 
   * @param lang 
   */
  switchLang(lang: string): void {

    this.languageService.switchLang(lang);

    this.languageService.addToLocalStorage(lang);

  }

  /**
   * Change theme by slider change
   * @param event 
   */
  changeTheme(event): void {

    this.themeService.changeThemes(event.checked);

    this.sliderChecked = this.themeService.checkLocaleStorage();

  }

  /**
   * Change theme on icon button click
   */
  onToggleTheme(): void {

    this.themeService.toggleTheme();

    this.sliderChecked = this.themeService.checkLocaleStorage();
  }

  /**
   * 
   */
  onToggleSideNav(): void {

    this.sideNavService.toggleSideNav();

  }

  /**
   * 
   */
  onClearTransactions() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";

    dialogConfig.data = {
      header: 'home.sideNavDeleteTransactionsButton',
      description: 'home.sideNavDeleteTransactionsDialogText'
    }

    // Initializing dialog
    const modalDialog = this.matDialog
      .open(GlobalDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {

      if (result) {

        this.stockTradeBoardService.clearLocalStorageTransactionData();

      }

    });

  }

  /**
   * 
   */
  onClearTradeBoard() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";

    dialogConfig.data = {
      header: 'home.sideNavDeleteBoardButton',
      description: 'home.sideNavDeleteBoardDialogText'
    }

    // Initializing dialog
    const modalDialog = this.matDialog
      .open(GlobalDialogComponent, dialogConfig);

    // Receive data from dialog
    modalDialog.afterClosed().subscribe(result => {

      if (result) {

        this.stockTradeBoardService.clearLocalStorageTradeBoardData();

      }

    });

  }

  /**
   * on lick opens the dialog with the info slider
   */
  onOpenInfoDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";

    // Initializing dialog
    const modalDialog = this.matDialog
      .open(InfoDialogComponent, dialogConfig);

  }

}

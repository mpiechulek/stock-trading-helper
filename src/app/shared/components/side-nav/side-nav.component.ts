import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { StockTradeBoardService } from 'src/app/core/services/stock-trade-board.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalDialogComponent } from '../global-dialog/global-dialog.component';
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
  public disableDeleteTransactions: boolean = false;
  public disableDeleteBoard: boolean = false;
  public panelOpenState: boolean = false;

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

    // checking if there is some data to by deleted
    if (this.stockTradeBoardService.getTradeBoardDataFromLocalStorage().length === 0) {

      this.disableDeleteBoard = true;

    }

    // checking if there is some data to by deleted
    if (this.stockTradeBoardService.getTransactionsFromLocalStorage().length === 0) {

      this.disableDeleteTransactions = true;

    }

    // Setting the slider position
    this.sliderChecked = this.themeService.checkLocaleStorage();

    // Getting the list of languages to display in the select tag 
    this.languages = this.translate.getLangs();

    // Setting on start the chosen language form local storage or default 'en'
    this.selectedLanguage = this.languageService.getFromLocalStorage();

    // Setting the component visibility
    this.sideNavVisibleSubscription = this.sideNavService.sideNavOpen().subscribe((value) => {
      this.sideNavVisible = value;
    });
  }

  ngOnDestroy(): void {
    if (!!this.sideNavVisibleSubscription) {
      this.sideNavVisibleSubscription.unsubscribe();
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
   * 
   * @param event 
   */
  changeTheme(event): void {

    this.themeService.changeThemes(event.checked);

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
      header: 'home.sideNavClearStorageButton',
      description: 'home.sideNavClearStorageDialogText'
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
      header: 'home.sideNavClearStorageButton',
      description: 'home.sideNavClearStorageDialogText'
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

}

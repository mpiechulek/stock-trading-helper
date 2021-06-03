import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {
    HeaderCalculationsModel,
    OfferClickEventEmitDataModel,
    StockMarkerSaveDataModel,
    StockOfferDictionaryModel,
    StockTileModel,
} from '../../../../../data/models/stock-tile.model';
import { StockTilePresenterService } from './stock-tile.presenter';
import { KeyValue } from '@angular/common';
import { TradeTileOffersState } from 'src/app/data/enums/trade-tile-offer.enum';
import { Observable, Subject, Subscription } from 'rxjs';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';


@Component({
    selector: 'app-stock-tile',
    templateUrl: './stock-tile.component.html',
    providers: [StockTilePresenterService]
})

export class StockTileComponent implements OnInit, OnDestroy {

    private profitQuotes = {} as StockOfferDictionaryModel;
    private loseQuotes = {} as StockOfferDictionaryModel;
    private neutralQuote = {} as StockOfferDictionaryModel;
    private headerCalculations = {} as HeaderCalculationsModel;

    private profitOfferIdInit: string;
    private loseOfferIdInit: string;

    public tradeTileOffers = TradeTileOffersState;

    //==========================================================================

    private profitQuotesSubscription: Subscription;
    private loseQuotesSubscription: Subscription;
    private neutralQuoteSubscription: Subscription;
    private headerCalculationsSubscription: Subscription;

    //==========================================================================

    private profitIdMarkerSubject = new Subject<string>();
    private profitIdMarkerSubject$ = this.profitIdMarkerSubject.asObservable();

    private loseIdMarkerSubject = new Subject<string>();
    private loseIdMarkerSubject$ = this.loseIdMarkerSubject.asObservable();

    // =========================================================================

    @Input()
    private offerId: string = null;

    @Input()
    private offerMarker: string = null;

    @Input()
    private stockElement: StockTileModel;

    //==========================================================================

    @Output()
    deleteTile: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    editTile: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    savePickedOffer: EventEmitter<StockMarkerSaveDataModel> = new EventEmitter<StockMarkerSaveDataModel>();

    @Output()
    sellStock: EventEmitter<StockSellModel> = new EventEmitter<StockSellModel>();

    // =========================================================================

    constructor(
        private stockTilePresenterService: StockTilePresenterService
    ) { }

    // =========================================================================

    ngOnInit(): void {

        this.profitQuotesSubscription =
            this.stockTilePresenterService.getProfitQuotes$
                .subscribe((data) => {
                    this.profitQuotes = data;
                });

        this.loseQuotesSubscription =
            this.stockTilePresenterService.getLoseQuotes$
                .subscribe((data) => {
                    this.loseQuotes = data;
                });

        this.neutralQuoteSubscription =
            this.stockTilePresenterService.getNeutralQuote$
                .subscribe((data) => {
                    this.neutralQuote = data;
                });

        this.headerCalculationsSubscription =
            this.stockTilePresenterService.getHeaderCalculations$
                .subscribe((data) => {
                    this.headerCalculations = data;
                });

        this.stockTilePresenterService.convertStringObjectElementsToNumber(this.stockElement);

        this.stockTilePresenterService.generateQuotes();

        // Positioning the chosen offer onload/refresh 
        if (this.offerMarker === 'profit') {

            this.profitOfferIdInit = this.offerId;
            this.loseOfferIdInit = null;

        }

        if (this.offerMarker === 'lose') {

            this.profitOfferIdInit = null;
            this.loseOfferIdInit = this.offerId;

        }

    }

    ngOnDestroy() {
        
        if (this.profitQuotesSubscription) {
            this.profitQuotesSubscription.unsubscribe();
        }

        if (this.loseQuotesSubscription) {
            this.loseQuotesSubscription.unsubscribe();
        }

        if (this.neutralQuoteSubscription) {
            this.neutralQuoteSubscription.unsubscribe();
        }

        if (this.headerCalculationsSubscription) {
            this.headerCalculationsSubscription.unsubscribe();
        }
    }

    // =============================================================================
    // ================================== Getters ==================================
    // =============================================================================

    /**
    * Returning an object of objects { key1:{...}, key2:{...}}
    */
    get getProfitQuotes(): StockOfferDictionaryModel {
        return this.profitQuotes;
    }

    /**
     * 
     */
    get getLoseQuotes(): StockOfferDictionaryModel {
        return this.loseQuotes;
    }

    /**
     * 
     */
    get getNeutralQuote(): StockOfferDictionaryModel {
        return this.neutralQuote;
    }

    /**
     * 
     */
    get getHeaderCalculations(): HeaderCalculationsModel {
        return this.headerCalculations;
    }

    /**
     * 
     */
    get getStockElement(): StockTileModel {
        return this.stockElement;
    }

    /**
     * 
     */
    get getOfferId(): string {
        return this.offerId;
    }

    /**
     * 
     */
    get getOfferMarker(): string {
        return this.offerMarker;
    }

    /**
    * 
    */
    get getProfitOfferId(): Observable<string> {
        return this.profitIdMarkerSubject$;
    }

    /**
   *         
   */
     get getLoseOfferId(): Observable<string> {
       return this.loseIdMarkerSubject$;
   }

    /**
    *         
    */
    get getProfitOfferIdInit(): string {
        return this.profitOfferIdInit;
    }

      /**
    *         
    */
       get getLoseOfferIdInit(): string {
        return this.loseOfferIdInit;
    }

    // =============================================================================
    // ================================== Methods ==================================
    // =============================================================================

    /**
     * This fixes the object sorting pipe bug 
     */
    unsorted() { }

    /**
     * Reverse object sorting of key value
     * @param a 
     * @param b 
     */
    orderbyValueDsc(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
        return a.value > b.value ? 1 : (a.value > b.value) ? 0 : -1
    }

    /**
     * Changing the offer selection on the lists
     * @param event 
     */
    onClickedList(eventData: OfferClickEventEmitDataModel): void {
        this.stockTilePresenterService.changeSelectedOfferElement(eventData.event, eventData.listMarker);
        this.offerId = this.stockTilePresenterService.getChosenElementId(eventData.event);
        this.offerMarker = eventData.listMarker;
    }

    /**
     * 
     * @param event 
     * @param listMarker 
     */
    onClickedNeutralList(event: MouseEvent, listMarker: string): void {
        this.stockTilePresenterService.changeSelectedOfferElement(event, listMarker);
        this.offerId = this.stockTilePresenterService.getChosenElementId(event);
        this.offerMarker = listMarker;
    }

    /**
     * 
     */
    onSavePickedOfferData(): void {

        const markerData: StockMarkerSaveDataModel = {

            id: this.stockElement.id,
            markerOfferValue: this.offerId,
            markerOfferType: this.offerMarker

        }

        this.savePickedOffer.emit(markerData)
    }

    /**
     * 
     * @param id 
     */
    onEditTile(id: string): void {
        this.editTile.emit(id);
    }

    /**
     * 
     * @param id 
     */
    onDeleteTile(id: string): void {
        this.deleteTile.emit(id);
    }

    /**
     * 
     */
    onSellStock(): void {

        const stockToSell: StockSellModel = {

            id: this.stockElement.id,
            companyName: this.stockElement.companyName,
            ...this.headerCalculations

        }

        this.sellStock.emit(stockToSell);

    }

    /**
     * when clicking find button the current offer id is sent to the proper subscriber
     */
    onFindSelectedOffer() {

        if (this.offerMarker === 'profit') {

            this.profitIdMarkerSubject.next(this.offerId);
            this.loseIdMarkerSubject.next(null);

        }

        if (this.offerMarker === 'lose') {

            this.loseIdMarkerSubject.next(this.offerId);
            this.profitIdMarkerSubject.next(null);

        }

    }
}

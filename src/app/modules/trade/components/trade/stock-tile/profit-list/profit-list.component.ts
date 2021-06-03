import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
    CdkVirtualScrollViewport,
    FixedSizeVirtualScrollStrategy,
    VIRTUAL_SCROLL_STRATEGY
} from '@angular/cdk/scrolling';
import { OfferClickEventEmitDataModel, StockOfferDictionaryModel } from 'src/app/data/models/stock-tile.model';
import { TradeTileOffersState } from 'src/app/data/enums/trade-tile-offer.enum';
import { Observable, Subscription } from 'rxjs';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(50, 250, 500);
    }
}

@Component({
    selector: 'app-profit-list',
    templateUrl: './profit-list.component.html',
    providers: [{ provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }]
})

export class ProfitListComponent implements OnInit {

    public tradeTileOffers = TradeTileOffersState;

    //==========================================================================

    private profitOfferIdSubscription: Subscription;

    //==========================================================================

    @Input() profitQuotes: StockOfferDictionaryModel;
    @Input() profitOfferId: Observable<string>;

    //==========================================================================

    @Output() profitOfferClick: EventEmitter<OfferClickEventEmitDataModel> =
        new EventEmitter<OfferClickEventEmitDataModel>();

    //==========================================================================

    constructor() { }

    //==========================================================================

    ngOnInit(): void {

        this.profitOfferIdSubscription = this.profitOfferId.subscribe((id) => {

            if (id !== null) {
                this.cdkVirtualScrollViewport.scrollToIndex(parseInt(id));
            }

        })
    }

    ngAfterViewInit() {       
        // this.cdkVirtualScrollViewport.scrollTo({ bottom: 0 });
    }

    // Angular material CDK virtual scrolling
    @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

    /**
    * 
    */
    get getProfitQuotes() {
        return this.profitQuotes;
    }


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
    onClickedList(event: MouseEvent, listMarker: string): void {

        const dataToEmit: OfferClickEventEmitDataModel = {
            event,
            listMarker
        }

        this.profitOfferClick.emit(dataToEmit);

    }

}

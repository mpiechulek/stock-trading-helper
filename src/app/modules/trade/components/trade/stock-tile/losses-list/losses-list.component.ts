import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
    CdkVirtualScrollViewport,
    FixedSizeVirtualScrollStrategy,
    VIRTUAL_SCROLL_STRATEGY
} from '@angular/cdk/scrolling';
import { OfferClickEventEmitDataModel, StockOfferDictionaryModel } from 'src/app/data/models/stock-tile.model';
import { TradeTileOffersState } from 'src/app/data/enums/trade-tile-offer.enum';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(50, 250, 500);
    }
}

@Component({
    selector: 'app-losses-list',
    templateUrl: './losses-list.component.html',
    providers: [{ provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }]
})

export class LossesListComponent implements OnInit {

    public tradeTileOffers = TradeTileOffersState;

    //==========================================================================

    @Input() loseQuotes: StockOfferDictionaryModel;
    @Input() loseOfferId: string;

    //==========================================================================

    @Output() losesOfferClick: EventEmitter<OfferClickEventEmitDataModel> =
         new EventEmitter<OfferClickEventEmitDataModel>();

    //========================================================================== 
         
    constructor() { }

    //==========================================================================

    ngOnInit(): void {
    }

    // Angular material CDK virtual scrolling
    @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

    /**
     * 
     */
    get getLoseQuotes() {
        return this.loseQuotes;
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

        this.losesOfferClick.emit(dataToEmit);
       
    }

    /**
     * Finding the offer in the list
     */
    onFindPickedOffer() {

        console.log(this.loseOfferId);        

        this.cdkVirtualScrollViewport.scrollToIndex(parseInt(this.loseOfferId));
        
    }

}

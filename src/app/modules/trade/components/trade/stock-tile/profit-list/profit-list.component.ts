import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
    CdkVirtualScrollViewport,
    FixedSizeVirtualScrollStrategy,
    VIRTUAL_SCROLL_STRATEGY
} from '@angular/cdk/scrolling';
import { StockOfferDictionaryModel } from 'src/app/data/models/stock-tile.model';
import { TradeTileOffersState } from 'src/app/data/enums/trade-tile-offer.enum';

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

    @Input() profitQuotes: StockOfferDictionaryModel;

    constructor() { }

    ngOnInit(): void {
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
    onClickedList(event, listMarker: string): void {
        // this.stockTilePresenterService.changeSelectedOfferElement(event, listMarker);
        // this.offerId = this.stockTilePresenterService.getChosenElementId(event);
        // this.offerMarker = listMarker;
    }

    /**
    * 
    */
    find() {
        // this.cdkVirtualScrollViewport.scrollToIndex(parseInt(this.offerId));
    }


}

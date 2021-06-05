import { KeyValue } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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
    selector: 'app-losses-list',
    templateUrl: './losses-list.component.html',
    providers: [{ provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }]
})

export class LossesListComponent implements OnInit, OnDestroy, AfterViewInit {

    public tradeTileOffers = TradeTileOffersState;
    
    //==========================================================================
    
    private loseOfferIdSubscription: Subscription;
    
    //==========================================================================
    
    @Input() loseQuotes: StockOfferDictionaryModel;
    @Input() loseOfferId: Observable<string>;
    @Input() loseOfferIdInit: string;

    //==========================================================================

    @Output() losesOfferClick: EventEmitter<OfferClickEventEmitDataModel> =
        new EventEmitter<OfferClickEventEmitDataModel>();

    //========================================================================== 

    // Angular material CDK virtual scrolling
    @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

    //==========================================================================

    constructor() { }

    //==========================================================================

    ngOnInit(): void {

        // this.cdkVirtualScrollViewport.scrollToIndex(parseInt('20'));

        this.loseOfferIdSubscription = this.loseOfferId.subscribe((id) => {

            if (id !== null) {

                this.cdkVirtualScrollViewport.scrollToIndex(parseInt(id), 'smooth');                

            }

        });

    }

    ngAfterViewInit(): void {

        setTimeout(() => {

            if(this.loseOfferIdInit !== null) {

                this.cdkVirtualScrollViewport.scrollToIndex(parseInt(this.loseOfferIdInit),'smooth');

            }


        });
    }

    ngOnDestroy(): void {

        if (this.loseOfferIdSubscription) {

            this.loseOfferIdSubscription.unsubscribe();

        }
    }

    /**
     * 
     */
    get getLoseQuotes(): StockOfferDictionaryModel {
        return this.loseQuotes;
    }

    /**
   * This fixes the object sorting pipe bug 
   */
    unsorted(): void { }

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

}

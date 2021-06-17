import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
    selector: 'app-main',
    templateUrl: './main-layout.component.html',

})
export class MainLayoutComponent implements OnInit {

    private showLoadingIndicator: boolean = false;

    constructor(private router: Router) {

        this.router.events.subscribe((routerEvent: Event) => {

            if (routerEvent instanceof NavigationStart) {

                this.showLoadingIndicator = true;

            }

            if (routerEvent instanceof NavigationEnd ||
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError
            ) {

                this.showLoadingIndicator = false;

            }

        })

    }

    ngOnInit(): void {
    }

    /**
    * 
    */
    get getShowLoadingIndicator(): boolean {

        return this.showLoadingIndicator;

    }

}

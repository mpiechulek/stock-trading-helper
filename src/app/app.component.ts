
import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LanguageService } from './core/services/language.service';
import { ThemeService } from './core/services/theme.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {

    private currentLanguage: string;
    private showLoadingIndicator: boolean = false;
    private routerSubscription: Subscription;

    constructor(
        private themeService: ThemeService,
        private translateService: TranslateService,
        private languageService: LanguageService,
        private activatedRoute: ActivatedRoute,  
        private router: Router,
        private titleService: Title
    ) {        

        // loading spinner when changing roots
        this.routerSubscription = router.events.subscribe((routerEvent) => {

            if (routerEvent instanceof NavigationStart) {

                this.showLoadingIndicator = true;

            }

            if (routerEvent instanceof NavigationEnd ||
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError
            ) {

                // this dime delay hides translation module text glitch when loading
                setTimeout(() => {

                    this.showLoadingIndicator = false;

                }, 500);

            }

        });

        // setting theme
        this.themeService.lodeTheme();

        // setting translations    
        this.currentLanguage = this.languageService.getFromLocalStorage();

        this.translateService.addLangs(['en', 'pl']);

        this.translateService.setDefaultLang(this.currentLanguage);

        this.languageService.fetchTranslations();

        // Setting custom root titles
        const appTitle = this.titleService.getTitle();
        
        this.router

            .events.pipe(

                filter(event => event instanceof NavigationEnd),

                map(() => {

                    let child = this.activatedRoute.firstChild;

                    while (child.firstChild) {

                        child = child.firstChild;

                    }

                    if (child.snapshot.data['title']) {

                        return child.snapshot.data['title'];

                    }

                    return appTitle;

                })

            ).subscribe((ttl: string) => {

                this.titleService.setTitle(ttl);

            });
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }

    /**
     * 
     */
    get getShowLoadingIndicator(): boolean {

        return this.showLoadingIndicator;

    }

}

import { Injectable, OnInit } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth/authentication.service';
import { SnackBarService } from '../services/snack-bar.service';
import { Location } from '@angular/common';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private currentUrl: string;

    private listOfRoutes: string[] = [      
        '/main/home',
        '/main/calculator',
        '/main/trade',
        '/main/statistics',
        '/main/currency',       
    ]

    constructor(
        private authenticationService: AuthenticationService,
        private snackBarService: SnackBarService,
        public location: Location
    ) {

        this.currentUrl = this.location.path();

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next
            .handle(request)
            .pipe(
                catchError(err => {

                    if ([401, 403].includes(err.status) && this.authenticationService.userValue) {

                        // auto logout if 401 or 403 response returned from api
                        this.authenticationService.logout();

                    }

                    const error = (err && err.error && err.error.message) || err.statusText;

                    console.log( this.currentUrl.includes('/auth/login'));
                    console.log( this.currentUrl);                    

                    // preventing to pop unauthorized snackbar in /auth/login
                    if (err.error.message === 'Unauthorized' && this.currentUrl.includes('/auth/login')) return throwError(error);

                    // preventing to pop unauthorized snackbar in /404 or other not existing root
                    if (err.error.message === 'Unauthorized' && !(this.listOfRoutes.indexOf(this.currentUrl) > -1)) return throwError(error);

                    this.snackBarService.onDisplayError(error);

                    return throwError(error);

                })

            );

    }

}
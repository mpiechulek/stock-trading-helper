import { Injectable, OnInit } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth/authentication.service';
import { SnackBarService } from '../services/snack-bar.service';
import {Location} from '@angular/common';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private currentUrl: string;

    constructor(
        private authenticationService: AuthenticationService,
        private snackBarService: SnackBarService,
        public location: Location 
    )  {    

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

                    if (err.error.message === 'Unauthorized' && this.currentUrl === '/auth/login') return throwError(error);

                    if (err.error.message === 'Unauthorized' && this.currentUrl === '/404') return throwError(error);

                    this.snackBarService.onDisplayError(error);

                    return throwError(error);

                })
            );
    }
}
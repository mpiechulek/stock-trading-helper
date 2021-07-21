import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const user = this.authenticationService.userValue;

        // checking if user is authenticated
        if (user) {       

            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {

                // role not authorized so redirect to home page
                this.router.navigate(['/main/home']);

                return false;

            }

            // authorized so return true
            return true;        

        } else {

            // not logged in so redirect to login page with the return url
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

            return false;

        }
    }
}
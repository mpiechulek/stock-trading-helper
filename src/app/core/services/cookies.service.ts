import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CookiesService {

    readonly homeDialogCookieName: string = 'dummyDataDialog';
    readonly homeDialogShowCookieName: string = 'showHomeStartDialog';

    constructor() { }

    /**
    * 
    */
    setCookie(cookieName: string, value: boolean): void {

        document.cookie = `${cookieName}=${value}`;

    }

    /**
    * 
    */
     getCookieValue(cookieName: string): string {

        const name = cookieName + "=";

        const decodedCookie = decodeURIComponent(document.cookie);

        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {

            let cookie = cookieArray[i];

            while (cookie.charAt(0) == ' ') {

                cookie = cookie.substring(1);

            }

            if (cookie.indexOf(name) == 0) {

                return cookie.substring(name.length, cookie.length);

            }

        }

        return "";

    }
}

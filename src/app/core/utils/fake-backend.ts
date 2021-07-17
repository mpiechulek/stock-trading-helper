import { Injectable } from '@angular/core';

import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpHeaders
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Role } from 'src/app/data/models/role.model';

// array in local storage for users
const usersKey = 'Users';

let users = JSON.parse(sessionStorage.getItem(usersKey)) || [];

// add test user and save if users array is empty
if (!users.length) {

    users = [
        { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'Admin', role: Role.Admin, refreshTokens: [] },
        { id: 2, username: 'user', password: 'user', firstName: 'User', lastName: 'User', role: Role.User, refreshTokens: [] },
        { id: 3, username: 'god', password: 'god', firstName: 'Mr.God', lastName: 'God', role: Role.God, refreshTokens: [] }
    ]

    sessionStorage.setItem(usersKey, JSON.stringify(users));

}

@Injectable()

export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        /**
         * 
         * @returns 
         */
        function handleRoute() {

            switch (true) {

                case url.endsWith('/users/authenticate') && method === 'POST':

                    return authenticate();

                case url.endsWith('/users/refresh-token') && method === 'POST':

                    return refreshToken();

                case url.endsWith('/users/revoke-token') && method === 'POST':

                    return revokeToken();

                case url.endsWith('/users') && method === 'GET':

                    return getUsers();

                case url.match(/\/users\/\d+$/) && method === 'GET':

                    return getUserById();


                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions
        /**
         * 
         * @returns 
         */
        function authenticate() {

            const { username, password } = body;

            const user = users.find(user => user.username === username && user.password === password);

            if (!user) return error('Username or password is incorrect');

            // add refresh token to user
            user.refreshTokens.push(generateRefreshToken());

            sessionStorage.setItem(usersKey, JSON.stringify(users));

            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                jwtToken: generateJwtToken()
            })
        }

        /**
         * 
         * @returns 
         */
        function refreshToken(): Observable<any> {

            // Getting rt from cookies
            const refreshToken = getRefreshToken();

            if (!refreshToken) return unauthorized();

            // finding a user with a refresh token
            const user = users.find(user => user.refreshTokens.includes(refreshToken));

            //If there is no token 
            if (!user) return unauthorized();

            // replace old refresh token with a new one and save
            user.refreshTokens = user.refreshTokens.filter(data => data !== refreshToken);

            user.refreshTokens.push(generateRefreshToken());

            sessionStorage.setItem(usersKey, JSON.stringify(users));

            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                jwtToken: generateJwtToken()
            })
        }

        /**
         * 
         * @returns 
         */
        function revokeToken(): Observable<any> {

            if (!isLoggedIn()) return unauthorized();

            // getting the token from cookies
            const refreshToken = getRefreshToken();

            const user = users.find(user => user.refreshTokens.includes(refreshToken));

            // revoke token and save
            user.refreshTokens = user.refreshTokens.filter(user => user !== refreshToken);

            sessionStorage.setItem(usersKey, JSON.stringify(users));

            return ok();

        }

        /**
         * 
         * @returns 
         */
        function getUsers(): Observable<any> {

            if (!isLoggedIn()) return unauthorized();

            return ok(users);

        }

        // =========================== Role based fragment =====================

        /**
         * Only the admin can do this
         * @returns 
         */
        function getUserById(): Observable<any> {

            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

            const user = users.find(user => user.id === idFromUrl());

            return ok(user);
        }

        /**
         * 
         * @returns 
         */
        function isAdmin() {

            // return isLoggedIn() && currentUser().role.includes(Role.Admin);
            return isLoggedIn() && currentUser().indexOf(Role.Admin) === -1;

        }

        /**
         * 
         * @returns 
         */
        function currentUser(): any {

            if (!isLoggedIn()) return unauthorized();

            const refreshToken = getRefreshToken();

            const user = users.find(user => user.refreshTokens.includes(refreshToken));

            const id = user.id;

            return users.find(user => user.id === id);

        }

        /**
        * 
        * @returns 
        */
        function idFromUrl(): number {

            const urlParts = url.split('/');

            return parseInt(urlParts[urlParts.length - 1]);

        }

        //=========================== helper functions =========================

        /**
         * 
         * @param body 
         * @returns 
         */
        function ok(body?) {

            return of(new HttpResponse({ status: 200, body }))

        }

        /**
         * 
         * @param message 
         * @returns 
         */
        function error(message: string): Observable<Error> {

            return throwError({ error: { message } });

        }

        /**
         * 
         * @returns 
         */
        function unauthorized(): Observable<Error> {

            return throwError({ status: 401, error: { message: 'Unauthorized' } });

        }

        /**
         * 
         * @returns 
         */
        function isLoggedIn(): boolean {

            // check if jwt token is in auth header
            const authHeader = headers.get('Authorization');

            if (!authHeader.startsWith('Bearer fake-jwt-token')) return false;

            // Transforming the token back to a number o expiration date {exp: 1626338016}
            const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));

            // check if token is expired
            const tokenExpired = Date.now() > (jwtToken.exp * 1000);

            if (tokenExpired) return false;

            return true;
        }

        /**
         * 
         * @returns 
         */
        function generateJwtToken(): string {

            // create token that expires in 15 minutes {expire: 1235452334523}
            const tokenPayload = { exp: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000) }

            // Generating a token by using btoa() - binary to ascii to create a random token
            return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;

        }

        /**
         * 
         * @returns 
         */
        function generateRefreshToken(): string {

            const token = new Date().getTime().toString();

            // add token cookie that expires in 7 days
            const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

            document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

            return token;
        }

        /**
         * 
         * @returns 
         */
        function getRefreshToken(): string {

            // get refresh token from cookie
            return (document.cookie.split(';').find(data => data.includes('fakeRefreshToken')) || '=').split('=')[1];

        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
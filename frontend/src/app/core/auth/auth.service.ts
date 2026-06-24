import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    signIn(credentials: { username: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient.post<any>(environment.server + '/api/oauth/sign-in', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this.payloadUser = AuthUtils.payLoad(this.accessToken);

                // Return a new observable with the response
                return of(response);
            })
        );
    }





    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient
            .put<any>(environment.server + '/api/oauth/sign-in', {})
            .pipe(

                switchMap((response: any) => {
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this.payloadUser = AuthUtils.payLoad(this.accessToken);

                    // Return true
                    return of(true);
                }),
                catchError(() =>
                    of(false)
                )
            );
    }

    signOut(): Observable<any> {
        this._httpClient.delete(environment.server + "/api/oauth/sign-out").subscribe(_ => { console.log("Sign-Out") });

        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }


        if (AuthUtils.isSignInUsingToken(this.accessToken)) {



            // Set the authenticated flag to true
            this._authenticated = true;

            // Store the user on the user service
            this.payloadUser = AuthUtils.payLoad(this.accessToken);

            // Return true
            return of(true);
        }
        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    private set payloadUser(payload: any) {
        //{
        //   "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZSI6Itin24zZhdin2YYiLCJjb21wYW55TmFtZSI6ImdnIiwid2Vic2l0ZSI6Imh0dHBzOi8vaHBpY28uaXIvIiwiYXVkIjoiaHR0cHM6Ly9ocGljby5pciIsImp0aSI6IjIwMDE0Iiwic3ViIjoiMSIsImNvbXBhbnlJZCI6IjEiLCJyb2xlIjoxLCJuYmYiOjE3NzQxNjA1NzIsImV4cCI6MTc3NDI0Njk3MiwiaWF0IjoxNzc0MTYwNTcyLCJpc3MiOiJodHRwczovL2hwaWNvLmlyIn0.OLTmejSvugL1pS26vvbs3EFv0LrovPpI70NpU1oBqNv4jVrIwPnu9u7t7KIqY-2Kke62aEi_mHScGtxofPAPJw"
        // }
        console.log(payload)
        this._userService.user = {
            id: payload.sub,
            nickName: payload.name,
            role: payload.role === "admin" ? [1] : [2]
        };
    }
}

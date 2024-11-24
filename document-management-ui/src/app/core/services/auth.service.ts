import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiEndpointsService } from './api-endpoints.service';
import { HttpService } from './http.service';

interface TokenValidationResponse {
    value: boolean;
    error?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpService: HttpService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private apiEndpoints: ApiEndpointsService
    ) { }

    /**
     * Validates the token with the backend.
     * @param token - The access token to validate.
     * @returns An observable of the validation response.
     */
    validateToken(token: string): Observable<TokenValidationResponse> {
        const url = this.apiEndpoints.getEndpoint(this.apiEndpoints.auth.validateToken);
        return this.httpService.post<TokenValidationResponse>(url, { token }).pipe(
            catchError(error => {
                console.error('Token validation failed', error);
                return of({ value: false, error: 'Token validation failed' });
            })
        );
    }

    /**
     * Checks if the user is authenticated by validating the access token.
     * @returns Observable indicating if the user is authenticated.
     */
    isAuthenticated(): Observable<boolean> {
        let token: string | null = null;

        // Check if we're on the browser platform before accessing localStorage
        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem('accessToken');
        }

        // If no token, user is not authenticated
        if (!token) {
            return of(false);
        }

        // Validate the token with the backend
        return this.validateToken(token).pipe(
            map((response: TokenValidationResponse) => {
                // If the response indicates the token is valid, return true
                if (response.value) {
                    return true;
                }
                console.error('Invalid token:', response.error);
                return false;
            }),
            catchError(error => {
                console.error('Error during token validation', error);
                return of(false);
            })
        );
    }
}

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiEndpointsService } from './api-endpoints.service';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpService: HttpService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private apiEndpoints: ApiEndpointsService
    ) { }

    validateToken(token: string): Observable<any> {
        const url = this.apiEndpoints.getEndpoint(this.apiEndpoints.auth.validateToken);
        return this.httpService.post(url, { token });
    }

    isAuthenticated(): Observable<boolean> {
        let token: string | null = null;
        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem('accessToken') || null;
        }

        if (!token) {
            return of(false);
        }

        // Send the token to the backend for validation
        return this.validateToken(token).pipe(
            map(response => response.value), // Assuming the backend returns a boolean indicating validity
            catchError(error => {
                console.error('Token validation failed', error);
                return of(false);
            })
        );
    }
}

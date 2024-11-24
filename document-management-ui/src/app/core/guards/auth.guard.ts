import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        if (!isPlatformBrowser(this.platformId)) {
            // Deny access on the server side as localStorage is unavailable
            console.warn('Attempted navigation on server. Access denied.');
            return of(false);
        }

        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.warn('No access token found. Redirecting to login.');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return of(false);
        }

        return this.authService.validateToken(token).pipe(
            map((response) => {
                if (response.value) {
                    // Token is valid; allow access
                    return true;
                } else {
                    // Invalid token; redirect to login
                    console.error('Token validation failed:', response.error);
                    this.redirectToLogin(state.url);
                    return false;
                }
            }),
            catchError((error) => {
                // Handle validation errors or network issues
                console.error('Error validating token:', error);
                this.redirectToLogin(state.url);
                return of(false);
            })
        );
    }

    /**
     * Redirects the user to the login page with the return URL preserved.
     * @param returnUrl - The URL the user attempted to access.
     */
    private redirectToLogin(returnUrl: string): void {
        this.router.navigate(['/login'], { queryParams: { returnUrl } });
    }
}

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                return this.authService.validateToken(token).toPromise().then(
                    (response) => {
                        if (response.value) {
                            return true;
                        } else {
                            console.error('Token validation error:', response.error);
                            this.router.navigate(['/login']);
                            return false;
                        }
                    },
                    (error) => {
                        console.error('Token validation failed:', error);
                        this.router.navigate(['/login']);
                        return false;
                    }
                );
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        } else {
            // On the server side, we deny access as localStorage is unavailable
            return false;
        }
    }
}

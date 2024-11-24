import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class RedirectAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated().pipe(
            map((isAuthenticated: boolean) => {
                if (isAuthenticated) {
                    // Redirect authenticated users to the dashboard
                    this.router.navigate(['/dashboard']);
                    return false; // Prevent access to the current route
                }
                return true; // Allow access to the route
            }),
            catchError((error) => {
                // Handle potential errors (e.g., network issues)
                console.error('Error checking authentication status:', error);
                return [true]; // Fallback: allow access to the route
            })
        );
    }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RedirectAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated().pipe(
            map((isAuthenticated: any) => {
                if (isAuthenticated) {
                    this.router.navigate(['/dashboard']);
                    return false;
                }
                return true;
            })
        );
    }
}
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isPlatformBrowser(this.platformId)) {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const clonedRequest = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return next.handle(clonedRequest);
                }
                // No token found, continue with the original request
                return next.handle(req);
            } catch (error) {
                // Handle errors while accessing localStorage
                console.log('Error accessing localStorage:', error);
                return next.handle(req); // Continue with the original request
            }
        } else {
            // Server-side logic: localStorage is unavailable
            console.warn('Attempted to intercept an HTTP request on the server side.');
            return next.handle(req); // Continue with the original request on the server side
        }
    }
}

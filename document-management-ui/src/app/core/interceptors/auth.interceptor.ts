import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    let clonedRequest = req;

    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Clone the request and add the Authorization header
            clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    } catch (error) {
        console.error('Error accessing localStorage or setting token:', error);
    }

    // Pass the (possibly modified) request to the next handler
    return next(clonedRequest);
};

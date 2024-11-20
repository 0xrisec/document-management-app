import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    get<T>(url: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(url, { params });
    }

    post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(url, body, { headers });
    }

    put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.put<T>(url, body, { headers });
    }

    delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
        return this.http.delete<T>(url, { headers });
    }

    patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.patch<T>(url, body, { headers });
    }
}